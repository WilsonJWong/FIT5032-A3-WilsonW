import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAZJQXYfVKdKDURAvO6RhsFEZrnwocSHR0",
  authDomain: "ito5032-a3.firebaseapp.com",
  projectId: "ito5032-a3",
  storageBucket: "ito5032-a3.firebasestorage.app",
  messagingSenderId: "994961541627",
  appId: "1:994961541627:web:c747e473f4cf6a0bfde35e"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
