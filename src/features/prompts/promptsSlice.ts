import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Prompt } from '../../types';
import { defaultPrompts } from './defaultPrompts';

interface PromptsState {
  prompts: Prompt[];
  favorites: string[];
}

const loadState = (): PromptsState => {
  try {
    const serializedPrompts = localStorage.getItem('prompts');
    const serializedFavorites = localStorage.getItem('favorites');

    const favorites = serializedFavorites
      ? JSON.parse(serializedFavorites)
      : [];

    const mergedPromptsMap = new Map<string, Prompt>();
    defaultPrompts.forEach((p) => mergedPromptsMap.set(p.id, p));

    if (serializedPrompts !== null) {
      const storedPrompts: Prompt[] = JSON.parse(serializedPrompts);

      storedPrompts.forEach((p) => mergedPromptsMap.set(p.id, p));
    }

    const mergedPrompts = Array.from(mergedPromptsMap.values());

    return { prompts: mergedPrompts, favorites: favorites };
  } catch (error) {
    console.error('Errore nel caricamento del local storage:', error);
    return { prompts: defaultPrompts, favorites: [] };
  }
};

const initialState: PromptsState = loadState();

export const promptsSlice = createSlice({
  name: 'prompts',
  initialState,
  reducers: {
    addPrompt: (state, action: PayloadAction<Prompt>) => {
      state.prompts.push(action.payload);
      localStorage.setItem('prompts', JSON.stringify(state.prompts));
    },
    removePrompt: (state, action: PayloadAction<string>) => {
      state.prompts = state.prompts.filter(
        (prompt) => prompt.id !== action.payload
      );
      state.favorites = state.favorites.filter((id) => id !== action.payload);
      localStorage.setItem('prompts', JSON.stringify(state.prompts));
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    updatePrompt: (state, action: PayloadAction<Prompt>) => {
      const index = state.prompts.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.prompts[index] = action.payload;
        localStorage.setItem('prompts', JSON.stringify(state.prompts));
      }
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.favorites.indexOf(id);
      if (index !== -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(id);
      }
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    loadPrompts: (state, action: PayloadAction<Prompt[]>) => {
      state.prompts = action.payload;
      localStorage.setItem('prompts', JSON.stringify(state.prompts));
    },
    clearPrompts: (state) => {
      state.prompts = [];
      state.favorites = [];
      localStorage.removeItem('prompts');
      localStorage.removeItem('favorites');
    },
  },
});

export const {
  addPrompt,
  removePrompt,
  updatePrompt,
  toggleFavorite,
  loadPrompts,
  clearPrompts,
} = promptsSlice.actions;

export default promptsSlice.reducer;
