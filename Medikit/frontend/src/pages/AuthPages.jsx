import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaApple, FaFacebook, FaGoogle } from 'react-icons/fa'
import { Button, Input } from '../components/Ui'
import { loginUser, registerUser } from '../services/authService'

export function AuthPage({ register = false }) {
 const go = useNavigate()
 const location = useLocation()
 const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
 const [error, setError] = useState('')
 const [loading, setLoading] = useState(false)

 const fromPath = location.state?.from || '/dashboard'
 const returningFrom = location.state?.from
 const change = e => setForm({ ...form, [e.target.name]: e.target.value })

 const submit = async (e) => {
   e.preventDefault()
   if (register && !form.name) return setError('Enter your full name.')
   if (!/\S+@\S+\.\S+/.test(form.email)) return setError('Enter a valid email address.')
   if (form.password.length < 8) return setError('Password must be at least 8 characters.')
   if (register && form.password !== form.confirm) return setError('Passwords do not match.')

   setError('')
   setLoading(true)

   try {
     const payload = {
       email: form.email,
       password: form.password,
       ...(register ? { name: form.name } : {})
     }

     const response = register ? await registerUser(payload) : await loginUser(payload)
     localStorage.setItem('accessToken', response.accessToken)
     localStorage.setItem('refreshToken', response.refreshToken)
     localStorage.setItem('userName', response.user.name)
     localStorage.setItem('user', JSON.stringify(response.user))
     try { window.dispatchEvent(new CustomEvent('auth:login', { detail: response.user })) } catch (e) {}
     go(fromPath)
   } catch (err) {
     setError(err.message || 'Network error. Please try again.')
   } finally {
     setLoading(false)
   }
 }

 return (
   <div className="auth-page">
     <div className="auth-card">
       <div className="auth-copy">
         <h1>{register ? 'Create Account' : 'Welcome Back'}</h1>
         <p>{register ? 'Sign up to get started' : 'Login To Continue'}</p>
         {returningFrom === '/consultation' && (
           <p className="auth-notice">After signing in, you will return to your consultation booking.</p>
         )}
       </div>
       <form onSubmit={submit}>
         {register && <Input label="Full Name" name="name" value={form.name} onChange={change} placeholder="Full name" />}
         <Input label="Email" name="email" value={form.email} onChange={change} placeholder="Email address" type="email" />
         <Input label="Password" name="password" value={form.password} onChange={change} placeholder="Password" type="password" />
         {register && <Input label="Confirm Password" name="confirm" value={form.confirm} onChange={change} placeholder="Confirm password" type="password" />}
         {!register && <a className="forgot" href="#forgot">Forgot Password?</a>}
         {error && <p className="error">{error}</p>}
         <Button type="submit" disabled={loading}>{loading ? (register ? 'Creating account...' : 'Logging in...') : register ? 'Sign up' : 'Login'}</Button>
       </form>
       <div className="or">or continue with</div>
       <div className="socials">
         <button aria-label="Continue with Google"><FaGoogle/></button>
         <button aria-label="Continue with Facebook"><FaFacebook/></button>
         <button aria-label="Continue with Apple"><FaApple/></button>
       </div>
       <p className="auth-foot">{register ? 'Already have an account?' : 'New to Medkit?'} <Link to={register ? '/login' : '/register'} state={location.state}>{register ? 'Login' : 'Sign up'}</Link></p>
     </div>
   </div>
 )
}
