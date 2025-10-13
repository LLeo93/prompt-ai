// src/services/firestore.ts
import { db } from '../firebaseConfig';
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  getDoc,
} from 'firebase/firestore';
import type { DocumentData } from 'firebase/firestore';
import type { Prompt } from '../types';

/** converte sia stringhe che Timestamp in ISO string */
function toISO(createdAt: any): string {
  if (!createdAt) return new Date().toISOString();
  if (typeof createdAt === 'string') return createdAt;
  if (createdAt?.toDate) return createdAt.toDate().toISOString();
  return new Date().toISOString();
}

/** Setta (o crea) un prompt con ID client-side (usiamo setDoc per mantenere l'id uuid) */
export async function setPromptToFirestore(uid: string, prompt: Prompt) {
  if (!uid) throw new Error('Utente non autenticato');
  const docRef = doc(db, 'users', uid, 'prompts', prompt.id);
  // usiamo serverTimestamp per updatedAt; createdAt può essere string o serverTimestamp
  await setDoc(
    docRef,
    {
      title: prompt.title,
      content: prompt.content,
      tags: prompt.tags ?? [],
      createdAt: prompt.createdAt ? prompt.createdAt : serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

/** Aggiorna (parziale) un prompt: aggiorna anche updatedAt */
export async function updatePromptInFirestore(
  uid: string,
  id: string,
  data: Partial<Prompt>
) {
  if (!uid) throw new Error('Utente non autenticato');
  const docRef = doc(db, 'users', uid, 'prompts', id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  } as Partial<DocumentData>);
}

/** Cancella un prompt */
export async function deletePromptFromFirestore(uid: string, id: string) {
  if (!uid) throw new Error('Utente non autenticato');
  const docRef = doc(db, 'users', uid, 'prompts', id);
  await deleteDoc(docRef);
}

/** Legge tutti i prompt (non realtime) */
export async function fetchAllPrompts(uid: string): Promise<Prompt[]> {
  if (!uid) return [];
  const colRef = collection(db, 'users', uid, 'prompts');
  const q = query(colRef, orderBy('updatedAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data() as DocumentData;
    return {
      id: d.id,
      title: data.title ?? '',
      content: data.content ?? '',
      createdAt: toISO(data.createdAt),
      tags: (data.tags as string[]) ?? [],
    } as Prompt;
  });
}

/** Subscription realtime: ritorna unsubscribe. Mappa i createdAt in ISO string */
export function subscribeToPrompts(
  uid: string,
  onUpdate: (items: Prompt[]) => void
) {
  const colRef = collection(db, 'users', uid, 'prompts');
  const q = query(colRef, orderBy('updatedAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const items: Prompt[] = snapshot.docs.map((d) => {
      const data = d.data() as DocumentData;
      return {
        id: d.id,
        title: data.title ?? '',
        content: data.content ?? '',
        createdAt: toISO(data.createdAt),
        tags: (data.tags as string[]) ?? [],
      } as Prompt;
    });
    onUpdate(items);
  });
}

/** FAVORITES: salviamo un campo 'favorites' nel doc users/{uid} */
export async function getUserFavorites(uid: string): Promise<string[]> {
  const userDoc = doc(db, 'users', uid);
  const snap = await getDoc(userDoc);
  const data = snap.exists() ? (snap.data() as DocumentData) : {};
  return (data.favorites as string[]) ?? [];
}

export async function setUserFavorites(uid: string, favorites: string[]) {
  const userDoc = doc(db, 'users', uid);
  await setDoc(userDoc, { favorites }, { merge: true });
}

export function subscribeToFavorites(
  uid: string,
  onUpdate: (favorites: string[]) => void
) {
  const userDoc = doc(db, 'users', uid);
  return onSnapshot(userDoc, (snap) => {
    const data = snap.exists() ? (snap.data() as DocumentData) : {};
    onUpdate((data.favorites as string[]) ?? []);
  });
}

export async function toggleFavoriteInFirestore(uid: string, id: string) {
  const userDoc = doc(db, 'users', uid);
  const snap = await getDoc(userDoc);
  const data = snap.exists() ? (snap.data() as DocumentData) : {};
  const favs: string[] = (data.favorites as string[]) ?? [];
  const index = favs.indexOf(id);
  if (index !== -1) favs.splice(index, 1);
  else favs.push(id);
  await setDoc(userDoc, { favorites: favs }, { merge: true });
}

export async function migrateLocalPromptsToCloud(
  uid: string,
  localPrompts: Prompt[]
) {
  if (!uid) throw new Error('Utente non autenticato');
  const promises = localPrompts.map((p) =>
    setDoc(doc(db, 'users', uid, 'prompts', p.id), {
      title: p.title,
      content: p.content,
      tags: p.tags ?? [],
      createdAt: p.createdAt ?? serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
  );
  await Promise.all(promises);
}
