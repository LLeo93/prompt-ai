import type { Prompt } from '../../types';
import { v4 as uuidv4 } from 'uuid';

const now = new Date();

export const defaultPrompts: Prompt[] = [
  {
    id: uuidv4(),
    title: 'Genera una meta description',
    content: `Agisci come un esperto di SEO. Scrivi una meta description concisa e accattivante (massimo 155 caratteri) per il seguente articolo: [Inserisci qui il titolo o il testo dell'articolo]. L'obiettivo è incoraggiare i clic dai risultati di ricerca.`,
    createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Brainstorming per un blog post',
    content: `Suggerisci 5 idee uniche per un blog post su [argomento]. Le idee devono essere pertinenti, ottimizzate per la SEO e coinvolgenti per un pubblico interessato a [descrivi il pubblico].`,
    createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Traduci un testo tecnico',
    content: `Traduci il seguente testo dall'italiano all'inglese, mantenendo un tono formale e tecnico. Assicurati che il vocabolario sia preciso per il settore di [settore di riferimento]. Testo da tradurre: [Inserisci qui il testo].`,
    createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Crea uno script per un video YouTube',
    content: `Crea uno script dettagliato per un video YouTube di 5 minuti su [argomento]. Lo script deve includere una intro accattivante, punti chiave da trattare e una call-to-action finale per incoraggiare gli iscritti.`,
    createdAt: now.toISOString(),
  },
];
