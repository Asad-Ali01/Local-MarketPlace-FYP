import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type loginSchemaType, loginSchema } from "@/schemas/global.schema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import type { ILoginUserResponse } from "@/types/auth.types";
import { Link, useLocation, useNavigate } from "react-router";
import { useAppDispatch } from "@/hooks/useAppDispatchSelector";
import { loginUser } from "@/features/auth/authSlice";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
type LoginMode = "user" | "admin";
type LoginFormProps = {
  loginApi: (data: loginSchemaType) => {
    unwrap: () => Promise<ILoginUserResponse>;
  };
  mode: LoginMode;
};

function LoginForm({ loginApi, mode }: LoginFormProps) {
  const dispatch = useAppDispatch();
  const form = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
     const from = location?.state?.from;
      console.log("From: ",from);
  const handleLogin = async (data: loginSchemaType) => {
    try {
      const res = await loginApi(data).unwrap();
      dispatch(
        loginUser({
          user: res.data.user,
          accessToken: res.data.accessToken,
        }),
      );
      const role = res.data.user.role;
      console.log("Role is: ", role);
   
      if (from) {
        navigate(from);
      } else if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "provider") {
        navigate("/provider/dashboard");
      } else if (role === "client") {
        navigate("/client");
      }

      toast.success(res.message);
      form.reset();
    } catch (error: any) {
      toast.error(error?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]  px-4">
      <Card className="w-full max-w-md shadow-lg py-10">
        {/* Header */}
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Welcome Back 👋
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                {...form.register("email")}
              />
              <Error msg={form.formState.errors.email?.message} />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative ">
                <Input
                  id="password"
                  type={visible ? "text" : "password"}
                  placeholder="Enter your password"
                  {...form.register("password")}
                />
                <button
                  type="button"
                  onClick={() => setVisible(!visible)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {visible ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              <Error msg={form.formState.errors.password?.message} />
            </div>

            {/* Extra options */}
            {mode != "admin" && (
              <div className="flex justify-between items-center text-sm">
                <Link
                  to="/forgot-password"
                  className="text-purple-700 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            )}

            {/* Button */}
            <Button
              disabled={form.formState.isSubmitting}
              className="w-full bg-purple-700 hover:bg-purple-800"
            >
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
