import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type loginSchemaType, loginSchema } from "@/schemas/global.schema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"; // ✅ use same UI system
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import type { ILoginUserResponse } from "@/features/auth/types";
import { Link, useNavigate } from "react-router";
import { useAppDisptach } from "@/hooks/useAppDispatchSelector";
import { loginUser } from "@/features/auth/authSlice";
type LoginMode = "client" | "provider" | "admin";
type LoginFormProps = {
  loginApi: (data: loginSchemaType) => {
    unwrap: () => Promise<ILoginUserResponse>;
  };
  mode: LoginMode;
};

function LoginForm({ loginApi, mode }: LoginFormProps) {
  const dispatch = useAppDisptach();
  const form = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const handleLogin = async (data: loginSchemaType) => {
    try {
      const res = await loginApi(data).unwrap();
      dispatch(
        loginUser({
          user: res.data.user,
          accessToken: res.data.accessToken,
        }),
      );
      console.log("Mode is: ",res.data.user.role);
      if (mode == "admin") {
        navigate("/admin/dashboard");
      }else if(res.data.user.role == "provider"){
        navigate("/provider")
      }
    
      toast.success(res.message);
      form.reset();
    } catch (error: any) {
      toast.error(error?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <Card className="w-full max-w-md shadow-lg">
        {/* Header */}
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Welcome Back 👋
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-5">
            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
              id="email"
                placeholder="Enter your email"
                {...form.register("email")}
              />
              <Error msg={form.formState.errors.email?.message} />
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
              id="password"
                type="password"
                placeholder="Enter your password"
                {...form.register("password")}
              />
              <Error msg={form.formState.errors.password?.message} />
            </div>

            {/* Extra options */}
            <div className="flex justify-between items-center text-sm">
              <Link
                to="/forgot-password"
                className="text-purple-700 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Button */}
            <Button disabled={form.formState.isSubmitting} className="w-full bg-purple-700 hover:bg-purple-800">
              {form.formState.isSubmitting ? "Logging in" : "Login"}
            </Button>
     
            {/* Register redirect */}
            {mode !== "admin" && (
              <p className="text-sm text-center text-gray-500">
                Don’t have an account?
                <Link
                  to="/register"
                  className="text-purple-700 font-medium hover:underline"
                >
                  Sign up
                </Link>
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

/* Reusable Error Component */
function Error({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="text-sm text-red-500 mt-1">{msg}</p>;
}

export default LoginForm;
