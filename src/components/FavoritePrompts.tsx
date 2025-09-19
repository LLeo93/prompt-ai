import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import type { RootState } from '../app/store';
import { removePrompt, toggleFavorite } from '../features/prompts/promptsSlice';
import { FaStar, FaRegStar } from 'react-icons/fa';
import AnimatedComponent from './AnimatedComponent';
import Tooltip from './Tooltip';
import Swal from 'sweetalert2';
import type { SweetAlertResult } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Button from './Buttons/Button';

const MySwal = withReactContent(Swal);
const FavoritePrompts: React.FC = () => {
  const allPrompts = useSelector((state: RootState) => state.prompts.prompts);
  const favoritesIds = useSelector(
    (state: RootState) => state.prompts.favorites
  );
  const favoritePrompts = allPrompts.filter((prompt) =>
    favoritesIds.includes(prompt.id)
  );
  const dispatch = useDispatch();
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
        dispatch(removePrompt(id));
        MySwal.fire('Eliminato!', 'Il prompt è stato rimosso.', 'success');
      }
    });
  };

  const handleToggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const isCurrentlyFavorite = favoritesIds.includes(id);
    dispatch(toggleFavorite(id));
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
                <motion.div
                  key={prompt.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="bg-slate-800 p-6 rounded-lg shadow-md border border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <Link to={`/prompt/${prompt.id}`} className="block">
                    <h3 className="text-xl font-semibold text-cyan-300 mb-2 truncate">
                      {prompt.title}
                    </h3>
                    <p className="text-gray-400 line-clamp-3 mb-4">
                      {prompt.content}
                    </p>
                  </Link>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {new Date(prompt.createdAt).toLocaleDateString()}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => handleToggleFavorite(e, prompt.id)}
                        className={`text-xl transition-all duration-300 ${
                          favoritesIds.includes(prompt.id)
                            ? 'text-yellow-400'
                            : 'text-gray-400 hover:text-yellow-400'
                        }`}
                      >
                        {favoritesIds.includes(prompt.id) ? (
                          <FaStar />
                        ) : (
                          <FaRegStar />
                        )}
                      </button>
                      <Tooltip text=" Rimuovi dai preferiti">
                        <Button
                          onClick={(e) => handleRemove(e, prompt.id)}
                          variant="danger"
                          size="sm"
                        >
                          Rimuovi
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                </motion.div>
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
