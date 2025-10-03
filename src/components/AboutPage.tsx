import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedComponent from '../components/AnimatedComponent';
import Button from '../components/Buttons/Button';
import Tooltip from '../components/Tooltip';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { SiOpenai } from 'react-icons/si';
import { BiBookContent } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';
import SearchBar from '../components/SearchBar';

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.15, duration: 0.8 },
  }),
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1, duration: 1 },
  },
};

const Divider = () => (
  <motion.div
    className="h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full"
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{ duration: 1.5 }}
  />
);

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Come creo un nuovo prompt?',
    answer: 'Clicca su “Nuovo Prompt” e inserisci titolo, contenuto e tag.',
  },
  {
    question: 'Come modifico un prompt esistente?',
    answer: 'Clicca sul prompt, modifica i campi e salva le modifiche.',
  },
  {
    question: 'Come elimino un prompt?',
    answer: 'Clicca sull’icona del cestino accanto al prompt e conferma.',
  },
  {
    question: 'Come aggiungo un prompt ai preferiti?',
    answer:
      'Clicca sulla stella accanto al prompt per aggiungerlo ai preferiti.',
  },
  {
    question: 'Come faccio il backup dei prompt?',
    answer:
      'Usa “Esporta in JSON” per salvare tutti i prompt sul tuo dispositivo.',
  },
  {
    question: 'Come importo un backup?',
    answer:
      'Clicca su “Importa JSON” e seleziona il file salvato in precedenza.',
  },
  {
    question: 'Come organizzo i prompt per categoria?',
    answer: 'Usa i tag per filtrare e raggruppare i prompt in categorie.',
  },
  {
    question: 'Posso usare PromptLab offline?',
    answer:
      'Sì, ma alcune funzionalità legate a OpenAI richiedono la connessione a internet.',
  },
  // Nuove FAQ aggiunte
  {
    question: 'Come condivido un prompt?',
    answer: 'Copia il link o esporta il prompt in JSON e invialo.',
  },
  {
    question: 'Posso stampare i miei prompt?',
    answer: 'Sì, puoi esportarli in JSON e aprirli in un editor per stampare.',
  },
];

