import NotificationIcon from './NotificationIcon'
import RichMessage from './RichMessage'
import { CloseIcon } from '../dashboard/icons'
import { timeAgoLong } from '../../utils/formatDate'

export default function NotificationRow({ notification, onDismiss }) {
  return (
    <li className="flex items-center gap-3 sm:gap-4">
      <NotificationIcon type={notification.type} />

      <div className="min-w-0 flex-1">
        <p className="wrap-break-word text-sm leading-snug text-white">
          <RichMessage text={notification.message} />
        </p>
        <p className="mt-1 text-[0.6875rem] text-white/40">{timeAgoLong(notification.createdAt)}</p>
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={() => onDismiss(notification.id)}
          aria-label="Mark as read"
          title="Mark as read"
          className="grid size-10 shrink-0 place-items-center rounded-xl border border-danger bg-danger/20 text-danger transition hover:bg-danger/30"
        >
          <CloseIcon className="size-4" strokeWidth={2.4} />
        </button>
      )}
    </li>
  )
}