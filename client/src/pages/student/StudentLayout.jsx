import { Outlet } from 'react-router-dom'
import useAuth from '../../context/useAuth'
import ForumProvider from '../../context/ForumProvider'
import Sidebar, { MobileNav } from '../../components/dashboard/Sidebar'

export default function StudentLayout() {
  const { user, logout } = useAuth()

  return (
    <ForumProvider>
      <div className="min-h-dvh bg-linear-to-br/srgb from-navy-900 to-navy-500 p-4 font-sans text-white sm:p-6 lg:flex lg:gap-6">
        <Sidebar user={user} onLogout={logout} />
        <div className="min-w-0 flex-1">
          <MobileNav />
          <main className="mt-6 lg:mt-0">
            <Outlet />
          </main>
        </div>
      </div>
    </ForumProvider>
  )
}