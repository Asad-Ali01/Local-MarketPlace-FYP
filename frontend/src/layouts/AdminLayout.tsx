import { Outlet, useNavigate } from "react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "../components/shared/AdminSidebar";
import { useAppSelector } from "@/hooks/useAppDispatchSelector";
import { useEffect } from "react";

function AdminLayout() {
  const isAdmin = useAppSelector((state) => state.auth.user?.role === "admin");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/admin/login");
    }
  }, [isAdmin]);
  return (
   <SidebarProvider>
  <div className="flex min-h-screen w-full">
    

    <AdminSidebar />

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
  );
}

export default AdminLayout;
