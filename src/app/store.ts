// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import promptsReducer from '../features/prompts/promptsSlice';

export const store = configureStore({
  reducer: {
    prompts: promptsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
