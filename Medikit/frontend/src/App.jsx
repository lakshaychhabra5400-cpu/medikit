import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Header, AppShell } from './components/Layout'
import { Toast } from './components/Ui'
import Landing from './pages/Landing'
import About from './pages/About'
import Emergency from './pages/Emergency'
import PrescriptionUpload from './pages/PrescriptionUpload'
import NearbyStore from './pages/NearbyStore'
import Consultation from './pages/Consultation'
import { AuthPage } from './pages/AuthPages'
import { Dashboard, Medicines, MedicineDetail, Profile, Reminders } from './pages/AppPages'
import { initialReminders } from './data/mockData'

export default function App() {
  const location = useLocation()
  const [menu, setMenu] = useState(false)
  const [reminders, setReminders] = useState(initialReminders)
  const [toast, setToast] = useState('')
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user') || 'null')
    } catch (e) {
      return null
    }
  })

  const appRoute = !['/', '/login', '/register', '/about'].includes(location.pathname)
  const addToast = text => {
    setToast(text)
    window.setTimeout(() => setToast(''), 2500)
  }

  useEffect(() => {
    const onLogin = (e) => setUser(e.detail || JSON.parse(localStorage.getItem('user') || 'null'))
    const onLogout = () => setUser(null)
    window.addEventListener('auth:login', onLogin)
    window.addEventListener('auth:logout', onLogout)
    return () => {
      window.removeEventListener('auth:login', onLogin)
      window.removeEventListener('auth:logout', onLogout)
    }
  }, [])

  return (
    <>
      <Header onMenu={() => setMenu(true)} user={user} setUser={setUser} />
      {appRoute ? (
        <AppShell open={menu} onClose={() => setMenu(false)}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard reminders={reminders} user={user} />} />
            <Route path="/medicines" element={<Medicines />} />
            <Route path="/medicines/:id" element={<MedicineDetail addToast={addToast} />} />
            <Route path="/profile" element={<Profile reminders={reminders} addToast={addToast} user={user} setUser={setUser} />} />
            <Route path="/reminders" element={<Reminders reminders={reminders} setReminders={setReminders} addToast={addToast} />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/upload-prescription" element={<PrescriptionUpload />} />
            <Route path="/nearby-store" element={<NearbyStore />} />
            <Route path="/consultation" element={<Consultation />} />
          </Routes>
        </AppShell>
      ) : (
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage register />} />
        </Routes>
      )}
      <Toast text={toast} />
    </>
  )
}
