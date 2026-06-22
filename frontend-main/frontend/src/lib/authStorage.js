const AUTH_STORAGE_KEY = "auth";

export function getAuth() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function getAccessToken() {
  const auth = getAuth();
  if (auth?.token) return auth.token;
  return localStorage.getItem("token");
}

export function saveAuth(auth) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
  if (auth?.token) {
    localStorage.setItem("token", auth.token);
  }
}

export function clearAuth() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem("token");
}
