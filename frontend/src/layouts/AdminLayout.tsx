import { Outlet, useNavigate } from 'react-router';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { useAppSelector } from '@/hooks/useAppDispatchSelector';
import { useEffect } from 'react';
import { LayoutDashboard, Package, Users } from 'lucide-react';
import { useLogoutApiMutation } from '@/features/auth/authApi';
import GlobalSidebar from '@/components/shared/GlobalSidebar';

function AdminLayout() {
  const isAdmin = useAppSelector((state) => state.auth.user?.role === 'admin');
  const navigate = useNavigate();
  const [adminLogoutApi] = useLogoutApiMutation();
  const items = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      url: '/admin/dashboard',
    },
    {
      title: 'User Management',
      icon: Users,
      url: '/admin/user-management',
    },
    {
      title: 'Categories',
      icon: Package,
      url: '/admin/categories',
    },
  ];
  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin]);
  return isAdmin ? (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <GlobalSidebar role="Admin" items={items} onLogout={adminLogoutApi} />

        <div className="flex-1 min-w-0">
          <header className="h-14 border-b flex items-center px-4">
            <SidebarTrigger />
          </header>

          <main className="p-4  ">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  ) : (
    <main className="p-4  ">
      <Outlet />
    </main>
  );
}

export default AdminLayout;
