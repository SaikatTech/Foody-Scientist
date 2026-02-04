// js/firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";


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


