import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PromptCard from './PromptCard';
import AnimatedComponent from './AnimatedComponent';
import Tooltip from './Tooltip';
import Swal from 'sweetalert2';
import type { SweetAlertResult } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Button from './Buttons/Button';
import { usePrompts } from '../features/prompts/hooks/usePrompts';

const MySwal = withReactContent(Swal);

const FavoritePrompts: React.FC = () => {
  const { prompts, favorites, remove, toggleFav } = usePrompts();
  const favoritePrompts = prompts.filter((p) => favorites.includes(p.id));
  const navigate = useNavigate();

  const handleRemove = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    MySwal.fire({
      title: 'Sei sicuro?',
      text: 'Non potrai più recuperare questo prompt!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sì, eliminalo!',
      cancelButtonText: 'Annulla',
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        remove(id);
        MySwal.fire('Eliminato!', 'Il prompt è stato rimosso.', 'success');
      }
    });
  };

  const handleToggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const isCurrentlyFavorite = favorites.includes(id);
    toggleFav(id);
    MySwal.fire({
      icon: 'success',
      title: isCurrentlyFavorite
        ? 'Rimosso dai Preferiti'
        : 'Aggiunto ai Preferiti',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <AnimatedComponent className="max-w-4xl mx-auto p-6 bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-slate-700">
      <h1 className="text-4xl font-bold text-center text-cyan-400 mb-8">
        I tuoi Prompt Preferiti ⭐
      </h1>
      <div className="mt-8">
        {favoritePrompts.length === 0 ? (
          <p className="text-gray-400 italic">
            Nessun prompt preferito salvato.
          </p>
        ) : (
          <AnimatePresence>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoritePrompts.map((prompt) => (
                <PromptCard
                  key={prompt.id}
                  prompt={prompt}
                  isFavorite={favorites.includes(prompt.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onRemove={handleRemove}
                />
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
      <Tooltip text=" Torna alla Home">
        <Button
          onClick={() => navigate('/')}
          variant="secondary"
          className="mt-8"
        >
          Home
        </Button>
      </Tooltip>
    </AnimatedComponent>
  );
};

export default FavoritePrompts;
