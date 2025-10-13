import { useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import {
  initializeUserPromptsIfEmpty,
  saveUserPrompt,
} from '../../../services/firestoreService';
import { loadPrompts } from '../../prompts/promptsSlice';
import type { RootState } from '../../../app/store';
import type { Prompt } from '../../../types';

export const useFirestoreSync = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const prompts = useSelector((state: RootState) => state.prompts.prompts);

  const backupPrompts = (prompts: Prompt[]) => {
    try {
      localStorage.setItem('backup_prompts', JSON.stringify(prompts));
      console.log(`[Backup] ✅ Salvato backup di ${prompts.length} prompt`);
    } catch (err) {
      console.error('[Backup] ❌ Errore nel salvataggio del backup:', err);
    }
  };

  useEffect(() => {
    if (!user) return;

    const syncLogin = async () => {
      console.log('[FirestoreSync] 🔑 Login → avvio sincronizzazione');

      try {
        const userPrompts = await initializeUserPromptsIfEmpty(user.uid);

        localStorage.removeItem('prompts');
        localStorage.removeItem('favorites');

        dispatch(loadPrompts(userPrompts));

        backupPrompts(userPrompts);
      } catch (err) {
        console.error('[FirestoreSync] ❌ Errore login sync:', err);

        const backup = localStorage.getItem('backup_prompts');
        if (backup) {
          console.warn('[FirestoreSync] ⚠️ Uso backup locale');
          dispatch(loadPrompts(JSON.parse(backup)));
        } else {
          console.warn('[FirestoreSync] ⚠️ Nessun backup → lista vuota');
          dispatch(loadPrompts([]));
        }
      }
    };

    syncLogin();
  }, [user, dispatch]);

  useEffect(() => {
    if (user !== null) return;
    console.log('[FirestoreSync] 🚪 Logout → modalità ospite');

    const stored = localStorage.getItem('prompts');
    if (stored && JSON.parse(stored).length > 0) {
      dispatch(loadPrompts(JSON.parse(stored)));
    } else {
      dispatch(loadPrompts([]));
    }
  }, [user, dispatch]);

  useEffect(() => {
    backupPrompts(prompts);

    if (!user) return;

    const syncFirestore = async () => {
      for (const p of prompts) {
        try {
          await saveUserPrompt(user.uid, p);
        } catch (err) {
          console.error(
            `[FirestoreSync] ❌ Errore nel salvataggio di "${p.title}"`,
            err
          );
        }
      }
    };

    syncFirestore();
  }, [prompts, user]);
};
