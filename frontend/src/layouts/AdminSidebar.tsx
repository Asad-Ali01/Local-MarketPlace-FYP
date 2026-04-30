import { useLocation, Link } from "react-router";
import { LayoutDashboard, Users, LogOut } from "lucide-react";
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
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import ConfirmDialog from "@/components/shared/ConfirmModal";
import { useAdminLogoutApiMutation } from "@/features/admin/adminApi";

const items = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/admin/dashboard",
  },
  {
    title: "User Management",
    icon: Users,
    url: "/admin/user-management",
  },
];

export default function AdminSidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const [adminLogoutApi] = useAdminLogoutApiMutation();
  const dispatch = useAppDisptach();
  const navigate = useNavigate();
  return (
    <Sidebar collapsible="icon" variant="sidebar">
      {/* HEADER */}
      <div className="flex items-center  justify-between p-2 border-b">
        {state == "expanded" && <h2 className="font-bold text-lg">Admin</h2>}

        {/* ✅ SHADCN TOGGLE BUTTON */}
        <SidebarTrigger />
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
                    <SidebarMenuButton asChild>
                      <Link
                        to={item.url}
                        className={isActive ? "bg-black text-white" : ""}
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
        <div className="mt-auto p-2">
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
            onConfirm={async () => {
              try {
                console.log("RUns");
                await adminLogoutApi(null).unwrap();
                dispatch(logoutUser());
                await persistor.purge();
                localStorage.removeItem("persist:auth");
                navigate("/admin/login");
              } catch (error: any) {
                console.log("Error; ", error);
                toast.error(error.data.message);
              }
            }}
          />
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
