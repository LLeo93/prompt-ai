import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AnimatedComponent from '../../components/AnimatedComponent';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Button from '../../components/Buttons/Button';
import TagInput from '../../components/TagInput';
import '../../styles/PromptForm.css';
import { usePrompts } from '../prompts/hooks/usePrompts';
import type { Prompt } from '../../types';

const MySwal = withReactContent(Swal);

const PromptForm: React.FC = () => {
  const { add } = usePrompts();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Per favore, compila tutti i campi!',
      });
      return;
    }

    const newPrompt: Prompt = {
      id: uuidv4(),
      title,
      content,
      createdAt: new Date().toISOString(),
      tags,
    };

    add(newPrompt);
    setTitle('');
    setContent('');
    setTags([]);

    MySwal.fire({
      icon: 'success',
      title: 'Prompt Aggiunto!',
      text: 'Il tuo nuovo prompt è stato salvato con successo.',
      timer: 1800,
      showConfirmButton: false,
    });
  };

  return (
    <AnimatedComponent
      delay={0.2}
      className="p-6 
             bg-slate-900/50 dark:bg-slate-100/70 
             rounded-lg shadow-inner 
             border border-slate-700 dark:border-slate-300"
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-300 dark:text-slate-700 text-sm font-bold mb-2">
            Titolo
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 
                   bg-slate-700 text-white 
                   dark:bg-slate-200 dark:text-slate-900
                   rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-cyan-400 
                   border border-slate-600 dark:border-slate-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 dark:text-slate-700 text-sm font-bold mb-2">
            Contenuto del Prompt
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            className="w-full px-4 py-2 
                   bg-slate-700 text-white 
                   dark:bg-slate-200 dark:text-slate-900
                   rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-cyan-400 
                   border border-slate-600 dark:border-slate-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 dark:text-slate-700 text-sm font-bold mb-2">
            Tags
          </label>
          <TagInput tags={tags} setTags={setTags} maxTags={5} />
        </div>

        <Button type="submit" variant="primary" className="w-full">
          Aggiungi Prompt ✨
        </Button>
      </form>
    </AnimatedComponent>
  );
};

export default PromptForm;
