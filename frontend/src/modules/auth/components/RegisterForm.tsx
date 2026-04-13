import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import {
  registerSchema,
  type RegisterSchemaInputType,
  type RegisterSchemaType,
} from "../schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRegisterUserApiMutation } from "@/features/auth/authApi";
import toast from "react-hot-toast";
// import {Form} from '../../../components/ui/for'
function RegisterForm() {
  const form = useForm<RegisterSchemaInputType, any, RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      avatar: undefined,
      front: undefined,
      back: undefined,
      location: {
        lng: 0,
        lat: 0,
      },
      role: "client",
    },
  });
  const [registerUserApi] = useRegisterUserApiMutation();
  // Handle register form
  const handleRegister = async (data: RegisterSchemaType) => {
    console.log(data);
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("role", data.role);
    formData.append("location", JSON.stringify(data.location));
    formData.append("avatar", data.avatar);
    formData.append("front", data.front);
    formData.append("back", data.back);

    try {
      const res = await registerUserApi(formData).unwrap();
      toast.success(res.message);
      form.reset()
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleRegister)}>
          {/* Avatar */}
          <div>
            <Label htmlFor="avatar">Avatar</Label>
            <Input
              id="avatar"
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  form.setValue("avatar", file, { shouldValidate: true });
                }
              }}
            />
            {form.formState.errors.avatar && (
              <p className="text-sm text-red-500">
                {form.formState.errors.avatar.message}
              </p>
            )}
          </div>
          {/* Identity card */}
          <h1>Identity Card</h1>
          <div>
            {/* Front */}
            <div>
              <Label htmlFor="front">Front</Label>
              <Input
                id="front"
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    form.setValue("front", file, {
                      shouldValidate: true,
                    });
                  }
                }}
              />
              {form.formState.errors.front && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.front.message}
                </p>
              )}
            </div>
            {/* Back */}
            <div>
              <Label htmlFor="back">Back</Label>
              <Input
                id="back"
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    form.setValue("back", file, {
                      shouldValidate: true,
                    });
                  }
                }}
              />
              {form.formState.errors.back && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.back.message}
                </p>
              )}
            </div>
          </div>
          {/* <Controller
          control={form.control}
          name='name'
          render={({field}) => ( */}
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter name"
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>
          {/* )}
          > */}
          {/* </Controller> */}

          {/* Email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" {...form.register("email")} />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          {/* Password */}
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <p className="text-sm text-red-500">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>
          {/* Confirm Password */}
          <div>
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              type="password"
              id="confirmPassword"
              {...form.register("confirmPassword")}
            />
            {form.formState.errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {form.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>
          {/* Location */}
          <div>
            <h1 className="text-center text-xl">Location</h1>
            <div className="flex">
              {/* Longitude */}
              <div>
                <Label htmlFor="lng">Longitude</Label>
                <Input
                  type="number"
                  id="lng"
                  {...form.register("location.lng")}
                />
                {form.formState.errors.location?.lng && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.location.lng.message}
                  </p>
                )}
              </div>
              {/* Latitude */}
              <div>
                <Label htmlFor="lat">Latitude</Label>
                <Input
                  type="number"
                  id="lat"
                  {...form.register("location.lat")}
                />
                {form.formState.errors.location?.lat && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.location.lat.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* role */}
          <div>
            <Controller
              name="role"
              control={form.control}
              render={({ field }) => (
                <>
                  <Label htmlFor="role">Role</Label>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Role</SelectLabel>
                        <SelectItem value="client">client</SelectItem>
                        <SelectItem value="provider">provider</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.role && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.role.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
          <Button >Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default RegisterForm;
