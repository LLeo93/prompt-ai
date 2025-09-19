import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Prompt } from '../../types';
import { defaultPrompts } from './defaultPrompts';

interface PromptsState {
  prompts: Prompt[];
  favorites: string[];
}

const initialState: PromptsState = {
  prompts: defaultPrompts,
  favorites: [],
};

export const promptsSlice = createSlice({
  name: 'prompts',
  initialState,
  reducers: {
    addPrompt: (state, action: PayloadAction<Prompt>) => {
      state.prompts.push(action.payload);
    },
    removePrompt: (state, action: PayloadAction<string>) => {
      state.prompts = state.prompts.filter(
        (prompt) => prompt.id !== action.payload
      );

      state.favorites = state.favorites.filter((id) => id !== action.payload);
    },
    updatePrompt: (state, action: PayloadAction<Prompt>) => {
      const index = state.prompts.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.prompts[index] = action.payload;
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
    },

    loadPrompts: (state, action: PayloadAction<Prompt[]>) => {
      state.prompts = action.payload;
    },
  },
});

export const {
  addPrompt,
  removePrompt,
  updatePrompt,
  toggleFavorite,
  loadPrompts,
} = promptsSlice.actions;

export default promptsSlice.reducer;
