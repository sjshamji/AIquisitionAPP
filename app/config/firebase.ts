import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCKOuNpE2dwR8vTX8Eq4Oi0ls9UeRlky-c",
  authDomain: "aiquisition-bbd3f.firebaseapp.com",
  projectId: "aiquisition-bbd3f",
  storageBucket: "aiquisition-bbd3f.firebasestorage.app",
  messagingSenderId: "636262831781",
  appId: "1:636262831781:web:d733be00335bf176661f4c",
  measurementId: "G-DN81W5MMZZ"
};
// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db }; 