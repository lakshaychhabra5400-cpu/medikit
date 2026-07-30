import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FiArrowLeft, FiBell, FiCheck, FiClock, FiEdit2, FiMapPin, FiMessageSquare, FiPlus, FiSearch, FiShoppingBag, FiUser, FiUpload, FiVolume2, FiX } from 'react-icons/fi'
import { medicines, categories } from '../data/mockData'
import { Button, Card, Input, Modal } from '../components/Ui'

export function Dashboard({ reminders, user }) {
 const name = user?.name || localStorage.getItem('userName') || 'User'
 return <div className="page dashboard"><div className="page-heading"><p>Home › Dashboard</p><h1>Hello, {name}</h1><span>Here's your Health overview</span></div><Card className="next-dose"><small>Next Dose</small><strong>Amlokind AT</strong><span>Time <b>09:00</b></span><Button>Mark as Taken</Button></Card><div className="action-grid"><Link to="/upload-prescription"><Card><FiUpload/><span>Upload<br/>Prescription</span></Card></Link><Link to="/nearby-store"><Card><FiShoppingBag/><span>Nearby<br/>Store</span></Card></Link><Link to="/consultation"><Card><FiMessageSquare/><span>AI Doctor<br/>Consultation</span></Card></Link><Link to="/reminders"><Card><FiBell/><span>Create New<br/>Reminder</span></Card></Link></div><Card className="today"><b>Today’s medicine</b>{reminders.filter(r=>r.date==='Today').map(r=><p key={r.id}>{r.medicine}<span>{r.time}</span></p>)}</Card></div>
}

export function Medicines() {
 const [term, setTerm] = useState('')
 const [active, setActive] = useState('All')
 const filtered = useMemo(() => medicines.filter(m => (active === 'All' || m.category.includes(active.split(' ')[0])) && m.name.toLowerCase().includes(term.toLowerCase())), [active, term])

 return <div className="page"><div className="crumb">Home › Medicine</div><h1>Vitamins & Supplements</h1><div className="search"><FiSearch/><input aria-label="Search medicines" value={term} onChange={e => setTerm(e.target.value)} placeholder="Search medicines"/></div><div className="category-grid"><button onClick={() => setActive('All')} className={active === 'All' ? 'active' : ''}>All</button>{categories.map(c => <button key={c} className={active === c ? 'active' : ''} onClick={() => setActive(c)}>{c}</button>)}</div><div className="medicine-grid">{filtered.map(m => <Link key={m.id} to={`/medicines/${m.id}`}><Card className="medicine-card"><img src={m.image} alt={m.name}/><h3>{m.name}</h3><p className="medicine-use"><b>Use:</b> {m.usefulness}</p><p>{m.description}</p></Card></Link>)}{!filtered.length && <p>No medicines found.</p>}</div></div>
}

export function MedicineDetail({ addToast }) {
 const { id } = useParams()
 const medicine = medicines.find(m => m.id === id) || medicines[0]
 const [quantity, setQuantity] = useState(1)

 return <div className="page detail"><Link className="back" to="/medicines"><FiArrowLeft/> Back</Link><div className="crumb">Home › Medicine › {medicine.name}</div><div className="detail-grid"><img src={medicine.image} alt={medicine.name}/><div><h1>{medicine.name}</h1><p>Strip of 15 tablets</p><p className="rating">★ 4.7 <span>({medicine.price} reviews)</span></p><h2>₹ {medicine.price}/Box</h2><small>Inclusive of all taxes</small><hr/><h3>About this medicine</h3><p>{medicine.description}</p><h3>How to Use</h3><p>{medicine.dosage}</p><div className="quantity"><button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button><b>{quantity}</b><button onClick={() => setQuantity(quantity + 1)}>+</button></div><Button variant="outline" onClick={() => addToast('Medicine saved to your list')}>＋ Save</Button><Button onClick={() => addToast(`${quantity} item${quantity > 1 ? 's' : ''} added to cart`)}>Add to Cart</Button></div></div></div>
}

export function Profile({ reminders = [], user, setUser }) {
 const navigate = useNavigate()
 const name = user?.name || localStorage.getItem('userName') || 'User'
 const accessToken = localStorage.getItem('accessToken')

 const handleLogout = () => {
   localStorage.removeItem('accessToken')
   localStorage.removeItem('refreshToken')
   localStorage.removeItem('user')
   localStorage.removeItem('userName')
   try { window.dispatchEvent(new Event('auth:logout')) } catch (e) {}
   setUser && setUser(null)
   navigate('/')
 }

 if (!accessToken && !user) {
   return <div className="page user-entry"><div className="user-entry-icon"><FiBell/></div><p className="eyebrow">WELCOME TO MEDKIT</p><h1>Manage your health with ease.</h1><p>Log in to continue with your medicine reminders, or create a new account to get started.</p><div className="user-entry-actions"><Link to="/login"><Button>Login</Button></Link><Link to="/register"><Button variant="outline">Create Account</Button></Link></div></div>
 }

 const upcoming = reminders.filter(r => !r.complete)
 const nextReminder = upcoming.reduce((current, item) => {
   if (!current) return item
   return item.time < current.time ? item : current
 }, null)

 return (
   <div className="page user-entry">
     <div className="user-entry-icon"><FiBell/></div>
     <p className="eyebrow">WELCOME BACK</p>
     <h1>{name}</h1>
     <p>Access your health tools, appointments, and doctor consultations from one place.</p>
     <div className="profile-summary">
       <div className="profile-summary-card">
         <h2>My reminders</h2>
         <p>{upcoming.length} active reminder{upcoming.length === 1 ? '' : 's'}</p>
         {nextReminder ? <p>Next: {nextReminder.medicine} at {nextReminder.time}</p> : <p>No active reminders yet.</p>}
       </div>
     </div>
     <div className="user-entry-actions button-row">
       <Link to="/reminders"><Button variant="outline">My Reminders</Button></Link>
       <Link to="/consultation"><Button variant="outline">Continue to Consultation</Button></Link>
     </div>
     <div className="user-entry-actions">
       <Button onClick={handleLogout}>Logout</Button>
     </div>
   </div>
 )
}

