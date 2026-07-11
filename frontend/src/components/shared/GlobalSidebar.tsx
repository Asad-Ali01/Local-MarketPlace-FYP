import { useLocation, Link } from "react-router";
import { LayoutDashboard, Users, LogOut ,Package, type LucideIcon } from "lucide-react";
import { useAppDisptach } from "@/hooks/useAppDispatchSelector";
import { logoutUser } from "@/features/auth/authSlice";
import { persistor } from "@/app/store";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
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
} from "@/components/ui/sidebar";
import ConfirmDialog from "@/components/shared/ConfirmModal";
import type { useLogoutApiMutation } from "@/features/auth/authApi";


type SideBarItem = {
  title:string;
  icon:LucideIcon;
  url:string;
}
type LogoutApiType = ReturnType<typeof useLogoutApiMutation>[0] 
type RoleSidebarProps = {
  role:"Admin" | "Provider" | "Client"
  items:SideBarItem[];
  onLogout: LogoutApiType
}
export default function GlobalSidebar({role,items,onLogout}:RoleSidebarProps ) {
  const location = useLocation();
  const { state } = useSidebar();
  // const [adminLogoutApi] = useAdminLogoutApiMutation();
  const dispatch = useAppDisptach();
  const navigate = useNavigate();

  const handleLogout = async () => {
  try {
    await onLogout().unwrap();
    dispatch(logoutUser());
    await persistor.purge();
    localStorage.removeItem("persist:auth");
    if(role == "Admin"){

      navigate("/admin/login");
    }else {

      navigate("/login");
    }
  } catch (error: any) {
  
    toast.error(error.data.message);
  }
};
  return (
    <Sidebar collapsible="icon" variant="sidebar" >
      {/* HEADER */}
      <div className="flex items-center  justify-between p-2 border-b">
        {state == "expanded" && <h2 className="font-bold text-lg">{role}</h2>}

     
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
                    <SidebarMenuButton className=""  asChild>
                      <Link
                        to={item.url}
                        className={ isActive ? "bg-black text-white hover:bg-black! hover:text-white!" : "" }
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

        {/* LOGOUT */}
        <section className="mt-auto p-2">
          <ConfirmDialog
            trigger={
              <button className="flex items-center gap-2 text-red-500 w-full">
                <LogOut className="w-4 h-4" />
                {state === "expanded" && <span>Logout</span>}
              </button>
            }
            title="Logout?"
            description="You will be logged out of your account."
            confirmText="Logout"
            variant="destructive"
            onConfirm={handleLogout}
          />
        </section>
      </SidebarContent>
    </Sidebar>
  );
}
