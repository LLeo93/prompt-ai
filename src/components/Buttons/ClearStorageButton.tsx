import React from 'react';
import Button from './Button';
import { FaTrashAlt } from 'react-icons/fa';
import Tooltip from '../Tooltip';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { usePrompts } from '../../features/prompts/hooks/usePrompts';
import { useAuth } from '../../context/AuthContext';
import { deleteAllUserPrompts } from '../../services/firestoreService';

const MySwal = withReactContent(Swal);

interface ClearStorageButtonProps {
  tooltipText?: string;
  className?: string;
}

const ClearStorageButton: React.FC<ClearStorageButtonProps> = ({
  tooltipText = 'Svuota tutto',
  className,
}) => {
  const { clear } = usePrompts();
  const { user } = useAuth();

  const handleClearStorage = async () => {
    const result = await MySwal.fire({
      title: 'Sei sicuro?',
      text: 'Questa azione cancellerà TUTTI i prompt, inclusi quelli di default, e i preferiti. Non potrai più tornare indietro!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#9333ea',
      cancelButtonColor: '#475569',
      confirmButtonText: 'Sì, svuota tutto!',
      cancelButtonText: 'Annulla',
    });

    if (!result.isConfirmed) return;

    try {
      // Se l’utente è loggato, elimina prima su Firestore
      if (user?.uid) {
        await deleteAllUserPrompts(user.uid);
        console.log(`[Firestore] 🗑️ Tutti i prompt di ${user.uid} eliminati.`);
      }

      // svuota Redux e localStorage
      clear();

      //cancella eventuale backup
      localStorage.removeItem('backup_prompts');

      MySwal.fire({
        icon: 'success',
        title: 'Svuotato!',
        text: 'Tutti i dati sono stati cancellati.',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.error('❌ Errore nello svuotamento:', err);
      MySwal.fire({
        icon: 'error',
        title: 'Errore!',
        text: 'Si è verificato un problema durante la cancellazione.',
      });
    }
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
