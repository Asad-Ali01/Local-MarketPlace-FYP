import { useLocation, Link } from 'react-router';
import { ChevronsUpDown, LogOut, type LucideIcon } from 'lucide-react';
import { useAppDispatch } from '@/hooks/useAppDispatchSelector';
import { useAppSelector } from '@/hooks/useAppDispatchSelector';
import { logoutUser } from '@/features/auth/authSlice';
import { persistor } from '@/app/store';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
  SidebarFooter,
} from '@/components/ui/sidebar';
import type { useLogoutApiMutation } from '@/features/auth/authApi';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Modal } from 'antd';
import DropdownButton from 'antd/es/dropdown/dropdown-button';
import { useState } from 'react';
import ChangePasswordDialog from './ResetPassword';

type SideBarItem = {
  title: string;
  icon: LucideIcon;
  url: string;
};
type LogoutApiType = ReturnType<typeof useLogoutApiMutation>[0];
type RoleSidebarProps = {
  role: 'Admin' | 'Provider' | 'Client';
  items: SideBarItem[];
  onLogout: LogoutApiType;
};
export default function GlobalSidebar({ role, items, onLogout }: RoleSidebarProps) {
  const location = useLocation();
  const { state, isMobile } = useSidebar();
  const user = useAppSelector((currentState) => currentState.auth.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const username = user?.name
    ?.split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = async () => {
    try {
      await onLogout().unwrap();
      dispatch(logoutUser());
      await persistor.purge();
      localStorage.removeItem('persist:auth');
      if (role == 'Admin') {
        navigate('/admin/login');
      } else {
        navigate('/login');
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };
  const showLogoutConfirm = () => {
    Modal.confirm({
      title: 'Are you sure?',
      content: 'You will be logged out of your account.',
      okText: 'Yes, Logout',
      cancelText: 'Cancel',
      okType: 'danger',
      centered: true,
      onOk: handleLogout,
    });
  };
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      {/* HEADER */}
      <div className="flex items-center  justify-between p-2 border-b">
        {state == 'expanded' && (
          <h2 className="font-bold text-2xl  bg-linear-to-r from-blue-800 via-purple-900 to-blue-800 bg-clip-text text-transparent">
            Welcome {user?.name}
          </h2>
        )}
      </div>

      {/* CONTENT */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = location.pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton className="" asChild>
                      <Link
                        to={item.url}
                        className={
                          isActive ? 'bg-black text-white hover:bg-black! hover:text-white!' : ''
                        }
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {/* Change password dialog  */}
      <ChangePasswordDialog open={openPasswordDialog} onOpenChange={setOpenPasswordDialog} />
      {/* Footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent focus-visible:ring-0 data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user?.avatar?.url} alt={user?.name} />
                    <AvatarFallback className="rounded-lg">
                      {username?.toUpperCase()?.[0] || 'U'}
                    </AvatarFallback>
                  </Avatar>

                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user?.name || 'User'}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user?.email || 'user@example.com'}
                    </span>
                  </div>

                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent side={isMobile ? 'top' : 'right'} align="end" className="w-56">
                <SidebarMenuButton onClick={() => setOpenPasswordDialog(true)}>
                  Change Password
                </SidebarMenuButton>

                <SidebarMenuButton
                  className="text-red-500 focus:text-red-500"
                  onClick={showLogoutConfirm}
                >
                  <LogOut className="mr-2 size-4" />
                  Logout
                </SidebarMenuButton>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