export function Reminders({ reminders, setReminders, addToast }) {
 const [modal, setModal] = useState(false)
 const [draft, setDraft] = useState({ medicine: '', time: '09:00', date: 'Today' })
 const [permission, setPermission] = useState(typeof Notification === 'undefined' ? 'unsupported' : Notification.permission)
 const alerted = useRef(new Set())

 const enableNotifications = async () => {
   if (typeof Notification === 'undefined') return addToast('Notifications are not supported by this browser.')
   const result = await Notification.requestPermission()
   setPermission(result)
   addToast(result === 'granted' ? 'Alarm notifications enabled.' : 'Please allow notifications in your browser settings.')
 }

 useEffect(() => {
   const check = () => {
     if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return
     const now = new Date()
     const time = now.toTimeString().slice(0, 5)
     reminders.filter(r => r.date === 'Today' && !r.complete && r.time === time && !alerted.current.has(r.id)).forEach(r => {
       alerted.current.add(r.id)
       new Notification('Medkit medicine alarm', { body: `Time to take ${r.medicine}.`, icon: '/favicon.ico' })
       addToast(`Alarm: time to take ${r.medicine}`)
     })
   }
   check()
   const timer = window.setInterval(check, 15000)
   return () => window.clearInterval(timer)
 }, [reminders, addToast])

 const add = e => {
   e.preventDefault()
   if (!draft.medicine.trim()) return
   setReminders([...reminders, { ...draft, id: Date.now(), complete: false }])
   setModal(false)
   addToast('Alarm reminder created')
 }

 const toggle = id => setReminders(reminders.map(r => r.id === id ? { ...r, complete: !r.complete } : r))
 const remove = id => {
   setReminders(reminders.filter(r => r.id !== id))
   addToast('Reminder deleted')
 }
 const next = reminders.find(r => r.date === 'Today' && !r.complete)

 return <div className="page reminders"><div className="reminder-title"><div><div className="crumb">Home › Reminder</div><h1>Medicine alarms</h1><p>Never miss an important dose.</p></div><Button onClick={() => setModal(true)}><FiPlus/> Add alarm</Button></div><section className="alarm-hero"><div className="alarm-icon"><FiClock/></div><div><small>NEXT ALARM</small><h2>{next ? next.time : 'All caught up'}</h2><b>{next ? next.medicine : 'No medicine alarms for today'}</b><p>{next ? 'Today · Tap the check mark after taking it.' : 'Add an alarm to keep your routine on track.'}</p></div><button className={permission === 'granted' ? 'notification-control enabled' : 'notification-control'} onClick={enableNotifications}><FiVolume2/>{permission === 'granted' ? 'Notifications on' : 'Enable notifications'}</button></section><p className="alarm-note">Browser notifications are sent when an alarm time arrives while Medkit is open.</p><div className="calendar"><b>YOUR ALARMS</b><span>{reminders.filter(r => !r.complete).length} active</span></div><div className="reminder-list">{reminders.map(r => <Card key={r.id} className={r.complete ? 'reminder complete' : 'reminder'}><button className="check" onClick={() => toggle(r.id)} aria-label={`Mark ${r.medicine} complete`}>{r.complete && <FiCheck/>}</button><div><b>{r.medicine}</b><small><FiBell/> {r.date} at {r.time}</small></div><strong>{r.complete ? 'Taken' : r.date}</strong><button className="delete" onClick={() => remove(r.id)} aria-label={`Delete ${r.medicine}`}><FiX/></button></Card>)}</div>{modal && <Modal title="Set a medicine alarm" onClose={() => setModal(false)}><form onSubmit={add}><Input label="Medicine" placeholder="Medicine name" value={draft.medicine} onChange={e => setDraft({ ...draft, medicine: e.target.value })}/><Input label="Alarm time" type="time" value={draft.time} onChange={e => setDraft({ ...draft, time: e.target.value })}/><label className="field"><span>Schedule</span><select value={draft.date} onChange={e => setDraft({ ...draft, date: e.target.value })}><option>Today</option><option>Tomorrow</option></select></label><Button type="submit"><FiClock/> Set alarm</Button></form></Modal>}</div>
}
