import { NavLink, useNavigate } from 'react-router-dom'
import { FiHome, FiShoppingCart, FiClock, FiPhone, FiUser, FiMenu } from 'react-icons/fi'

const items = [['/dashboard', 'Dashboard', FiHome], ['/medicines', 'Medicines', FiShoppingCart], ['/reminders', 'Reminders', FiClock], ['/emergency', 'Emergency', FiPhone], ['/profile', 'Profile', FiUser]]

export function Header({ onMenu, user, setUser }) {
  const go = useNavigate()
  const userName = user?.name || localStorage.getItem('userName')

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    localStorage.removeItem('userName')
    try { window.dispatchEvent(new Event('auth:logout')) } catch (e) {}
    setUser && setUser(null)
    go('/login')
  }

  return (
    <header>
      <button className="menu-btn" onClick={onMenu} aria-label="Open navigation"><FiMenu /></button>
      <NavLink to="/" className="brand">✚ Medkit.com</NavLink>
      <nav><NavLink to="/">Home</NavLink><NavLink to="/medicines">Medicines</NavLink><NavLink to="/about">About us</NavLink></nav>
      {user || userName ? (
        <div className="header-right">
          <span className="greeting">Hello, {user?.name || userName.split(' ')[0]}</span>
          <button className="link-btn" onClick={() => go('/profile')}>Profile</button>
          <button className="link-btn" onClick={logout}>Logout</button>
        </div>
      ) : (
        <div className="header-right">
          <button className="link-btn" onClick={() => go('/login')}>Login</button>
          <button className="link-btn" onClick={() => go('/register')}>Sign up</button>
        </div>
      )}
    </header>
  )
}

export function Sidebar({ open, onClose }) {
  return <aside className={open ? 'sidebar open' : 'sidebar'}><div className="mobile-close"><button onClick={onClose}>Close ×</button></div>{items.map(([to, label, Icon]) => to === '#' ? <a href="#placeholder" key={label} onClick={e => e.preventDefault()}><Icon />{label}</a> : <NavLink key={label} to={to} onClick={onClose}><Icon />{label}</NavLink>)}</aside>
}

export function AppShell({ children, open, onClose }) {
  return <><Sidebar open={open} onClose={onClose}/><main className="app-main">{children}</main></>
}
