import { Outlet } from 'react-router-dom';
import useAuth from '../../context/useAuth';
import Sidebar, { MobileNav } from '../../components/dashboard/Sidebar';

// Shared shell for every /student/* page: gradient background + sidebar + <Outlet />.
export default function StudentLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#25336a] via-[#2d3f8c] to-[#4560c8] p-4 font-sans text-white lg:flex lg:gap-8 lg:p-6">
      <Sidebar user={user} onLogout={logout} />
      <div className="min-w-0 flex-1">
        <MobileNav />
        <main className="mt-6 lg:mt-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
