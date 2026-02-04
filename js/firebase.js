// js/firebase.js



import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = { /* your config */ };
const app = initializeApp(firebaseConfig);

// Ensure the 'export' keyword is present here
export const auth = getAuth(app); 

// 🔴 ONLY EDIT THIS OBJECT
const firebaseConfig = {
  apiKey: "AIzaSyBqU2zg5IBfvcV6lyMNBU-taYEGdIiOElU",
  authDomain: "fsonileordering.firebaseapp.com",
  projectId: "fsonileordering",
  storageBucket: "fsonileordering.firebasestorage.app",
  messagingSenderId: "570209320858",
  appId: "1:570209320858:web:2c1c8306bc12f10d520423",
  measurementId: "G-X0XF063QZS"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ EXPLICIT exports (THIS fixes your error)
export const auth = getAuth(app);
export const db = getDatabase(app);