const AboutPage: React.FC = () => {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery) ||
      faq.answer.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="relative overflow-hidden">
      <div className="relative z-10">
        <AnimatedComponent className="max-w-5xl mx-auto p-6 bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-slate-700 mt-4 mb-15 space-y-12">
          {/* Introduzione con SVG animato */}
          <motion.section
            className="p-4 rounded-xl bg-gradient-to-r from-cyan-900/20 via-purple-900/20 to-pink-900/20 hover:scale-[1.01] hover:shadow-cyan-500/20 hover:shadow-lg transition-all relative overflow-hidden"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <svg
              className="absolute top-0 right-0 w-24 h-24 opacity-20 animate-spin-slow"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#22d3ee"
                strokeWidth="5"
                fill="none"
              />
            </svg>
            <motion.div className="text-gray-300 text-sm md:text-base lg:text-lg mb-4">
              Benvenuto in <strong>PromptLab</strong>, la tua applicazione
              completa per creare, gestire e salvare prompt per intelligenze
              artificiali!
            </motion.div>
            <motion.div className="text-gray-300 text-sm md:text-base lg:text-lg">
              Organizza tutti i tuoi prompt in un unico posto, aggiungi
              preferiti, esporta e importa backup in formato{' '}
              <Tooltip
                text="Formato di interscambio dati"
                position="top"
                variant="glow"
                delay={200}
                icon="ℹ️"
              >
                JSON
              </Tooltip>
              .
            </motion.div>
          </motion.section>

          <Divider />

          {/* Come si usa */}
          <motion.section
            className="p-4 rounded-xl bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-cyan-900/20 hover:scale-[1.01] hover:shadow-purple-500/20 hover:shadow-lg transition-all"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2
              className="text-xl md:text-2xl font-semibold text-cyan-300 mb-4"
              animate={{ scale: [1, 1.02, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              Come si usa
            </motion.h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm md:text-base lg:text-lg">
              {[
                'Creazione Prompt: Inserisci titolo, contenuto e tag',
                'Visualizza: Clicca un prompt per aprirlo e consultarlo',
                'Modifica: Clicca un prompt per modificarlo',
                'Preferiti: Clicca sulla stella accanto al prompt',
                'Esportazione/Backup: Usa “Esporta in JSON”',
                'Importazione: Carica un file JSON salvato in precedenza',
              ].map((item, i) => (
                <motion.li
                  key={i}
                  custom={i}
                  variants={listItemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.02, color: '#22d3ee', x: 2 }}
                >
                  {item.split('JSON')[0]}
                  {item.includes('JSON') && (
                    <Tooltip
                      text="Formato di interscambio dati"
                      position="top"
                      variant="glow"
                      delay={200}
                      icon="ℹ️"
                    >
                      JSON
                    </Tooltip>
                  )}
                  {item.includes('tag') && (
                    <Tooltip
                      text="Parole chiave per organizzare i prompt"
                      position="top"
                      variant="glow"
                      delay={200}
                      icon="ℹ️"
                    >
                      tag
                    </Tooltip>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.section>

          <Divider />

          {/* FAQ Accordion */}
          <motion.section className="p-4 rounded-xl bg-gradient-to-r from-cyan-900/20 via-purple-900/20 to-pink-900/20 hover:scale-[1.01] hover:shadow-lg transition-all">
            {/* Search Bar */}
            <div className="mb-4">
              <SearchBar
                placeholder="Cerca FAQ o comandi..."
                onSearch={(query) => setSearchQuery(query.toLowerCase())}
              />
            </div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl md:text-2xl font-semibold text-cyan-300">
                FAQ
              </h2>
            </div>
            <ul className="space-y-2">
              {filteredFaqs.map((faq, i) => (
                <li key={i} className="border-b border-slate-700 pb-2">
                  <motion.button
                    className="w-full flex justify-between items-center text-left text-gray-300 hover:text-cyan-400"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span>{faq.question}</span>
                    <motion.span
                      className="ml-2 text-cyan-400"
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      ▼
                    </motion.span>
                  </motion.button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden text-gray-400 ml-2 mt-1"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </motion.section>

          <Divider />

          {/* Link utili */}
          <motion.section className="p-4 rounded-xl bg-gradient-to-r from-pink-900/20 via-cyan-900/20 to-purple-900/20 hover:scale-[1.01] hover:shadow-pink-500/20 hover:shadow-lg transition-all">
            <motion.h2 className="text-xl md:text-2xl font-semibold text-cyan-300 mb-4">
              Link utili
            </motion.h2>
            <ul className="space-y-3 text-sm md:text-base lg:text-lg">
              <motion.li whileHover={{ scale: 1.05 }}>
                <Tooltip
                  text="Vai a ChatGPT"
                  position="top"
                  variant="glow"
                  delay={300}
                  icon="✨"
                >
                  <div className="flex items-center gap-2">
                    <SiOpenai className="text-green-400 animate-pulse" />
                    <a
                      href="https://chat.openai.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 flex-1"
                    >
                      ChatGPT
                    </a>
                    <button
                      onClick={() => handleCopy('https://chat.openai.com/')}
                      className="text-gray-400 hover:text-cyan-400 text-sm relative"
                    >
                      📋
                      {copiedUrl === 'https://chat.openai.com/' && (
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs shadow-md">
                          Copiato!
                        </span>
                      )}
                    </button>
                  </div>
                </Tooltip>
              </motion.li>
              <motion.li whileHover={{ scale: 1.05 }}>
                <Tooltip
                  text="Leggi la documentazione OpenAI"
                  position="top"
                  variant="info"
                  delay={300}
                  icon="i"
                >
                  <div className="flex items-center gap-2">
                    <BiBookContent className="text-yellow-400 animate-pulse" />
                    <a
                      href="https://platform.openai.com/docs/overview"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 flex-1"
                    >
                      Documentazione Prompts
                    </a>
                    <button
                      onClick={() =>
                        handleCopy('https://platform.openai.com/docs/overview')
                      }
                      className="text-gray-400 hover:text-cyan-400 text-sm relative"
                    >
                      📋
                      {copiedUrl ===
                        'https://platform.openai.com/docs/overview' && (
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs shadow-md">
                          Copiato!
                        </span>
                      )}
                    </button>
                  </div>
                </Tooltip>
              </motion.li>
              <motion.li whileHover={{ scale: 1.05 }}>
                <Tooltip
                  text="Apri il repository GitHub"
                  position="top"
                  variant="warning"
                  delay={300}
                  icon="⚠️"
                >
                  <div className="flex items-center gap-2">
                    <FaGithub className="text-white animate-pulse" />
                    <a
                      href="https://github.com/LLeo93/prompt-ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 flex-1"
                    >
                      Repository GitHub
                    </a>
                    <button
                      onClick={() =>
                        handleCopy('https://github.com/LLeo93/prompt-ai')
                      }
                      className="text-gray-400 hover:text-cyan-400 text-sm relative"
                    >
                      📋
                      {copiedUrl === 'https://github.com/LLeo93/prompt-ai' && (
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs shadow-md">
                          Copiato!
                        </span>
                      )}
                    </button>
                  </div>
                </Tooltip>
              </motion.li>
            </ul>
          </motion.section>

          <Divider />

          {/* Pulsante Home */}
          <div className="flex justify-center items-center mt-8">
            <Link to="/home">
              <Tooltip
                text="Torna alla home"
                position="top"
                variant="glow"
                delay={200}
                icon="🏠"
              >
                <motion.div
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5 }}
                >
                  <Button
                    variant="secondary"
                    size="lg"
                    className="flex justify-center items-center"
                  >
                    <motion.span
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1, 1.05, 1],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 6,
                        ease: 'easeInOut',
                      }}
                    >
                      <HiHome className="inline mr-2" /> Home
                    </motion.span>
                  </Button>
                </motion.div>
              </Tooltip>
            </Link>
          </div>
        </AnimatedComponent>
      </div>
    </div>
  );
};

export default AboutPage;
