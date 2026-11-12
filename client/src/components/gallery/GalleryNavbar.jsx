import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from '../Logo'
import { MenuIcon, CloseIcon } from '../dashboard/icons'

const LINKS = [
  { label: 'Home', to: '/', disabled: true },
  { label: 'Gallery', to: '/gallery' },
  { label: 'About', to: '/about', disabled: true },
]

const linkBase = 'rounded-lg px-3 py-2 text-base transition-colors'

function NavItem({ label, to, disabled, onClick }) {
  if (disabled) {
    return (
      <span aria-disabled="true" className={`${linkBase} cursor-not-allowed text-white/40`}>
        {label}
      </span>
    )
  }
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `${linkBase} ${isActive ? 'text-gold' : 'text-white hover:text-gold'}`
      }
    >
      {label}
    </NavLink>
  )
}

function AuthActions({ onNavigate, className = '' }) {
  return (
    <div className={`items-center gap-3 ${className}`}>
      <Link
        to="/login"
        onClick={onNavigate}
        className="rounded-lg border border-gold px-6 py-2 text-center text-base text-gold transition-colors hover:bg-gold/10"
      >
        Login
      </Link>
      <span
        aria-disabled="true"
        className="cursor-not-allowed rounded-lg bg-gold px-6 py-2 text-center text-base font-medium text-ink opacity-60"
      >
        Sign Up
      </span>
    </div>
  )
}

export default function GalleryNavbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="py-4 sm:py-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 lg:gap-10">
          <Link to="/gallery" aria-label="CORE V gallery" className="text-gold">
            <Logo className="size-10 sm:size-12" />
          </Link>
          <nav className="hidden items-center gap-2 md:flex lg:gap-6" aria-label="Main">
            {LINKS.map((l) => (
              <NavItem key={l.label} {...l} />
            ))}
          </nav>
        </div>

        <AuthActions className="hidden md:flex" />

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="grid size-11 place-items-center rounded-lg border border-white/15 text-white md:hidden"
        >
          {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.07] p-4 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {LINKS.map((l) => (
              <NavItem key={l.label} {...l} onClick={close} />
            ))}
          </nav>
          <AuthActions onNavigate={close} className="mt-4 grid grid-cols-2" />
        </div>
      )}
    </header>
  )
}