import { useState } from 'react'
import ModalShell from '../ui/ModalShell'
import { CommentPlusIcon } from '../dashboard/icons'
import { initials } from '../../utils/avatarColors'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const fieldCls =
  'mt-1 h-11 w-full rounded-lg border bg-field px-3 text-sm text-white/80 outline-none placeholder:text-field-ink focus:border-gold/60 focus:ring-2 focus:ring-gold/20 sm:h-12 sm:px-4'

export default function ProfileModal({ user, onClose, onSave }) {
  const [name, setName] = useState(user?.name ?? user?.full_name ?? '')
  const [email, setEmail] = useState(user?.email ?? '')

  const trimmedName = name.trim()
  const trimmedEmail = email.trim()
  const nameError = trimmedName ? '' : 'Name is required.'
  const emailError = EMAIL_PATTERN.test(trimmedEmail) ? '' : 'Enter a valid email address.'
  const [showErrors, setShowErrors] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (nameError || emailError) {
      setShowErrors(true)
      return
    }
    onSave({ name: trimmedName, email: trimmedEmail })
  }

  return (
    <ModalShell title="Profile Settings" icon={CommentPlusIcon} onClose={onClose}>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mt-5 grid items-center gap-5 px-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] sm:gap-6">
          <div className="flex justify-center">
            <span
              aria-hidden="true"
              className="grid size-28 place-items-center rounded-full bg-gold-edge font-sans text-5xl font-bold text-navy-700 sm:size-32"
            >
              {initials(trimmedName || user?.name)}
            </span>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium">
              name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
                autoComplete="name"
                placeholder="Your name"
                aria-invalid={showErrors && !!nameError}
                className={`${fieldCls} ${showErrors && nameError ? 'border-danger' : 'border-field-line'}`}
              />
              {showErrors && nameError && (
                <span role="alert" className="mt-1 block text-xs font-normal text-danger-ink">
                  {nameError}
                </span>
              )}
            </label>

            <label className="block text-sm font-medium">
              email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={150}
                autoComplete="email"
                placeholder="you@example.com"
                aria-invalid={showErrors && !!emailError}
                className={`${fieldCls} ${showErrors && emailError ? 'border-danger' : 'border-field-line'}`}
              />
              {showErrors && emailError && (
                <span role="alert" className="mt-1 block text-xs font-normal text-danger-ink">
                  {emailError}
                </span>
              )}
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="mt-5 h-12 w-full rounded-xl bg-linear-to-br/srgb from-gold to-gold-soft text-base font-medium text-ink transition hover:brightness-105"
        >
          Update
        </button>
      </form>
    </ModalShell>
  )
}