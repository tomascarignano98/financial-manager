import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyAlI6bbmynaCdikKOp9SDZNehI427Rq6xU',
  authDomain: 'financial-manager-15135.firebaseapp.com',
  projectId: 'financial-manager-15135',
  storageBucket: 'financial-manager-15135.appspot.com',
  messagingSenderId: '132269933439',
  appId: '1:132269933439:web:ac3f233b6dc8a9ca6c904a',
  measurementId: 'G-59MWYB81PY',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
