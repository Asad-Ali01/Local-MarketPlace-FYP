import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import {
  registerSchema,
  type RegisterSchemaInputType,
  type RegisterSchemaType,
} from "../schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useRegisterUserApiMutation } from "@/features/auth/authApi";
import toast from "react-hot-toast";
import ImageDropzone from "@/components/shared/ImageDropZone";

function RegisterForm() {
  const form = useForm<RegisterSchemaInputType, any, RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      avatar: undefined,
      role: "provider",
    },
  });
  const [registerUserApi] = useRegisterUserApiMutation();
  const role = form.watch("role");
  const handleRegister = async (data: RegisterSchemaType) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      if (key === "location") {
        formData.append("location", JSON.stringify(value));
      } else {
        formData.append(key, value as any);
      }
    });

    try {
      const res = await registerUserApi(formData).unwrap();
      toast.success(res.message);
      form.reset();
    } catch (error: any) {
      toast.error(error?.data?.message || "Registration failed");
    }
  };
  // console.log("Here is location",form.watch("location"),form.formState.errors.location.lng);
  return (
    <div className="flex justify-center items-center py-10 px-4">
      <Card className="w-full max-w-2xl shadow-lg">
        {/* Header */}
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Create Your Account
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={form.handleSubmit(handleRegister)}
            className="space-y-6"
          >
            {/* ROLE SELECTION (FIRST STEP UX) */}
            <div>
              <Label className="mb-2 block">Register As</Label>

              <div className="flex gap-3">
                {/* CLIENT BUTTON */}
                <button
                  type="button"
                  onClick={() => {
                    form.reset();
                    form.setValue("role", "client");
                  }}
                  className={`flex-1 border rounded-lg p-3 text-sm font-medium transition ${
                    form.watch("role") === "client"
                      ? "bg-purple-700 text-white border-purple-700"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  👤 Client
                  <p className="text-xs opacity-80">Hire Services</p>
                </button>

                {/* PROVIDER BUTTON */}
                <button
                  type="button"
                  onClick={() => {
                    form.reset();
                    form.setValue("role", "provider");
                  }}
                  className={`flex-1 border rounded-lg p-3 text-sm font-medium transition ${
                    form.watch("role") === "provider"
                      ? "bg-purple-700 text-white border-purple-700"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  🛠 Provider
                  <p className="text-xs opacity-80">Offer Services</p>
                </button>
              </div>
            </div>

            {/* AVATAR */}
            <div>
              <div className="flex gap-1 ">
                <Label>Profile Picture</Label>
                {role === "provider" && <span className="text-red-500">*</span>}
                {role === "client" && (
                  <span className="text-sm">(Optional)</span>
                )}
              </div>
             
              <Controller
                name="avatar"
                control={form.control}
                render={({ field }) => (
                  <ImageDropzone
                    label="avatar"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />

              <Error msg={form.formState.errors.avatar?.message} />
            </div>

            {/* IDENTITY (ONLY FOR PROVIDER) */}
            {role === "provider" && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Identity Verification
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex gap-1">
                      <Label>Front CNIC</Label>
                      <span className="text-red-500">*</span>
                    </div>
                    <Controller
                      name="front"
                      control={form.control}
                      render={({ field }) => (
                        <ImageDropzone
                          label="IdentityCard front Side"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />

                    <Error
                      msg={(form.formState.errors as any).front?.message}
                    />
                  </div>

                  <div>
                    <div className="flex gap-1">
                      <Label>Back CNIC</Label>
                      <span className="text-red-500">*</span>
                    </div>
                    <Controller
                      name="back"
                      control={form.control}
                      render={({ field }) => (
                        <ImageDropzone
                          label="IdentityCard back Side"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />

                    <Error msg={(form.formState.errors as any).back?.message} />
                  </div>
                </div>
              </div>
            )}

            {/* BASIC INFO */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex gap-1">
                  <Label>Name</Label>
                  <span className="text-red-500">*</span>
                </div>
                <Input {...form.register("name")} />
                <Error msg={form.formState.errors.name?.message} />
              </div>

              <div>
                <div className="flex gap-1">
                  <Label>Email</Label>
                  <span className="text-red-500">*</span>
                </div>
                <Input {...form.register("email")} />
                <Error msg={form.formState.errors.email?.message} />
              </div>

              <div>
                <div className="flex gap-1">
                  <Label>Password</Label>
                  <span className="text-red-500">*</span>
                </div>
                <Input type="password" {...form.register("password")} />
                <Error msg={form.formState.errors.password?.message} />
              </div>

              <div>
                <div className="flex gap-1">
                  <Label>Confirm Password</Label>
                  <span className="text-red-500">*</span>
                </div>
                <Input type="password" {...form.register("confirmPassword")} />
                <Error msg={form.formState.errors.confirmPassword?.message} />
              </div>
            </div>

            {/* LOCATION (ONLY FOR PROVIDER) */}
            {role === "provider" && (
              <div>
                <h3 className="font-semibold mb-2">
                  Location <span className="text-red-500">*</span>
                </h3>

                <Button
                  type="button"
                  className="mb-3"
                  onClick={() => {
                    navigator.geolocation.getCurrentPosition(
                      (pos) => {
                        form.setValue(
                          "location",
                          {
                            lng: pos.coords.longitude,
                            lat: pos.coords.latitude,
                          },
                          {
                            shouldValidate: true,
                          },
                        );
                        form.clearErrors("location");
                        toast.success("Location detected");
                      },
                      () => {
                        toast.error("Unable to access location");
                      },
                    );
                  }}
                >
                  📍 Use My Location
                </Button>
                <Error msg={(form.formState.errors as any).location?.message} />
              </div>
            )}

            {/* SUBMIT */}
            <Button className="w-full bg-purple-700 hover:bg-purple-800">
              Create Account
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
function Error({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="text-sm text-red-500 mt-1">{msg}</p>;
}
export default RegisterForm;
