import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../app/store';
import { removePrompt, toggleFavorite } from '../prompts/promptsSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaRegStar, FaStar } from 'react-icons/fa';
import Tooltip from '../../components/Tooltip';
import Swal from 'sweetalert2';
import type { SweetAlertResult } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Button from '../../components/Buttons/Button';

const MySwal = withReactContent(Swal);

const PromptList: React.FC = () => {
  const prompts = useSelector((state: RootState) => state.prompts.prompts);
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.prompts.favorites);

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
        dispatch(removePrompt(id));
        MySwal.fire('Eliminato!', 'Il prompt è stato rimosso.', 'success');
      }
    });
  };

  const handleToggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const isCurrentlyFavorite = favorites.includes(id);
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
    <div className="mt-8 flex flex-col">
      <h2 className="text-2xl font-bold text-gray-200 mb-4 col-12">
        I tuoi Prompt
      </h2>
      {prompts.length === 0 ? (
        <p className="text-gray-400 italic col-12">
          Nessun prompt salvato. Inizia ad aggiungerne uno!
        </p>
      ) : (
        <AnimatePresence>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {prompts.map((prompt) => (
              <motion.div
                key={prompt.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col bg-slate-800 p-6 rounded-lg shadow-md border border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <Link to={`/prompt/${prompt.id}`} className="block flex-grow">
                  <h3 className="text-xl font-semibold text-cyan-300 mb-2 truncate">
                    {prompt.title}
                  </h3>
                  <p className="text-gray-400 line-clamp-3 mb-4">
                    {prompt.content}
                  </p>
                </Link>
                <div className="flex flex-col justify-end mt-4 gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {new Date(prompt.createdAt).toLocaleDateString()}
                    </span>
                    <Tooltip
                      text={
                        favorites.includes(prompt.id)
                          ? 'Rimuovi dai preferiti'
                          : 'Aggiungi ai preferiti'
                      }
                    >
                      <button
                        onClick={(e) => handleToggleFavorite(e, prompt.id)}
                        className={`text-xl transition-all duration-300 ${
                          favorites.includes(prompt.id)
                            ? 'text-yellow-400'
                            : 'text-gray-400 hover:text-yellow-400'
                        }`}
                      >
                        {favorites.includes(prompt.id) ? (
                          <FaStar />
                        ) : (
                          <FaRegStar />
                        )}
                      </button>
                    </Tooltip>
                  </div>
                  <div className="flex justify-center items-center gap-2">
                    <Tooltip text="Visualizza Propt">
                      <Link to={`/prompt/${prompt.id}`}>
                        <Button variant="view" size="sm">
                          Visualizza
                        </Button>
                      </Link>
                    </Tooltip>
                    <Tooltip text="Rimuovi Prompt">
                      <Button
                        onClick={(e) => handleRemove(e, prompt.id)}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-lg text-sm transition duration-300"
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
  );
};

export default PromptList;
