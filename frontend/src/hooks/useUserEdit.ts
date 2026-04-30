import { useState, useEffect } from "react";
import {
  useAdminGetUserQuery,
  useAdminUpdateUserMutation,
} from "@/features/admin/adminApi";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { editUserSchema } from "@/modules/admin/schemas/editUserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
function useUserEdit() {
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

  // This is useful for complex forms handling
  const { register, handleSubmit, reset, formState, control } = useForm({
    resolver: zodResolver(editUserSchema),
  });

  const [originalData, setOriginalData] = useState<any>(null);
  // Api request for getting data for user
  const { data } = useAdminGetUserQuery(userId!, {
    skip: !userId,
  });
  // Api for sending update request to backend
  const [updateUser, { isLoading: isUpdating }] = useAdminUpdateUserMutation();

  //   UseEffect for store oiginalData in state for later comparison to for Submit data and also reset so that when we click on edit it show user data already coming from api instead of blank.
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
  }, [data]);
  // Function to handleFileChange for avatar cnic front and back
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string,
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
  // FUnction to submit formdata and check for if data is same then no change otherwise send api request to backend
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
      setAvatarPreview(undefined);
      setFrontPreview(undefined);
      setBackPreview(undefined)
      setIsEdit(false);
    } catch (err: any) {
      console.log(err);
      toast.error(err.data.message);
    }
  };
  // Function to set edit false for user edit by admin
  const handleCancel = () => {
    setIsEdit(false);
     setAvatarPreview(undefined);
      setFrontPreview(undefined);
      setBackPreview(undefined)
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
  return {
    isEdit,
    setIsEdit,
    register,
    control,
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
  };
}

export default useUserEdit;
