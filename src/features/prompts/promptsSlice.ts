import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Prompt } from '../../types';
import { defaultPrompts } from './defaultPrompts';

interface PromptsState {
  prompts: Prompt[];
  favorites: string[];
  filteredPrompts?: Prompt[];
  searchQuery?: string;
}

const saveStateToStorage = (prompts: Prompt[], favorites: string[]) => {
  localStorage.setItem('prompts', JSON.stringify(prompts));
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

const mergeWithDefaults = (storedPrompts: Prompt[]): Prompt[] => {
  const mergedMap = new Map<string, Prompt>();
  storedPrompts.forEach((p) => mergedMap.set(p.id, p));
  defaultPrompts.forEach((p) => {
    if (!mergedMap.has(p.id)) {
      mergedMap.set(p.id, p);
    }
  });
  return Array.from(mergedMap.values());
};

const loadState = (): PromptsState => {
  try {
    const serializedPrompts = localStorage.getItem('prompts');
    const serializedFavorites = localStorage.getItem('favorites');

    const favorites = serializedFavorites
      ? JSON.parse(serializedFavorites)
      : [];
    const storedPrompts: Prompt[] = serializedPrompts
      ? JSON.parse(serializedPrompts)
      : [];

    const prompts = mergeWithDefaults(storedPrompts);

    return {
      prompts,
      favorites,
      filteredPrompts: prompts,
      searchQuery: '',
    };
  } catch (error) {
    console.error('Errore nel caricamento del local storage:', error);
    return {
      prompts: defaultPrompts,
      favorites: [],
      filteredPrompts: defaultPrompts,
      searchQuery: '',
    };
  }
};

const initialState: PromptsState = loadState();

export const promptsSlice = createSlice({
  name: 'prompts',
  initialState,
  reducers: {
    addPrompt: (state, action: PayloadAction<Prompt>) => {
      state.prompts.push(action.payload);
      state.filteredPrompts = state.prompts;
      saveStateToStorage(state.prompts, state.favorites);
    },
    removePrompt: (state, action: PayloadAction<string>) => {
      state.prompts = state.prompts.filter(
        (prompt) => prompt.id !== action.payload
      );
      state.favorites = state.favorites.filter((id) => id !== action.payload);
      state.filteredPrompts = state.prompts;
      saveStateToStorage(state.prompts, state.favorites);
    },
    updatePrompt: (state, action: PayloadAction<Prompt>) => {
      const index = state.prompts.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.prompts[index] = action.payload;
        state.filteredPrompts = state.prompts;
        saveStateToStorage(state.prompts, state.favorites);
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
      saveStateToStorage(state.prompts, state.favorites);
    },
    loadPrompts: (state, action: PayloadAction<Prompt[]>) => {
      state.prompts = action.payload;
      state.filteredPrompts = action.payload;
      saveStateToStorage(state.prompts, state.favorites);
    },
    clearPrompts: (state) => {
      state.prompts = [];
      state.favorites = [];
      state.filteredPrompts = [];
      state.searchQuery = '';
      localStorage.removeItem('prompts');
      localStorage.removeItem('favorites');
    },

    filterPrompts: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      const query = action.payload.toLowerCase();
      state.filteredPrompts = state.prompts.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.content.toLowerCase().includes(query) ||
          (p.tags ?? []).some((tag) => tag.toLowerCase().includes(query))
      );
    },
    resetFilter: (state) => {
      state.searchQuery = '';
      state.filteredPrompts = state.prompts;
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
  filterPrompts,
  resetFilter,
} = promptsSlice.actions;

export default promptsSlice.reducer;
