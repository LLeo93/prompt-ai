import { configureStore } from '@reduxjs/toolkit';
import promptsReducer from '../features/prompts/promptsSlice';
import { firestoreMiddleware } from '../features/prompts/firestoreMiddleware';

console.log('[Store] Configurazione dello store in corso...');

export const store = configureStore({
  reducer: {
    prompts: promptsReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const mw = getDefaultMiddleware({ serializableCheck: false }).concat(
      firestoreMiddleware
    );
    console.log(
      '[Store] Middleware registrati:',
      mw.map((m) => m.name || 'anonimo')
    );
    return mw;
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

console.log('[Store] Store configurato correttamente');
