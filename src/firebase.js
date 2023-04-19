import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDOhkw1gcBm0U2jOHeTRtAeZBfYNDSOips",
    authDomain: "crypto-tracker-7ce0b.firebaseapp.com",
    projectId: "crypto-tracker-7ce0b",
    storageBucket: "crypto-tracker-7ce0b.appspot.com",
    messagingSenderId: "775694560916",
    appId: "1:775694560916:web:391605d5008824b12d4e81"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, db, provider };