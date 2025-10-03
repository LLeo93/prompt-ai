import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../../app/store';
import {
  addPrompt,
  updatePrompt,
  removePrompt,
  toggleFavorite,
  loadPrompts,
  clearPrompts,
} from '../promptsSlice';
import type { Prompt } from '../../../types';

export const usePrompts = () => {
  const dispatch = useDispatch();

  const prompts = useSelector((state: RootState) => state.prompts.prompts);
  const favorites = useSelector((state: RootState) => state.prompts.favorites);

  const add = (prompt: Prompt) => dispatch(addPrompt(prompt));
  const update = (prompt: Prompt) => dispatch(updatePrompt(prompt));
  const remove = (id: string) => dispatch(removePrompt(id));
  const toggleFav = (id: string) => dispatch(toggleFavorite(id));
  const load = (promptsArray: Prompt[]) => dispatch(loadPrompts(promptsArray));
  const clear = () => dispatch(clearPrompts());

  return {
    prompts,
    favorites,
    add,
    update,
    remove,
    toggleFav,
    load,
    clear,
  };
};
