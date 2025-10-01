import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPrompt } from '../prompts/promptsSlice';
import type { Prompt } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import AnimatedComponent from '../../components/AnimatedComponent';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Button from '../../components/Buttons/Button';
import '../../styles/PromptForm.css';

const MySwal = withReactContent(Swal);

const PromptForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const dispatch = useDispatch();

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

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
      tags: tags,
    };
    dispatch(addPrompt(newPrompt));
    setTitle('');
    setContent('');
    setTags([]);

    MySwal.fire({
      icon: 'success',
      title: 'Prompt Aggiunto!',
      text: 'Il tuo nuovo prompt è stato salvato con successo.',
      timer: 2000,
      showConfirmButton: false,
    });
  };

  return (
    <AnimatedComponent
      delay={0.2}
      className="p-6 bg-slate-900/50 rounded-lg shadow-inner border border-slate-700"
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Titolo
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 border border-slate-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Contenuto del Prompt
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 border border-slate-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 p-2 bg-slate-700 rounded-lg border border-cyan-600 text-cyan-600">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="flex items-center gap-1 px-2 py-1 text-sm bg-cyan-700/30 text-cyan-600 rounded-lg"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="text-red-400 hover:text-red-600 ml-1"
                >
                  ✕
                </button>
              </span>
            ))}
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Aggiungi tag e premi Enter"
              className="flex-grow px-2 bg-transparent text-white outline-none truncate tag-input"
            />
          </div>
        </div>
        <Button type="submit" variant="primary" className="w-full">
          Aggiungi Prompt ✨
        </Button>
      </form>
    </AnimatedComponent>
  );
};

export default PromptForm;
