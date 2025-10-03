import React, { useState } from 'react';
import '../styles/TagInput.css';

interface TagInputProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  maxTags?: number;
}

const TagInput: React.FC<TagInputProps> = ({ tags, setTags, maxTags = 5 }) => {
  const [tagInput, setTagInput] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault();

      if (tags.length >= maxTags) {
        setErrorMsg(`Limite di ${maxTags} tag raggiunto!`);
        setTimeout(() => setErrorMsg(null), 2000);
        return;
      }

      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const isMaxReached = tags.length >= maxTags;

  return (
    <div>
      <div
        className={`flex flex-wrap gap-2 p-2 
                    bg-slate-700 dark:bg-slate-200 
                    rounded-lg 
                    border border-cyan-600 dark:border-cyan-400 
                    text-cyan-600 dark:text-cyan-700
                    ${isMaxReached ? 'max-tag-glow' : ''}`}
      >
        {tags.map((tag, i) => (
          <span
            key={i}
            className="flex items-center gap-1 px-2 py-1 text-sm 
                       bg-cyan-700/30 dark:bg-cyan-100 
                       text-cyan-600 dark:text-cyan-800 
                       rounded-lg"
          >
            #{tag}
            <button
              type="button"
              onClick={() => handleRemoveTag(tag)}
              className="text-red-400 dark:text-red-500 hover:text-red-600 ml-1"
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
          placeholder={
            isMaxReached
              ? 'Limite raggiunto'
              : `Aggiungi tag (max ${maxTags}), premi Invio`
          }
          disabled={isMaxReached}
          className={`flex-grow px-2 bg-transparent outline-none truncate tag-input
                      ${
                        isMaxReached
                          ? 'cursor-not-allowed text-gray-400'
                          : 'text-white dark:text-slate-900'
                      }`}
        />
      </div>

      {/* Counter */}
      <p
        className={`text-xs mt-1 ${
          isMaxReached ? 'text-red-400' : 'text-gray-400'
        }`}
      >
        {tags.length}/{maxTags} tag usati
      </p>

      {/* Messaggio temporaneo */}
      {errorMsg && (
        <div className="mt-1 text-xs text-red-400 transition-opacity duration-500">
          {errorMsg}
        </div>
      )}
    </div>
  );
};

export default TagInput;
