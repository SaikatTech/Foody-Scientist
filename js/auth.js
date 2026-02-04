// js/auth.js
import { auth } from "./firebase.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { saveLoginTime, isSessionValid, clearSession } from "./session.js";

const provider = new GoogleAuthProvider();

// ✅ Google Sign-In
export async function googleLogin() {
  await signInWithPopup(auth, provider);
  saveLoginTime();
}

// ✅ Logout (optional, useful later)
export async function logout() {
  await signOut(auth);
  clearSession();
  window.location.replace("/Foody-Scientist/login.html");
}

// ✅ Route protection
export function monitorAuth(redirectIfLoggedIn = false) {
  onAuthStateChanged(auth, (user) => {
    if (user && isSessionValid()) {
      if (redirectIfLoggedIn) {
        window.location.replace("/Foody-Scientist/index.html");
      }
    } else {
      clearSession();
      if (!redirectIfLoggedIn) {
        window.location.replace("/Foody-Scientist/login.html");
      }
    }
  });
}
