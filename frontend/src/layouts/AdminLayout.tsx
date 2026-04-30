import { Outlet, useNavigate } from "react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "./AdminSidebar";
import { useAppSelector } from "@/hooks/useAppDispatchSelector";
import { useEffect } from "react";

function AdminLayout() {
  const isAdmin  = useAppSelector(state => state.auth.user?.role === "admin");
  const navigate = useNavigate();
  
  useEffect(() => {
    if(!isAdmin){
    navigate('/admin/login')
  }

  },[isAdmin])
  return (
    <SidebarProvider>
              <SidebarTrigger />
      
      <div className="flex min-h-screen w-full ">
        <AdminSidebar />

        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}

export default AdminLayout;