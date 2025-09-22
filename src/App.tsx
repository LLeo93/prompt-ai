import './App.css';
import './index.css';
import React, { useState } from 'react';
import AnimatedBackground from './components/AnimatedBackground';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PromptForm from './features/prompts/PromptForm';
import PromptList from './features/prompts/PromptList';
import AnimatedComponent from './components/AnimatedComponent';
import PromptDetail from './components/PromptDetail';
import PromptEditForm from './components/PromptEditForm';
import FavoritePrompts from './components/FavoritePrompts';
import PreferButton from './components/Buttons/PreferButton';
import { exportPromptsToJson } from './utils/exporter';
import Button from './components/Buttons/Button';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from './app/store';
import { loadPrompts } from './features/prompts/promptsSlice';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function App() {
  const prompts = useSelector((state: RootState) => state.prompts.prompts);
  const dispatch = useDispatch();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleExport = () => {
    exportPromptsToJson(prompts, 'prompts_backup.json');
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

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
          dispatch(loadPrompts(importedPrompts));
          MySwal.fire({
            icon: 'success',
            title: 'Importazione completata!',
            text: `${importedPrompts.length} prompt sono stati importati.`,
            timer: 2000,
            showConfirmButton: false,
          });
        } else {
          throw new Error('Formato JSON non valido.');
        }
      } catch (error) {
        MySwal.fire({
          icon: 'error',
          title: 'Errore di importazione',
          text: 'Il file selezionato non è un formato valido per i prompt.',
        });
      }
    };
    reader.readAsText(file);
  };
  return (
    <>
      <BrowserRouter>
        <div className="p-8 relative z-10">
          <AnimatedBackground />
          <Routes>
            <Route
              path="/"
              element={
                <AnimatedComponent className="max-w-4xl mx-auto p-6 bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-slate-700">
                  <h1 className="text-4xl font-bold text-center text-cyan-400 mb-8">
                    Gestore di Prompt per IA 🤖
                  </h1>
                  <PromptForm />
                  <PromptList />
                  <PreferButton />
                  <div className="mt-2 flex flex-col items-center justify-center gap-2 md:flex-row md:justify-between md:items-end">
                    <div className="flex-grow-1">
                      <Button
                        onClick={handleExport}
                        variant="secondary"
                        size="lg"
                      >
                        Esporta in JSON
                      </Button>
                    </div>
                    <Button
                      onClick={handleImportClick}
                      variant="secondary"
                      size="lg"
                    >
                      Importa da JSON
                    </Button>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImport}
                    accept=".json"
                    className="hidden"
                  />
                </AnimatedComponent>
              }
            />
            <Route path="/prompt/:id" element={<PromptDetail />} />
            <Route path="/prompt/edit/:id" element={<PromptEditForm />} />
            <Route path="/favorites" element={<FavoritePrompts />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
