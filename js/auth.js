// js/auth.js
import { auth } from "./firebase.js";
import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { saveLoginTime, isSessionValid, clearSession } from "./session.js";

let recaptchaVerifier = null;

// ✅ Create reCAPTCHA ONLY when needed
function getRecaptcha() {
  if (!recaptchaVerifier) {
    recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible"
      }
    );
  }
  return recaptchaVerifier;
}

export async function sendOTP(phone) {
  const verifier = getRecaptcha();
  return signInWithPhoneNumber(auth, phone, verifier);
}

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
