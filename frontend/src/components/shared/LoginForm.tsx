import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {type loginSchemaType,loginSchema } from "@/schemas/login.schema";
import { Label } from "@/components/ui/label";
import { Input } from "antd";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import type { ILoginUserResponse } from "@/features/auth/types";

type LoginFormProps = {
  loginApi: (data: loginSchemaType) => {
    unwrap: () => Promise<ILoginUserResponse>
  }
}
function LoginForm({loginApi}:LoginFormProps) {
  const form = useForm<loginSchemaType>({
    resolver:zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleLogin = async (data:loginSchemaType) => {
    console.log(data);
 try {
     const res =  await loginApi(data).unwrap();
     toast.success(res.message)
 } catch (error:any) {
    toast.error(error.data.message)
 }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleLogin)}>
          {/* Email */}
          <div>
            <Controller
            name="email"
            control={form.control}
              render={({ field }) => (
                <>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" {...field} />
                  {form.formState.errors.email && (
                    <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                  )}
                </>
              )}
            />
          </div>
          {/* Password */}
          <div>
            <Controller
            name="password"
        control={form.control}
        render={({field}) => (
            <>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
             {...field}
            />
               {form.formState.errors.password && (
                    <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
                  )}
            </>
        )}
            />
            
         
          </div>
          <Button type="submit">Login</Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default LoginForm;
