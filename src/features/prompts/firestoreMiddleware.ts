import type { Middleware } from '@reduxjs/toolkit';
import { updatePrompt, removePrompt, clearPrompts } from './promptsSlice';
import {
  saveUserPrompt,
  deleteUserPrompt,
} from '../../services/firestoreService';
import { auth } from '../../firebaseConfig';
import type { Prompt } from '../../types';

export const firestoreMiddleware: Middleware =
  (storeAPI) => (next) => async (action: any) => {
    console.log(
      '[Middleware] Azione intercettata:',
      action.type,
      action.payload ?? '(nessun payload)'
    );

    if (action.type === clearPrompts.type) {
      console.log(
        '[Middleware] 🧹 clearPrompts → skip sincronizzazione Firestore'
      );
      return next(action);
    }

    const result = next(action);

    const userId = auth.currentUser?.uid ?? null;
    console.log('[Middleware] userId:', userId || '(nessun utente)');

    if (!userId) {
      console.log(
        '[Middleware] 🚫 Nessun utente loggato → Firestore disattivato'
      );
      return result;
    }

    try {
      switch (action.type) {
        case updatePrompt.type: {
          const prompt = action.payload as Prompt;
          if (!prompt?.id) {
            console.warn('[Middleware] ⚠️ updatePrompt senza ID, skip');
            break;
          }

          console.log(
            '[Middleware] 🔄 Salvataggio/aggiornamento in Firestore:',
            prompt.title
          );
          await saveUserPrompt(userId, prompt);
          console.log('[Middleware] ✅ Prompt salvato in Firestore');
          break;
        }

        case removePrompt.type: {
          const promptId = action.payload as string;
          if (!promptId) {
            console.warn('[Middleware] ⚠️ removePrompt senza ID valido, skip');
            break;
          }

          console.log('[Middleware] 🗑️ Eliminazione da Firestore:', promptId);
          await deleteUserPrompt(userId, promptId);
          console.log('[Middleware] ✅ Prompt eliminato da Firestore');
          break;
        }

        default:
          break;
      }
    } catch (err: unknown) {
      console.error(
        '🔥 Errore durante la sincronizzazione con Firestore:',
        err
      );
    }

    return result;
  };
