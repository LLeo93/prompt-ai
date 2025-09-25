import React from 'react';
import { useDispatch } from 'react-redux';
import Button from './Button';
import { FaTrashAlt } from 'react-icons/fa';
import Tooltip from '../Tooltip';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { clearPrompts } from '../../features/prompts/promptsSlice';

const MySwal = withReactContent(Swal);

interface ClearStorageButtonProps {
  tooltipText?: string;
  className?: string;
}

const ClearStorageButton: React.FC<ClearStorageButtonProps> = ({
  tooltipText = 'Svuota tutto',
  className,
}) => {
  const dispatch = useDispatch();

  const handleClearStorage = () => {
    MySwal.fire({
      title: 'Sei sicuro?',
      text: 'Questa azione cancellerà TUTTI i prompt, inclusi quelli di default, e i preferiti. Non potrai più tornare indietro!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#9333ea',
      cancelButtonColor: '#475569',
      confirmButtonText: 'Sì, svuota tutto!',
      cancelButtonText: 'Annulla',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearPrompts());

        MySwal.fire({
          icon: 'success',
          title: 'Svuotato!',
          text: 'Tutti i dati sono stati cancellati.',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <Tooltip text={tooltipText}>
      <Button
        onClick={handleClearStorage}
        variant="danger"
        className={`flex justify-center items-center ${className}`}
        size="sm"
      >
        <FaTrashAlt />
      </Button>
    </Tooltip>
  );
};

export default ClearStorageButton;
