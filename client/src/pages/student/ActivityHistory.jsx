import { useNotifications } from '../../hooks/useNotifications'
import NotificationSection from '../../components/notifications/NotificationSection'
import NotificationRow from '../../components/notifications/NotificationRow'
import { BellIcon, ClockIcon, CloseIcon } from '../../components/dashboard/icons'

function EmptyState({ children }) {
  return <p className="py-4 text-center text-sm text-white/50">{children}</p>
}

function Alert({ children }) {
  return (
    <p
      role="alert"
      className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
    >
      {children}
    </p>
  )
}

export default function ActivityHistory() {
  const { unread, past, loading, error, actionError, markRead, markAllRead } = useNotifications()

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Notifications</h1>
        <button
          type="button"
          onClick={markAllRead}
          disabled={unread.length === 0}
          className="flex items-center gap-2 rounded-xl border border-danger bg-danger/20 px-5 py-2.5 text-sm font-bold text-danger-ink transition enabled:hover:bg-danger/30 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CloseIcon className="size-4 text-danger" strokeWidth={2.4} />
          Mark all as seen
        </button>
      </header>

      {error && <Alert>{error}</Alert>}
      {actionError && <Alert>{actionError}</Alert>}

      {loading ? (
        <div className="space-y-6">
          <div className="h-48 animate-pulse rounded-2xl bg-panel" />
          <div className="h-32 animate-pulse rounded-2xl bg-panel" />
        </div>
      ) : (
        <>
          <NotificationSection id="unread-heading" icon={BellIcon} title="Unread Notifications">
            {unread.length === 0 ? (
              <EmptyState>You&apos;re all caught up.</EmptyState>
            ) : (
              <ul className="space-y-8">
                {unread.map((n) => (
                  <NotificationRow key={n.id} notification={n} onDismiss={markRead} />
                ))}
              </ul>
            )}
          </NotificationSection>

          <NotificationSection id="past-heading" icon={ClockIcon} title="Past notifications">
            {past.length === 0 ? (
              <EmptyState>No past notifications yet.</EmptyState>
            ) : (
              <ul className="space-y-7">
                {past.map((n) => (
                  <NotificationRow key={n.id} notification={n} />
                ))}
              </ul>
            )}
          </NotificationSection>
        </>
      )}
    </div>
  )
}