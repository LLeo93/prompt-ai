import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBrbMS47zgZ0IlbagNO-nrgOS_aPLMW5pc',
  authDomain: 'prompt-ai-1b558.firebaseapp.com',
  projectId: 'prompt-ai-1b558',
  storageBucket: 'prompt-ai-1b558.appspot.com',
  messagingSenderId: '622552484473',
  appId: '1:622552484473:web:3c0a5f707253fbe57c62a8',
  measurementId: 'G-TXM81RCCWQ',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

enableIndexedDbPersistence(db).catch((err: unknown) => {
  if (typeof err === 'object' && err !== null && 'code' in err) {
    console.warn('Could not enable persistence:', (err as any).code);
  } else {
    console.warn('Could not enable persistence:', err);
  }
});

export default app;
