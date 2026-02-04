// js/auth.js
import { auth } from "./firebase.js";
const BASE_PATH = "/Foody-Scientist/";

import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { saveLoginTime, isSessionValid, clearSession } from "./session.js";

window.recaptchaVerifier = new RecaptchaVerifier(
  auth,
  "recaptcha-container",
  { size: "invisible" }
);

export function sendOTP(phone) {
  return signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
}

export function monitorAuth(redirectIfLoggedIn = false) {
  onAuthStateChanged(auth, (user) => {
    if (user && isSessionValid()) {
      if (redirectIfLoggedIn) {
        window.location.replace(BASE_PATH + "index.html");
      }
    } else {
      clearSession();
      if (!redirectIfLoggedIn) {
        window.location.replace(BASE_PATH + "login.html");
      }
    }
  });
}


