import { useCallback, useState } from 'react'
import useAuth from '../../context/useAuth'
import ProfileModal from './ProfileModal'

export default function ProfileTrigger({ className, children }) {
  const { user, updateUser } = useAuth()
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])

  const save = (patch) => {
    updateUser(patch)
    setOpen(false)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open profile settings"
        className={className}
      >
        {children}
      </button>
      {open && <ProfileModal user={user} onClose={close} onSave={save} />}
    </>
  )
}