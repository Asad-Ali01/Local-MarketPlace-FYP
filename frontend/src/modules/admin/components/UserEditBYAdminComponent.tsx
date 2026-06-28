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
import useUserEdit from "@/hooks/useUserEdit";
import FileUploadField from "@/components/shared/FileUploadField";

function UserEditBYAdminComponent() {
  const {
    isEdit,
    setIsEdit,
    register,
    handleSubmit,
    formState,
    setAvatarFile,
    setFrontFile,
    setBackFile,
    avatarPreview,
    setAvatarPreview,
    frontPreview,
    setFrontPreview,
    backPreview,
    setBackPreview,
    previewImage,
    setPreviewImage,
    isUpdating,
    handleFileChange,
    onSubmit,
    handleCancel,
    user,
  } = useUserEdit();

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-semibold">User Details</h2>

      {/*  IMAGE SECTION */}
      <div className="flex gap-10">
        <FileUploadField
          label="Avatar"
          preview={avatarPreview}
          url={user?.avatar?.url}
          setPreview={setAvatarPreview}
          setFile={setAvatarFile}
          error={formState.errors.avatar}
          type="avatar"
          shape="circle"
          size={100}
          isEdit={isEdit}
          onFileChange={handleFileChange}
          setPreviewImage={setPreviewImage}
        />

        <FileUploadField
          label="CNIC Front"
          preview={frontPreview}
          url={user?.identityCard?.front?.url}
          setPreview={setFrontPreview}
          setFile={setFrontFile}
          error={formState.errors.front}
          type="front"
          isEdit={isEdit}
            size={120}
          onFileChange={handleFileChange}
          setPreviewImage={setPreviewImage}
        />
        <FileUploadField
          label="CNIC Back"
          preview={backPreview}
          url={user?.identityCard?.back?.url}
          setPreview={setBackPreview}
          setFile={setBackFile}
          error={formState.errors.back}
          type="back"
          isEdit={isEdit}
            size={120}
          onFileChange={handleFileChange}
          setPreviewImage={setPreviewImage}
        />
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
