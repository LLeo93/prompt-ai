import './App.css';
import './index.css';
import AnimatedBackground from './components/AnimatedBackground';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PromptForm from './features/prompts/PromptForm';
import PromptList from './features/prompts/PromptList';
import AnimatedComponent from './components/AnimatedComponent';
import PromptDetail from './components/PromptDetail';
import PromptEditForm from './components/PromptEditForm';
import FavoritePrompts from './components/FavoritePrompts';
import PreferButton from './components/Buttons/PreferButton';
import PromptBackup from './features/prompts/PromptBackup';
import NavBar from './components/NavBar';
import AboutPage from './components/AboutPage';
import { useFirestoreSync } from './features/prompts/hooks/useFirestoreSync';

function App() {
  useFirestoreSync();
  return (
    <BrowserRouter>
      <div className="p-4 relative z-10 lg:p-0  md:pl-32 lg:pt-20 md:pb-0 pb-14">
        <AnimatedBackground />
        <NavBar />
        <Routes>
          <Route path="/" element={<AboutPage />} />
          <Route
            path="/home"
            element={
              <AnimatedComponent className="max-w-4xl mx-auto p-6  bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-slate-700">
                <h1 className="text-4xl font-bold text-center text-cyan-400 mb-8">
                  Gestore di Prompt per IA 🤖
                </h1>
                <PromptForm />
                <PromptList />
                <PreferButton />
                <PromptBackup />
              </AnimatedComponent>
            }
          />
          <Route path="/prompt/:id" element={<PromptDetail />} />
          <Route path="/prompt/edit/:id" element={<PromptEditForm />} />
          <Route path="/favorites" element={<FavoritePrompts />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
