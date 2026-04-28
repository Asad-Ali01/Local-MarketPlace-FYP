import LoginForm from "@/components/shared/LoginForm";
import { useAdminLoginApiMutation } from "@/features/admin/adminApi";

function AdminLoginForm() {
    const [adminLoginApi]= useAdminLoginApiMutation()
  return (
    <>
    <LoginForm loginApi={adminLoginApi} mode="admin"/>
    </>
  );
}

export default AdminLoginForm;
