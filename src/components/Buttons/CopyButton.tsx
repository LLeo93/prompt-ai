import React from 'react';
import Button from './Button';
import { FaClipboard } from 'react-icons/fa';
import Tooltip from '../Tooltip';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

interface CopyButtonProps {
  textToCopy: string;
  tooltipText?: string;
  className?: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({
  textToCopy,
  tooltipText = 'Copia',
  className,
}) => {
  const handleCopy = () => {
    if (!textToCopy) return;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        MySwal.fire({
          icon: 'success',
          title: 'Copiato!',
          text: 'Il contenuto è stato copiato negli appunti.',
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((_err) => {
        MySwal.fire({
          icon: 'error',
          title: 'Errore',
          text: 'Impossibile copiare il testo.',
        });
      });
  };

  return (
    <Tooltip text={tooltipText}>
      <Button
        onClick={handleCopy}
        variant="secondary"
        className={className}
        size="xs"
      >
        <FaClipboard />
      </Button>
    </Tooltip>
  );
};

export default CopyButton;
