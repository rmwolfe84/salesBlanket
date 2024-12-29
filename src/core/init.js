import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDPBrfoqBwcazXXtteV0AM9T9klwYLigfs",
    authDomain: "salesblanket.firebaseapp.com",
    projectId: "salesblanket",
    storageBucket: "salesblanket.firebasestorage.app",
    messagingSenderId: "70376660372",
    appId: "1:70376660372:web:6c4292246d100ebd118381"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
