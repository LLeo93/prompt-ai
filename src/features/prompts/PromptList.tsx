import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import type { SweetAlertResult } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ClearStorageButton from '../../components/Buttons/ClearStorageButton';
import '../../styles/CardsStar.css';
import PromptCard from '../../components/PromptCard';
import { usePrompts } from '../prompts/hooks/usePrompts';
import ShowDefaultPromptsButton from '../../components/Buttons/ShowDefaultPromptsButton';

const MySwal = withReactContent(Swal);

const PromptList: React.FC = () => {
  const { prompts, favorites, remove, toggleFav } = usePrompts();

  const [search, setSearch] = useState(
    () => localStorage.getItem('search') || ''
  );
  const [sortOrder, setSortOrder] = useState(
    () => localStorage.getItem('sortOrder') || 'date'
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('search', search);
    localStorage.setItem('sortOrder', sortOrder);
  }, [search, sortOrder]);

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
      customClass: {
        confirmButton:
          'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300',
        cancelButton:
          'bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ml-4',
      },
      buttonsStyling: false,
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

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(
      regex,
      '<mark class="bg-cyan-700/30 text-cyan-300">$1</mark>'
    );
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buongiorno!';
    if (hour < 18) return 'Buon pomeriggio!';
    return 'Buonasera!';
  };

  const filteredPrompts = prompts
    .filter((p) => {
      const query = search.toLowerCase();
      return (
        p.title.toLowerCase().includes(query) ||
        p.content.toLowerCase().includes(query) ||
        (p.tags && p.tags.some((tag) => tag.toLowerCase().includes(query)))
      );
    })
    .sort((a, b) =>
      sortOrder === 'title'
        ? a.title.localeCompare(b.title)
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const favoritePrompts = filteredPrompts.filter((p) =>
    favorites.includes(p.id)
  );
  const otherPrompts = filteredPrompts.filter((p) => !favorites.includes(p.id));

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timeout);
  }, [search, sortOrder]);

  return (
    <div className="mt-8 flex flex-col">
      <h2 className="text-2xl font-bold text-cyan-300 mb-4">
        {getGreeting()} Ecco i tuoi prompt:
      </h2>

      <div className="mb-4 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <div className="flex flex-col md:flex-row gap-2 w-full">
          <input
            type="text"
            placeholder="🔍 Cerca prompt..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 border border-slate-600 w-full md:flex-grow lg:max-w-lg truncate"
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-3 py-2 pr-10 rounded-lg bg-slate-700 text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 border border-slate-600 appearance-none w-full md:w-auto"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%23a3e7fc'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.75rem center',
              backgroundSize: '1.25em',
            }}
          >
            <option value="date">Ordina per Data</option>
            <option value="title">Ordina per Titolo</option>
          </select>
        </div>

        <ClearStorageButton />
        <ShowDefaultPromptsButton />
      </div>

      <p className="text-gray-400 mb-4">
        Mostrando {filteredPrompts.length} di {prompts.length} prompt.
      </p>

      {isLoading ? (
        <div className="flex justify-center items-center h-20">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-cyan-400"></div>
        </div>
      ) : filteredPrompts.length === 0 ? (
        <p className="text-gray-400 italic col-12">
          Nessun prompt trovato. Inizia ad aggiungerne uno!
        </p>
      ) : (
        <AnimatePresence>
          <div className="space-y-8">
            {favoritePrompts.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-cyan-300 mb-4">
                  Preferiti
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favoritePrompts.map((prompt) => (
                    <PromptCard
                      key={prompt.id}
                      prompt={prompt}
                      isFavorite={favorites.includes(prompt.id)}
                      search={search}
                      onToggleFavorite={handleToggleFavorite}
                      onRemove={handleRemove}
                      highlightText={highlightText}
                    />
                  ))}
                </div>
              </div>
            )}
            {otherPrompts.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-cyan-300 mb-4">
                  Altri Prompt
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {otherPrompts.map((prompt) => (
                    <PromptCard
                      key={prompt.id}
                      prompt={prompt}
                      isFavorite={favorites.includes(prompt.id)}
                      search={search}
                      onToggleFavorite={handleToggleFavorite}
                      onRemove={handleRemove}
                      highlightText={highlightText}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default PromptList;
