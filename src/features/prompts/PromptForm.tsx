// src/components/PromptForm.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPrompt } from '../prompts/promptsSlice';
import type { Prompt } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import AnimatedComponent from '../../components/AnimatedComponent';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Button from '../../components/Buttons/Button';
import { loadPrompts } from '../prompts/promptsSlice';

const MySwal = withReactContent(Swal);

const PromptForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedPrompts = JSON.parse(event.target?.result as string);
        if (
          Array.isArray(importedPrompts) &&
          importedPrompts.every((p) => p.id && p.title && p.content)
        ) {
          dispatch(loadPrompts(importedPrompts));
          MySwal.fire({
            icon: 'success',
            title: 'Importazione completata!',
            text: `${importedPrompts.length} prompt sono stati importati.`,
            timer: 2000,
            showConfirmButton: false,
          });
        } else {
          throw new Error('Formato JSON non valido.');
        }
      } catch (error) {
        MySwal.fire({
          icon: 'error',
          title: 'Errore di importazione',
          text: 'Il file selezionato non è un formato valido per i prompt.',
        });
      }
    };
    reader.readAsText(file);
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
    };
    dispatch(addPrompt(newPrompt));
    setTitle('');
    setContent('');

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
        <Button type="submit" variant="primary" className="w-full">
          Aggiungi Prompt ✨
        </Button>
      </form>
    </AnimatedComponent>
  );
};

export default PromptForm;
