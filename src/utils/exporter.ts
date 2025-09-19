import type { Prompt } from '../types';

export const exportPromptsToJson = (
  prompts: Prompt[],
  filename: string = 'prompts.json'
) => {
  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(prompts, null, 2)
  )}`;
  const link = document.createElement('a');
  link.href = jsonString;
  link.download = filename;
  link.click();
};
