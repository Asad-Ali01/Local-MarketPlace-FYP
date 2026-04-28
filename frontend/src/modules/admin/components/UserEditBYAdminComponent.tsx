import {
  useAdminGetUserQuery,
  useAdminUpdateUserMutation,
} from "@/features/admin/adminApi";
import { useParams } from "react-router";
import { Controller, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "antd";
import { editUserSchema } from "../schemas/editUserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";

function UserEditBYAdminComponent() {
  const { userId } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    undefined,
  );

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);

  const [avatarPreview, setAvatarPreview] = useState<string>();
  const [frontPreview, setFrontPreview] = useState<string>();
  const [backPreview, setBackPreview] = useState<string>();

  const [originalData, setOriginalData] = useState<any>(null);
  const { data } = useAdminGetUserQuery(userId!, {
    skip: !userId,
  });

  const [updateUser, { isLoading: isUpdating }] = useAdminUpdateUserMutation();

  const { register, handleSubmit, reset,  formState, control } = useForm({
    resolver: zodResolver(editUserSchema),
  });

  useEffect(() => {
    if (data?.data) {
      const userData = {
        name: data.data.user.name,
        email: data.data.user.email,
        role: data.data.user.role,
        status: data.data.user.status,
      };

      reset(userData);
      setOriginalData(userData); //  store original
    }
  }, [data, reset]);
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "avatar" | "front" | "back",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewURL = URL.createObjectURL(file);

    if (type === "avatar") {
      setAvatarFile(file);
      setAvatarPreview(previewURL);
    }

    if (type == "front") {
      setFrontFile(file);
      setFrontPreview(previewURL);
    }

    if (type == "back") {
      setBackFile(file);
      setBackPreview(previewURL);
    }
  };
  const onSubmit = async (data: any) => {
    const formData = new FormData();
    const isSame =
      originalData &&
      Object.keys(originalData).every(
        (key) => originalData[key] === data[key],
      ) &&
      !avatarFile &&
      !frontFile &&
      !backFile;

    if (isSame) {
      setIsEdit(false);
      toast.error("Nothing to update");
      return;
    }
    Object.entries(data).forEach(([key, value]) => {
      if (value == undefined || value == null) return;
      formData.append(key, value as any);
    });
    if (avatarFile) formData.append("avatar", avatarFile);
    if (frontFile) formData.append("front", frontFile);
    if (backFile) formData.append("back", backFile);
    try {
      if (userId) {
        await updateUser({
          id: userId,
          data: formData,
        }).unwrap();
      }

      setIsEdit(false);
    } catch (err: any) {
      console.log(err);
      toast.error(err.data.message);
    }
  };

  const handleCancel = () => {
    setIsEdit(false);

    if (data?.data) {
      reset({
        name: data.data.user.name,
        email: data.data.user.email,
        role: data.data.user.role,
        status: data.data.user.status,
      });
    }
  };

  const user = data?.data.user;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-semibold">User Details</h2>

      {/*  IMAGE SECTION */}
      <div className="bg-white shadow rounded-xl p-6 space-y-6">
        <h3 className="text-lg font-medium">User Documents</h3>

        <div className="flex gap-10 flex-wrap">
          {/* Avatar */}
          <div className="flex flex-col w-full sm:w-auto  items-center gap-2">
            <div className="w-full flex flex-col items-center  ">
              <p className="text-sm text-gray-500">Avatar</p>

              <div className="relative group">
                <Avatar
                  size={100}
                  src={avatarPreview || user?.avatar?.url}
                  className="border cursor-pointer"
                  onClick={() =>
                    setPreviewImage(avatarPreview || user?.avatar?.url)
                  }
                />

                {/* ✏️ Edit button */}
                {isEdit && (
                  <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm cursor-pointer rounded-full">
                    Change
                    <Controller
                      name="avatar"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="file"
                          hidden
                          accept="image/png, image/jpeg, image/jpg"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            field.onChange(file);
                            handleFileChange(e, "avatar");
                          }}
                        />
                      )}
                    />
                  </label>
                )}

                {/* ❌ Remove */}
                {isEdit && avatarPreview && (
                  <button
                    className="text-xs text-red-500"
                    onClick={() => {
                      setAvatarFile(null);
                      setAvatarPreview(undefined);
                    }}
                  >
                    Remove
                  </button>
                )}
                {formState.errors.avatar && (
                  <p className="text-red-800">
                    {formState.errors.avatar.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* CNIC Front */}
          <div className="flex flex-col w-full sm:w-auto  items-center gap-2">
            <div className="w-full flex flex-col items-center ">
              <p className="text-sm text-gray-500">CNIC Front</p>

              <div className="relative group">
                <Avatar
                  shape="square"
                  size={120}
                  src={frontPreview || user?.identityCard?.front?.url}
                  className="border cursor-pointer"
                  onClick={() =>
                    setPreviewImage(
                      frontPreview || user?.identityCard?.front?.url,
                    )
                  }
                />

                {/* ✏️ Edit button */}
                {isEdit && (
                  <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm cursor-pointer">
                    Change
                    <Controller
                      name="front"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="file"
                          hidden
                          accept="image/png, image/jpeg, image/jpg"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            field.onChange(file);
                            handleFileChange(e, "front");
                          }}
                        />
                      )}
                    />
                  </label>
                )}
              </div>

              {/* ❌ Remove */}
              {isEdit && frontPreview && (
                <button
                  className="text-xs text-red-500"
                  onClick={() => {
                    setFrontFile(null);
                    setFrontPreview(undefined);
                  }}
                >
                  Remove
                </button>
              )}
              {formState.errors.front && (
                <p className="text-red-800">{formState.errors.front.message}</p>
              )}
            </div>
          </div>

          {/* CNIC Back */}
          <div className="flex flex-col w-full sm:w-auto  items-center gap-2">
            <div className="w-full flex flex-col items-center ">
              <p className="text-sm text-gray-500">CNIC Back</p>

              <div className="relative group">
                <Avatar
                  shape="square"
                  size={120}
                  src={backPreview || user?.identityCard?.back?.url}
                  className="border cursor-pointer"
                  onClick={() =>
                    setPreviewImage(
                      backPreview || user?.identityCard?.back?.url,
                    )
                  }
                />

                {/* ✏️ Edit button */}
                {isEdit && (
                  <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm cursor-pointer ">
                    Change
                    <Controller
                      name="back"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="file"
                          hidden
                          accept="image/png, image/jpeg, image/jpg"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            field.onChange(file);
                            handleFileChange(e, "back");
                          }}
                        />
                      )}
                    />
                  </label>
                )}
              </div>

              {/* ❌ Remove */}
              {isEdit && backPreview && (
                <button
                  className="text-xs text-red-500"
                  onClick={() => {
                    setBackFile(null);
                    setBackPreview(undefined);
                  }}
                >
                  Remove
                </button>
              )}
              {formState.errors.back && (
                <p className="text-red-800">{formState.errors.back.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/*  FORM */}
      <div className="bg-white shadow rounded-xl p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1  md:grid-cols-2  gap-4"
        >
          {/* Name */}
          <div className="w-full ">
            <Label>Name</Label>
            <Input
              className="w-full"
              {...register("name")}
              disabled={!isEdit}
            />
            {formState.errors.name && (
              <p className="text-red-800">{formState.errors.name.message}</p>
            )}
          </div>
          {/* Email */}
          <div className="w-full ">
            <Label>Email</Label>

            <Input
              className="w-full"
              {...register("email")}
              disabled={!isEdit}
            />
            {formState.errors.email && (
              <p className="text-red-800">{formState.errors.email.message}</p>
            )}
          </div>
          {/* Role */}
          <div className="w-full">
            <Label>Role</Label>

            <select
              {...register("role")}
              disabled={!isEdit}
              className="border rounded px-3 py-2 w-full"
            >
              <option value="client">Client</option>
              <option value="provider">Provider</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {/* Status */}
          <div>
            <Label>Status</Label>

            <select
              {...register("status")}
              disabled={!isEdit}
              className="border rounded px-3 py-2 w-full"
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* BUTTONS */}
          <div className="sm:col-span-2  flex justify-end gap-3 mt-4">
            {!isEdit ? (
              <Button
                className="w-full"
                type="button"
                onClick={() => setIsEdit(true)}
              >
                Edit
              </Button>
            ) : (
              <>
                <Button type="button" onClick={handleCancel}>
                  Cancel
                </Button>

                <Button type="submit" disabled={isUpdating}>
                  {isUpdating ? "Saving..." : "Save"}
                </Button>
              </>
            )}
          </div>
        </form>
      </div>

      {/* FULL SCREEN PREVIEW MODAL */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setPreviewImage(undefined)}
        >
          <img src={previewImage} className="rounded-lg shadow-lg" />
        </div>
      )}
    </div>
  );
}

export default UserEditBYAdminComponent;
