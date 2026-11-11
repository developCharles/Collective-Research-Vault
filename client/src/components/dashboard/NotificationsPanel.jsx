import { glass, ROUTES } from './constants';
import { ClockIcon, CommentIcon, CheckIcon, AlertIcon } from './icons';
import { timeAgo } from '../../utils/formatDate';

// notifications.type -> icon + tint
const TYPE_STYLES = {
  new_comment:   { Icon: CommentIcon, cls: 'bg-sky-500/20 text-sky-300' },
  status_change: { Icon: CheckIcon,   cls: 'bg-emerald-500/20 text-emerald-300' },
  assignment:    { Icon: CheckIcon,   cls: 'bg-emerald-500/20 text-emerald-300' },
  system:        { Icon: AlertIcon,   cls: 'bg-amber-500/20 text-amber-300' },
};

// Supports **bold** in messages (e.g. "**Prof. Miller** left a comment…").
function Message({ text }) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**')
      ? <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>
      : <span key={i}>{part}</span>
  );
}

export default function NotificationsPanel({ notifications, limit = 3, onViewAll }) {
  const items = notifications.slice(0, limit);

  return (
    <section aria-labelledby="notif-heading">
      <h2 id="notif-heading" className="mb-4 flex items-center gap-2 text-sm font-medium text-white/70">
        <ClockIcon className="h-4 w-4" /> Notifications
      </h2>

      <div className={`${glass} p-5`}>
        {items.length === 0 ? (
          <p className="py-6 text-center text-sm text-white/50">You&apos;re all caught up.</p>
        ) : (
          <ul className="divide-y divide-white/10">
            {items.map((n) => {
              const { Icon, cls } = TYPE_STYLES[n.type] ?? TYPE_STYLES.system;
              return (
                <li key={n.id} className="flex gap-3 py-3 first:pt-0">
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${cls}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[13px] leading-snug text-white/90"><Message text={n.message} /></p>
                    <p className="mt-1 text-[11px] text-white/40">{timeAgo(n.createdAt)}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <button
          type="button"
          onClick={onViewAll}
          className="mt-2 w-full rounded-full border border-white/15 py-2 text-xs font-semibold text-white/60 transition hover:border-white/30 hover:text-white"
        >
          View All Notifications
        </button>
      </div>
    </section>
  );
}
