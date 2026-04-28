import LoginForm from "@/components/shared/LoginForm";
import { useLoginUserApiMutation } from "@/features/auth/authApi";

function UserLoginForm() {
    const [loginUserApi]=useLoginUserApiMutation()
  return (
    <>
    <LoginForm loginApi={loginUserApi} mode="user"/>
    </>
  );
}

export default UserLoginForm;
