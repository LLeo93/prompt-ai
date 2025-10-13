import React from 'react';
import { FaLightbulb } from 'react-icons/fa';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { motion } from 'framer-motion';
import { defaultPrompts } from '../../features/prompts/defaultPrompts';
import Button from './Button';
import Tooltip from '../Tooltip';

const MySwal = withReactContent(Swal);

interface ShowDefaultPromptsButtonProps {
  tooltipText?: string;
  className?: string;
}

const ShowDefaultPromptsButton: React.FC<ShowDefaultPromptsButtonProps> = ({
  tooltipText = 'Mostra prompt di esempio',
  className,
}) => {
  const handleShowDefaults = () => {
    const htmlContent = defaultPrompts
      .map(
        (p) => `
        <div style="margin-bottom: 1rem; text-align: left;">
          <h3 style="margin: 0; font-size: 1.1rem; color: #9333ea;">
            ${p.title}
          </h3>
          <p style="margin: 0.25rem 0; font-size: 0.9rem;">
            ${p.content}
          </p>
          ${
            p.tags && p.tags.length > 0
              ? `<div style="font-size: 0.8rem; color: #6b7280;">
                  Tags: ${p.tags.join(', ')}
                </div>`
              : ''
          }
        </div>
      `
      )
      .join(
        '<hr style="border:none;border-top:1px solid #e5e7eb;margin:0.5rem 0;" />'
      );

    MySwal.fire({
      title: '💡 Prompt di esempio',
      html: `
        <div style="
          max-height: 60vh;
          overflow-y: auto;
          text-align: left;
          background: linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(31, 41, 55, 0.8));
          border-radius: 12px;
          padding: 1rem;
          color: #e2e8f0;
          box-shadow: 0 0 20px rgba(147, 51, 234, 0.2);
        ">
          ${htmlContent}
        </div>`,
      background: 'rgba(17, 24, 39, 0.9)',
      color: '#f3f4f6',
      showCloseButton: true,
      showConfirmButton: false,
      width: 600,
      customClass: {
        popup: 'backdrop-blur-md rounded-xl border border-slate-700 shadow-xl',
        title: 'text-cyan-300',
      },
    });
  };

  return (
    <Tooltip
      text={tooltipText}
      position="top"
      variant="glow"
      delay={150}
      icon="✨"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          scale: 1.05,
          boxShadow: '0 0 15px rgba(147, 51, 234, 0.3)',
        }}
        className={`p-[1px] rounded-xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transition-all w-24 ${className}`}
      >
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl">
          <Button
            onClick={handleShowDefaults}
            variant="secondary"
            className="flex justify-center items-center "
            size="sm"
          >
            <motion.span
              className="flex items-center gap-2 text-sm md:text-xs text-cyan-300"
              animate={{
                opacity: [1, 0.8, 1],
                scale: [1, 1.05, 1],
              }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <FaLightbulb className="text-yellow-400 animate-pulse" />
              Esempio
            </motion.span>
          </Button>
        </div>
      </motion.div>
    </Tooltip>
  );
};

export default ShowDefaultPromptsButton;
