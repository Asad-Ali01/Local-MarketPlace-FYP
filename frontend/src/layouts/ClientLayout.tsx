import GlobalSidebar from '@/components/shared/GlobalSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { useLogoutApiMutation } from '@/features/auth/authApi';
import { useGetMyGigsApiQuery } from '@/features/gig/gigApi';
import { useAppSelector } from '@/hooks/useAppDispatchSelector';
import ProviderLandingPage from '@/pages/gig/ProviderLandingPage';
import { BriefcaseBusinessIcon, LayoutDashboard, MessageCircleMoreIcon, ShoppingBag } from 'lucide-react';

import { Navigate, Outlet, useLocation } from 'react-router';

function ClientLayout() {
  const [clientLogoutApi] = useLogoutApiMutation();
  const location = useLocation();
  const items = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      url: '/client/dashboard',
    },
    {
      title: 'Create job',
      icon: BriefcaseBusinessIcon,
      url: '/client/jobs/create',
    },
       {
      title: 'My Jobs',
      icon: BriefcaseBusinessIcon,
      url: '/client/jobs',
    },
     {
      title: 'Chat',
      icon: MessageCircleMoreIcon,
      url: '/client/messages',
    },
    {
      title: 'Gigs Listing',
      icon: ShoppingBag,
      url: '/client/categories',
    },
 
  ];

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isClient = useAppSelector((state) => state.auth.user?.role) == 'client';
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login/reminder"
        state={{
          from: location,
        }}
        replace
      />
    );
  }

  if (isClient) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <GlobalSidebar role="Client" items={items} onLogout={clientLogoutApi} />

          <section className="flex-1 min-w-0">
            <header className="h-14 border-b flex items-center px-4">
              <SidebarTrigger />
            </header>
            <main className="p-4">
              <Outlet />
            </main>
          </section>
        </div>
      </SidebarProvider>
    );
  }
}
export default ClientLayout;
