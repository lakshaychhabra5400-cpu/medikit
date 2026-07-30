import { useEffect } from 'react'
import { FiX } from 'react-icons/fi'

export function Button({ children, variant = 'primary', className = '', ...props }) { return <button className={`button ${variant} ${className}`} {...props}>{children}</button> }
export function Input({ label, error, ...props }) { return <label className="field">{label && <span>{label}</span>}<input {...props} />{error && <small>{error}</small>}</label> }
export function Card({ children, className = '' }) { return <section className={`card ${className}`}>{children}</section> }
export function Modal({ title, children, onClose }) {
  useEffect(() => { const close = e => e.key === 'Escape' && onClose(); window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close) }, [onClose])
  return <div className="modal-backdrop" onMouseDown={onClose}><div className="modal" role="dialog" aria-modal="true" aria-label={title} onMouseDown={e => e.stopPropagation()}><div className="modal-title"><h2>{title}</h2><button aria-label="Close modal" onClick={onClose}><FiX /></button></div>{children}</div></div>
}
export function Toast({ text }) { return text ? <div className="toast" role="status">{text}</div> : null }
