import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import type { Prompt } from '../types';

export const getUserPromptsCollection = (userId: string) =>
  collection(db, 'users', userId, 'prompts');

export const fetchUserPrompts = async (userId: string): Promise<Prompt[]> => {
  const promptsRef = getUserPromptsCollection(userId);
  const snapshot = await getDocs(promptsRef);
  return snapshot.docs.map((d) => {
    const data = d.data() as Omit<Prompt, 'id'>;
    return { ...data, id: d.id };
  });
};

export const saveUserPrompt = async (userId: string, prompt: Prompt) => {
  const docRef = doc(db, 'users', userId, 'prompts', prompt.id);
  await setDoc(docRef, prompt, { merge: true });
};

export const deleteUserPrompt = async (userId: string, promptId: string) => {
  const docRef = doc(db, 'users', userId, 'prompts', promptId);
  await deleteDoc(docRef);
};

export const deleteAllUserPrompts = async (userId: string) => {
  const colRef = collection(db, 'users', userId, 'prompts');
  const snapshot = await getDocs(colRef);

  if (snapshot.empty) {
    console.log(`[Firestore] Nessun prompt da eliminare per ${userId}.`);
    return;
  }

  const deletions = snapshot.docs.map((doc) => deleteDoc(doc.ref));
  await Promise.all(deletions);
  console.log(`[Firestore] 🗑️ Tutti i prompt di ${userId} eliminati.`);
};

export const initializeUserPromptsIfEmpty = async (
  userId: string
): Promise<Prompt[]> => {
  const existing = await fetchUserPrompts(userId);

  const localPromptsRaw = localStorage.getItem('prompts');
  const localPrompts: Prompt[] = localPromptsRaw
    ? JSON.parse(localPromptsRaw)
    : [];

  if (existing.length === 0) {
    if (localPrompts.length > 0) {
      console.log(
        `[FirestoreService] 🆕 Utente nuovo: importo ${localPrompts.length} prompt locali in Firestore.`
      );

      for (const p of localPrompts) await saveUserPrompt(userId, p);
      return localPrompts;
    } else {
      console.log(
        `[FirestoreService] 🆕 Utente nuovo senza prompt locali: nessun default caricato.`
      );
      return [];
    }
  }

  const mergedMap = new Map<string, Prompt>();
  for (const p of existing) mergedMap.set(p.id, p);

  for (const p of localPrompts) {
    if (!mergedMap.has(p.id)) {
      console.log(
        `[FirestoreService] 🔄 Merge: aggiungo prompt locale '${p.title}' a Firestore.`
      );
      mergedMap.set(p.id, p);
      await saveUserPrompt(userId, p);
    }
  }

  return Array.from(mergedMap.values());
};
