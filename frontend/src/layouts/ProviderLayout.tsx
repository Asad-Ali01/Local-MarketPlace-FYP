import GlobalSidebar from '@/components/shared/GlobalSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { useLogoutApiMutation } from '@/features/auth/authApi';
import { useGetMyGigsApiQuery } from '@/features/gig/gigApi';
import { useAppSelector } from '@/hooks/useAppDispatchSelector';
import ProviderLandingPage from '@/pages/gig/ProviderLandingPage';
import { LayoutDashboard, MessageCircleMoreIcon, ShoppingBag } from 'lucide-react';

import { Navigate, Outlet, useLocation } from 'react-router';

function ProviderLayout() {
  const { data, isLoading, isFetching } = useGetMyGigsApiQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });
  const [providerLogoutApi] = useLogoutApiMutation();
  const location = useLocation();
  const items = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      url: '/provider/dashboard',
    },
    {
      title: 'Gigs',
      icon: ShoppingBag,
      url: '/provider/gigs',
    },
    {
      title: 'Chat',
      icon: MessageCircleMoreIcon,
      url: '/provider/messages',
    },
  ];
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  console.log(location.pathname);
  console.log('Has gigs', data?.data.hasGigs);
  const hasGigs = data?.data.hasGigs;
  if (isLoading && !data && isFetching) {
    return null; // later replace with skeleton/spinner
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (hasGigs) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <GlobalSidebar role="Provider" items={items} onLogout={providerLogoutApi} />

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
  if (!hasGigs && location.pathname == '/provider/create-gig') {
    return <Outlet />;
  }

  return <ProviderLandingPage />;
}
export default ProviderLayout;
