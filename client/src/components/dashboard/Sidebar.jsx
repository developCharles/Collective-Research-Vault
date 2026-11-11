import { NavLink } from 'react-router-dom';
import { ROUTES, glass } from './constants';
import { HomeIcon, UsersIcon, BookIcon, ClockIcon } from './icons';

// `disabled` items are in the design but have no page/route yet.
export const NAV = [
  { label: 'Home', to: ROUTES.home, icon: HomeIcon, end: true },
  { label: 'My Group', to: ROUTES.group, icon: UsersIcon, disabled: true },
  { label: 'Research Archive', to: ROUTES.archive, icon: BookIcon, disabled: true },
  { label: 'History', to: ROUTES.history, icon: ClockIcon },
];

const initials = (name = '') =>
  name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('') || '?';

const linkCls = ({ isActive }) =>
  `relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm border transition-colors ${
    isActive
      ? 'bg-white/10 border-white/10 text-[#F5B829] after:absolute after:right-0 after:top-1.5 after:bottom-1.5 after:w-1 after:rounded-full after:bg-[#F5B829]'
      : 'border-white/5 text-white/70 hover:bg-white/5 hover:text-white'
  }`;

export default function Sidebar({ user, onLogout }) {
  const name = user?.name ?? user?.full_name ?? 'Student';

  return (
    <aside className={`${glass} hidden lg:flex lg:flex-col w-[260px] shrink-0 p-5 sticky top-6 h-[calc(100vh-3rem)]`}>
      <div className="flex items-center gap-3 px-2 pt-1 pb-8">
        <div className="w-9 h-9 rounded-lg border-2 border-[#F5B829] grid place-items-center text-[#F5B829] font-bold">V</div>
        <span className="text-xl font-bold tracking-wide">
          CORE <span className="text-[#F5B829]">V</span>
        </span>
      </div>

      <nav className="flex flex-col gap-2">
        {NAV.map(({ label, to, icon: Icon, end, disabled }) =>
          disabled ? (
            <span
              key={label}
              aria-disabled="true"
              title="Coming soon"
              className="flex items-center gap-3 rounded-xl border border-white/5 px-4 py-3 text-sm text-white/35 cursor-not-allowed"
            >
              <Icon className="w-4 h-4" />
              {label}
              <span className="ml-auto text-[10px] uppercase tracking-wider">Soon</span>
            </span>
          ) : (
            <NavLink key={to} to={to} end={end} className={linkCls}>
              <Icon className="w-4 h-4" />
              {label}
            </NavLink>
          )
        )}
      </nav>

      <div className="mt-auto">
        <div className="flex items-center gap-3 px-1">
          <div className="w-10 h-10 rounded-full bg-[#F5B829] text-[#1f2a5c] grid place-items-center text-sm font-bold">
            {initials(name)}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold truncate">{name}</p>
            <p className="text-[11px] text-white/50">Student</p>
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
  );
}

// Simple horizontal nav shown below the lg breakpoint (sidebar is hidden there).
export function MobileNav() {
  return (
    <nav className="flex gap-2 overflow-x-auto lg:hidden">
      {NAV.filter((n) => !n.disabled).map(({ label, to, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold ${
              isActive ? 'border-[#F5B829] text-[#F5B829]' : 'border-white/15 text-white/70'
            }`
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
