import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import * as authModule from 'firebase/auth';

const firebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_VITE_FIREBASE_AUTH_DOMAIN,
});

export const auth = getAuth();
console.log(authModule);

export default firebaseApp;
