// src/components/PromptEditForm.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../app/store';
import { updatePrompt } from '../features/prompts/promptsSlice';
import { motion } from 'framer-motion';
import AnimatedComponent from './AnimatedComponent';
import Tooltip from './Tooltip';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Button from './Buttons/Button';

const MySwal = withReactContent(Swal);

const PromptEditForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const promptToEdit = useSelector((state: RootState) =>
    state.prompts.prompts.find((p) => p.id === id)
  );

  const [title, setTitle] = useState(promptToEdit?.title || '');
  const [content, setContent] = useState(promptToEdit?.content || '');

  useEffect(() => {
    if (!promptToEdit) {
      navigate('/');
    }
  }, [promptToEdit, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !promptToEdit) return;

    const updatedPrompt = { ...promptToEdit, title, content };
    dispatch(updatePrompt(updatedPrompt));
    navigate(`/prompt/${promptToEdit.id}`);

    MySwal.fire({
      icon: 'success',
      title: 'Prompt Aggiornato!',
      text: 'Le modifiche sono state salvate con successo.',
      timer: 2000,
      showConfirmButton: false,
    });
  };

  return (
    <AnimatedComponent className="max-w-4xl mx-auto p-6 bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-slate-700">
      <h1 className="text-4xl font-bold text-center text-cyan-400 mb-8">
        Modifica Prompt ✍️
      </h1>
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-slate-900/50 rounded-lg shadow-inner border border-slate-700"
      >
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
        <div className="flex flex-col gap-2 md:flex-row md:justify-between items-center">
          <Tooltip text="Salva le modifiche">
            <Button type="submit" variant="primary" size="md">
              Salva
            </Button>
          </Tooltip>

          <Tooltip text="Annula le modifiche">
            <Button
              type="button"
              onClick={() => navigate(`/prompt/${id}`)}
              variant="secondary"
              size="md"
            >
              Annulla
            </Button>
          </Tooltip>
        </div>
      </form>
    </AnimatedComponent>
  );
};

export default PromptEditForm;
