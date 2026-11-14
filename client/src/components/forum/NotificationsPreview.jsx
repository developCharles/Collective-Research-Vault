import { Link } from 'react-router-dom'
import { glass, ROUTES } from '../dashboard/constants'
import { ClockIcon } from '../dashboard/icons'
import NotificationIcon from '../notifications/NotificationIcon'
import RichMessage from '../notifications/RichMessage'
import { useNotifications } from '../../hooks/useNotifications'
import { timeAgoLong } from '../../utils/formatDate'

const LIMIT = 3

export default function NotificationsPreview() {
  const { unread, past, loading, error } = useNotifications()
  const items = [...unread, ...past]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, LIMIT)

  return (
    <section aria-labelledby="forum-notifications-heading" className="font-display">
      <h2
        id="forum-notifications-heading"
        className="mb-4 flex items-center gap-2 text-base font-medium text-white/70"
      >
        <ClockIcon className="size-5" />
        Notifications
      </h2>

      <div className={`${glass} p-4 sm:p-5`}>
        {loading && <p className="py-6 text-center text-sm text-white/50">Loading…</p>}
        {!loading && error && <p className="py-6 text-center text-sm text-danger-ink">{error}</p>}
        {!loading && !error && items.length === 0 && (
          <p className="py-6 text-center text-sm text-white/50">You’re all caught up.</p>
        )}

        {items.length > 0 && (
          <ul>
            {items.map((n) => (
              <li
                key={n.id}
                className="flex gap-3 border-b border-white/10 py-3 first:pt-0"
              >
                <NotificationIcon type={n.type} />
                <div className="min-w-0 flex-1">
                  <p className="wrap-break-word text-sm leading-snug text-white">
                    <RichMessage text={n.message} />
                  </p>
                  <p className="mt-1 text-[0.6875rem] text-white/40">
                    {timeAgoLong(n.createdAt)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}

        <Link
          to={ROUTES.history}
          className="mt-4 block rounded-xl border border-white/15 bg-white/5 py-3 text-center text-xs font-semibold text-white/60 transition hover:bg-white/10 hover:text-white"
        >
          View All Notifications
        </Link>
      </div>
    </section>
  )
}