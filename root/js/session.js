// js/session.js
const SESSION_LIMIT = 45 * 60 * 1000; // 45 minutes

export function saveLoginTime() {
  localStorage.setItem("loginTime", Date.now());
}

export function isSessionValid() {
  const t = localStorage.getItem("loginTime");
  if (!t) return false;
  return (Date.now() - Number(t)) < SESSION_LIMIT;
}

export function clearSession() {
  localStorage.removeItem("loginTime");
}
