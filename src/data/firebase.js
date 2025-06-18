// lib/firebase.js (veya utils/firebase.js)
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "PROJE.firebaseapp.com",
  projectId: "PROJE_ID",
  storageBucket: "PROJE.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
