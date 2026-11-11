import { NavLink } from 'react-router-dom'
import { ROUTES, glass } from './constants'
import { HomeIcon, UsersIcon, BookIcon, ClockIcon } from './icons'

export const NAV = [
  { label: 'Home', to: ROUTES.home, icon: HomeIcon, end: true },
  { label: 'My Group', to: ROUTES.group, icon: UsersIcon, disabled: true },
  { label: 'Research Archive', to: ROUTES.archive, icon: BookIcon, disabled: true },
  { label: 'History', to: ROUTES.history, icon: ClockIcon },
]

const initials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('') || '?'

const linkCls = ({ isActive }) =>
  `relative flex items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors ${
    isActive
      ? 'border-white/10 bg-white/10 text-gold after:absolute after:inset-y-1.5 after:right-0 after:w-1 after:rounded-full after:bg-gold'
      : 'border-white/5 text-white/70 hover:bg-white/5 hover:text-white'
  }`

export default function Sidebar({ user, onLogout }) {
  const name = user?.name ?? user?.full_name ?? 'Student'

  return (
    <aside
      className={`${glass} sticky top-6 hidden h-[calc(100dvh-3rem)] w-64 shrink-0 self-start flex-col overflow-y-auto p-5 lg:flex`}
    >
      <div className="flex items-center gap-3 px-2 pb-8 pt-1">
        <div className="grid size-9 place-items-center rounded-lg border-2 border-gold font-bold text-gold">
          V
        </div>
        <span className="font-display text-xl font-bold tracking-wide">
          CORE <span className="text-gold">V</span>
        </span>
      </div>

      <nav className="flex flex-col gap-2">
        {NAV.map(({ label, to, icon: Icon, end, disabled }) =>
          disabled ? (
            <span
              key={label}
              aria-disabled="true"
              title="Coming soon"
              className="flex cursor-not-allowed items-center gap-3 rounded-xl border border-white/5 px-4 py-3 text-sm text-white/30"
            >
              <Icon />
              {label}
            </span>
          ) : (
            <NavLink key={to} to={to} end={end} className={linkCls}>
              <Icon />
              {label}
            </NavLink>
          )
        )}
      </nav>

      <div className="mt-auto pt-6">
        <div className="flex items-center gap-3 px-1">
          <div className="grid size-10 shrink-0 place-items-center rounded-full bg-gold text-sm font-bold text-ink">
            {initials(name)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{name}</p>
            <p className="text-xs text-white/50">Student</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="mt-4 w-full rounded-xl border border-white/15 py-2 text-xs font-semibold text-white/70 transition hover:border-white/30 hover:text-white"
        >
          Logout
        </button>
      </div>
    </aside>
  )
}

export function MobileNav() {
  return (
    <nav className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
      {NAV.filter((n) => !n.disabled).map(({ label, to, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold ${
              isActive ? 'border-gold text-gold' : 'border-white/15 text-white/70'
            }`
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  )
}