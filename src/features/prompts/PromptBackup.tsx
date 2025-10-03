import React, { useRef } from 'react';
import { exportPromptsToJson } from '../../utils/exporter';
import Button from '../../components/Buttons/Button';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { usePrompts } from '../prompts/hooks/usePrompts';

const MySwal = withReactContent(Swal);

const PromptBackup: React.FC = () => {
  const { prompts, load } = usePrompts();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    exportPromptsToJson(prompts, 'prompts_backup.json');
  };

  const handleImportClick = () => fileInputRef.current?.click();

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedPrompts = JSON.parse(event.target?.result as string);
        if (
          Array.isArray(importedPrompts) &&
          importedPrompts.every((p) => p.id && p.title && p.content)
        ) {
          load(importedPrompts);
          MySwal.fire({
            icon: 'success',
            title: 'Importazione completata!',
            text: `${importedPrompts.length} prompt importati.`,
            timer: 2000,
            showConfirmButton: false,
          });
        } else throw new Error('Formato JSON non valido.');
      } catch (error) {
        MySwal.fire({
          icon: 'error',
          title: 'Errore di importazione',
          text: 'Il file selezionato non è valido per i prompt.',
        });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="mt-2 flex flex-col items-center justify-center gap-2 md:flex-row md:justify-between md:items-end">
      <div className="flex-grow-1">
        <Button onClick={handleExport} variant="secondary" size="lg">
          Esporta in JSON
        </Button>
      </div>
      <Button onClick={handleImportClick} variant="secondary" size="lg">
        Importa da JSON
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImport}
        accept=".json"
        className="hidden"
      />
    </div>
  );
};

export default PromptBackup;
