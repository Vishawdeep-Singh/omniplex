import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDmgMGeAtHX1uFRD9boI058mDHinJgRfU0",
  authDomain: "omniplex-5d365.firebaseapp.com",
  projectId: "omniplex-5d365",
  storageBucket: "omniplex-5d365.firebasestorage.app",
  messagingSenderId: "246216063496",
  appId: "1:246216063496:web:176d1558ad70cdbee2efbd",
  measurementId: "G-G32Q5XV5T5"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };

export const initializeFirebase = () => {
  return app;
};
