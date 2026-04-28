import { useAppSelector } from "@/hooks/useAppDispatchSelector"
import { Navigate } from "react-router"

function AdminLayout() {
    const role = useAppSelector(state => state.auth.user?.role)
    if(role !== "admin"){
        return <Navigate to="/unauthorized" />
    }
  return (
    <div>AdminLayout</div>
  )
}

export default AdminLayout