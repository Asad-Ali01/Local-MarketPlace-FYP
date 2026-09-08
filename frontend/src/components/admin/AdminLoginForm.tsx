import LoginForm from '@/components/shared/LoginForm';
import { useAdminLoginApiMutation } from '@/features/admin/adminApi';

function AdminLoginForm() {
  const [adminLoginApi] = useAdminLoginApiMutation();
  return (
    <div className="grid  h-screen">
      <LoginForm loginApi={adminLoginApi} mode="admin" />
    </div>
  );
}

export default AdminLoginForm;
