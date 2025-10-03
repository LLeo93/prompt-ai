import React from 'react';
import { FaDownload } from 'react-icons/fa';
import Button from './Button';
import type { Prompt } from '../../types';
import { exportSinglePromptToJson } from '../../utils/exporter';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Tooltip from '../Tooltip';

const MySwal = withReactContent(Swal);

interface ExportSingleCardJsonProps {
  prompt: Prompt;
}

const ExportSingleCardJson: React.FC<ExportSingleCardJsonProps> = ({
  prompt,
}) => {
  const handleExport = () => {
    try {
      exportSinglePromptToJson(prompt);
      MySwal.fire({
        icon: 'success',
        title: 'Prompt esportato!',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch {
      MySwal.fire({
        icon: 'error',
        title: 'Errore',
        text: 'Non è stato possibile esportare il prompt.',
      });
    }
  };

  return (
    <Tooltip text="Esporta Prompt in JSON">
      <Button
        onClick={handleExport}
        variant="secondary"
        size="xs"
        className="p-2 w-10 h-10 flex justify-center items-center text-base"
      >
        <FaDownload />
      </Button>
    </Tooltip>
  );
};

export default ExportSingleCardJson;
