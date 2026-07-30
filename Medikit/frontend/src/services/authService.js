// Determine API base URL from Vite env variable when present (for deployed environments)
// Falls back to same origin /api/auth so a reverse-proxy or same-host backend still works.
const API_URL = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL)
  ? import.meta.env.VITE_API_URL
  : `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/api/auth`;

const LOCAL_AUTH_KEY = 'medikitLocalAuthUsers'

function getLocalUsers() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_AUTH_KEY) || '[]')
  } catch (err) {
    return []
  }
}

function setLocalUsers(users) {
  localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(users))
}

function localRegister(body) {
  const users = getLocalUsers()
  const email = body.email.toLowerCase()
  if (users.some((item) => item.email === email)) {
    throw new Error('An account with this email already exists.')
  }

  const user = {
    id: `local-${Date.now()}`,
    name: body.name,
    email,
  }

  users.push({ ...user, password: body.password })
  setLocalUsers(users)

  return {
    user,
    accessToken: 'local-access-token',
    refreshToken: 'local-refresh-token',
  }
}

function localLogin(body) {
  const users = getLocalUsers()
  const email = body.email.toLowerCase()
  const stored = users.find((item) => item.email === email)
  if (!stored || stored.password !== body.password) {
    throw new Error('Invalid email or password.')
  }

  return {
    user: {
      id: stored.id,
      name: stored.name,
      email: stored.email,
    },
    accessToken: 'local-access-token',
    refreshToken: 'local-refresh-token',
  }
}

async function doPost(path, body) {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      credentials: 'include', // include cookies if backend uses them
    });

    // If the response is not JSON (network error or 204), handle gracefully
    let data = null
    try { data = await response.json() } catch (e) { /* ignore JSON parse errors */ }

    if (!response.ok) {
      const msg = data?.message || response.statusText || 'Request failed'
      throw new Error(msg)
    }

    return data
  } catch (err) {
    const networkError = err.name === 'TypeError' || err instanceof TypeError || err.message?.includes('Failed to fetch')
    if (networkError) {
      if (path === '/register') return localRegister(body)
      if (path === '/login') return localLogin(body)
      throw new Error('Network error: Unable to reach API server')
    }
    throw err
  }
}

export function registerUser(userData) {
  return doPost('/register', userData);
}

export function loginUser(userData) {
  return doPost('/login', userData);
}
