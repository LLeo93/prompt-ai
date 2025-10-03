import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../app/store';
import { removePrompt, toggleFavorite } from '../features/prompts/promptsSlice';
import AnimatedComponent from './AnimatedComponent';
import { FaRegStar, FaStar } from 'react-icons/fa';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import type { SweetAlertResult } from 'sweetalert2';
import Tooltip from './Tooltip';
import Button from './Buttons/Button';
import CopyButton from './Buttons/CopyButton';
import TagList from './TagList';
import ExportSingleCardJson from './Buttons/ExportSingleCardJson';

const MySwal = withReactContent(Swal);

const PromptDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const prompt = useSelector((state: RootState) =>
    state.prompts.prompts.find((p) => p.id === id)
  );
  const isFavorite = useSelector((state: RootState) =>
    state.prompts.favorites.includes(id || '')
  );

  const handleToggleFavorite = () => {
    const isCurrentlyFavorite = isFavorite;
    dispatch(toggleFavorite(id!));
    MySwal.fire({
      icon: 'success',
      title: isCurrentlyFavorite
        ? 'Rimosso dai Preferiti'
        : 'Aggiunto ai Preferiti',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleRemove = () => {
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
        dispatch(removePrompt(id!));
        navigate('/');
        MySwal.fire(
          'Eliminato!',
          'Il tuo prompt è stato eliminato.',
          'success'
        );
      }
    });
  };

  if (!prompt) {
    return (
      <AnimatedComponent className="text-center text-gray-400 mt-10">
        <h2 className="text-2xl font-bold">Prompt non trovato.</h2>
        <Tooltip text="torna alla Home">
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Home
          </button>
        </Tooltip>
      </AnimatedComponent>
    );
  }

  return (
    <AnimatedComponent className="max-w-3xl mx-auto p-8 bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-slate-700">
      <h2 className="text-4xl font-bold text-cyan-300 mb-4 break-words">
        {prompt.title}
      </h2>
      <p className="text-gray-400 whitespace-pre-wrap leading-relaxed break-words mb-4">
        {prompt.content}
      </p>

      {/* Tags */}
      <TagList tags={prompt.tags} size="sm" className="mb-4" />

      <div className="flex gap-2 items-center mb-4">
        <span className="text-sm text-gray-500">
          Creato il: {new Date(prompt.createdAt).toLocaleDateString()}
        </span>

        <Tooltip
          text={isFavorite ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
        >
          <button
            onClick={handleToggleFavorite}
            className={`text-3xl transition-all duration-300 ${
              isFavorite
                ? 'text-yellow-400'
                : 'text-gray-400 hover:text-yellow-400'
            }`}
          >
            {isFavorite ? <FaStar /> : <FaRegStar />}
          </button>
        </Tooltip>
        <span className="ml-2">
          <ExportSingleCardJson prompt={prompt} />
        </span>
      </div>

      <div className="mt-8 flex justify-center items-center gap-2 flex-col md:flex-row">
        <CopyButton
          textToCopy={prompt.content}
          className="flex justify-center items-center"
        />
        <Tooltip text="Modifica il Prompt">
          <Link to={`/prompt/edit/${prompt.id}`}>
            <Button
              variant="primary"
              className="bg-purple-600 hover:bg-purple-700"
            >
              Modifica
            </Button>
          </Link>
        </Tooltip>
        <Tooltip text="Elimina il prompt">
          <Button onClick={handleRemove} variant="danger" size="md">
            Elimina
          </Button>
        </Tooltip>
        <Tooltip text="Torna alla lista">
          <Button onClick={() => navigate('/home')} variant="secondary">
            Indietro
          </Button>
        </Tooltip>
      </div>
    </AnimatedComponent>
  );
};

export default PromptDetail;
