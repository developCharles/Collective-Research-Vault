import { NavLink, useLocation } from 'react-router-dom'
import useForum from '../../context/useForum'
import { ROUTES } from './constants'
import Logo from '../Logo'
import { HomeIcon, UsersIcon, BookIcon, BellIcon, PlusIcon } from './icons'

export const NAV = [
  { label: 'Home', to: ROUTES.home, icon: HomeIcon, end: true },
  { label: 'Forum', to: ROUTES.forum, icon: UsersIcon },
  { label: 'Research Archive', to: ROUTES.archive, icon: BookIcon, disabled: true },
  { label: 'Notifications', to: ROUTES.history, icon: BellIcon },
]

const initials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('') || '?'

const itemBase =
  'flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-[0.9375rem] transition-colors'

const linkCls = ({ isActive }) =>
  `${itemBase} ${
    isActive
      ? 'border-r-4 border-r-gold-edge bg-gold/10 text-gold'
      : 'text-white/75 hover:bg-white/5 hover:text-white'
  }`

export default function Sidebar({ user, onLogout }) {
  const name = user?.name ?? user?.full_name ?? 'Student'
  const { pathname } = useLocation()
  const { openComposer } = useForum()
  const onForum = pathname.startsWith(ROUTES.forum)

  return (
    <aside className="sticky top-6 hidden h-[calc(100dvh-3rem)] w-64 shrink-0 self-start flex-col overflow-y-auto rounded-3xl border border-white/10 bg-panel p-6 font-display shadow-lg shadow-black/20 backdrop-blur-sm lg:flex xl:w-72">
      <div className="flex items-center gap-3 pb-10 pt-1">
        <Logo className="size-12 shrink-0 text-gold" />
        <span className="text-2xl font-bold tracking-wide">
          CORE <span className="text-gold">V</span>
        </span>
      </div>

      <nav className="flex flex-col gap-1.5">
        {NAV.map(({ label, to, icon: Icon, end, disabled }) =>
          disabled ? (
            <span
              key={label}
              aria-disabled="true"
              title="Coming soon"
              className={`${itemBase} cursor-not-allowed text-white/30`}
            >
              <Icon className="size-5" />
              {label}
            </span>
          ) : (
            <NavLink key={to} to={to} end={end} className={linkCls}>
              <Icon className="size-5" />
              {label}
            </NavLink>
          )
        )}
      </nav>

      <div className="mt-auto pt-6">
        {onForum && (
          <button
            type="button"
            onClick={openComposer}
            className={`${itemBase} mb-8 w-full text-white/75 hover:bg-white/5 hover:text-white`}
          >
            <span className="grid size-6 place-items-center rounded-full bg-white/10">
              <PlusIcon className="size-4" />
            </span>
            Add New Post
          </button>
        )}
        <div className="flex items-center gap-3 px-1">
          <div className="grid size-10 shrink-0 place-items-center rounded-full bg-gold text-sm font-bold text-ink">
            {initials(name)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{name}</p>
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
    <nav className="flex gap-2 overflow-x-auto pb-1 font-display lg:hidden">
      {NAV.filter((n) => !n.disabled).map(({ label, to, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold ${
              isActive ? 'border-gold bg-gold/10 text-gold' : 'border-white/15 text-white/70'
            }`
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  )
}