import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaStar, FaRegStar } from 'react-icons/fa';
import Tooltip from './Tooltip';
import Button from './Buttons/Button';
import type { Prompt } from '../types';
import TagList from './TagList';
import ExportSingleCardJson from './Buttons/ExportSingleCardJson';

interface PromptCardProps {
  prompt: Prompt;
  isFavorite: boolean;
  search?: string;
  onToggleFavorite: (e: React.MouseEvent, id: string) => void;
  onRemove: (e: React.MouseEvent, id: string) => void;
  highlightText?: (text: string, query: string) => string;
}

const PromptCard: React.FC<PromptCardProps> = ({
  prompt,
  isFavorite,
  search = '',
  onToggleFavorite,
  onRemove,
  highlightText,
}) => {
  return (
    <motion.div
      key={prompt.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer
        ${
          isFavorite
            ? 'favorite-card border-yellow-400 border-2'
            : 'border border-slate-700'
        }
      `}
    >
      <Link to={`/prompt/${prompt.id}`} className="block flex-grow">
        <h3
          className="text-xl font-semibold text-cyan-300 mb-2 truncate"
          dangerouslySetInnerHTML={{
            __html: highlightText
              ? highlightText(prompt.title, search)
              : prompt.title,
          }}
        ></h3>
        <p
          className="text-gray-400 line-clamp-3 mb-4"
          dangerouslySetInnerHTML={{
            __html: highlightText
              ? highlightText(prompt.content, search)
              : prompt.content,
          }}
        ></p>
      </Link>

      {/* Tags */}
      <TagList tags={prompt.tags} size="sm" className="mt-2" />

      <div className="flex flex-col justify-end mt-4 gap-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {new Date(prompt.createdAt).toLocaleDateString()}
          </span>
          <Tooltip
            text={
              isFavorite ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'
            }
          >
            <button
              onClick={(e) => onToggleFavorite(e, prompt.id)}
              className={`text-xl transition-all duration-300 ${
                isFavorite
                  ? 'text-yellow-400'
                  : 'text-gray-400 hover:text-yellow-400'
              }`}
            >
              {isFavorite ? <FaStar /> : <FaRegStar />}
            </button>
          </Tooltip>
          <ExportSingleCardJson prompt={prompt} />
        </div>

        <div className="flex justify-center items-center gap-2">
          <Tooltip text="Visualizza Prompt">
            <Link to={`/prompt/${prompt.id}`}>
              <Button variant="view" size="sm">
                Visualizza
              </Button>
            </Link>
          </Tooltip>
          <Tooltip text="Rimuovi Prompt">
            <Button
              onClick={(e) => onRemove(e, prompt.id)}
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
  );
};

export default PromptCard;
