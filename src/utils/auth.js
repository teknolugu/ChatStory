import Auth from 'firebase-auth-lite';

const auth = new Auth({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  redirectUri: `${window.location.origin}/auth`,
});

export function fetchAPI(path, options = {}) {
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  return auth.authorizedRequest(`${baseURL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });
}

export default auth;
