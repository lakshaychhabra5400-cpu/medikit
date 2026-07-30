// Determine API base URL from Vite env variable when present (for deployed environments)
// Falls back to same origin /api/auth so a reverse-proxy or same-host backend still works.
const API_URL = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL)
  ? import.meta.env.VITE_API_URL
  : `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/api/auth`;

async function doPost(path, body) {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      credentials: 'include', // include cookies if backend uses them
    });

    // If the response is not JSON (network error or 204), handle gracefully
    let data = null;
    try { data = await response.json(); } catch (e) { /* ignore JSON parse errors */ }

    if (!response.ok) {
      // Prefer server-provided message, but fall back to status text
      const msg = data?.message || response.statusText || 'Request failed';
      throw new Error(msg);
    }

    return data;
  } catch (err) {
    // Distinguish network-level failures from application errors
    if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
      throw new Error('Network error: Unable to reach API server');
    }
    throw err;
  }
}

export function registerUser(userData) {
  return doPost('/register', userData);
}

export function loginUser(userData) {
  return doPost('/login', userData);
}
