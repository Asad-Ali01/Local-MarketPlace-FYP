import { useAdminCreateCategoryApiMutation } from "@/features/admin/adminApi";
import type { CreateSchemaType } from "../schemas/categorySchema";

export const usePostNewCategory = () => {
  const [createCategoryApi, { isLoading, isSuccess, error }] =
    useAdminCreateCategoryApiMutation();

  const createCategory = async (data: CreateSchemaType) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("icon", data.icon);
    console.log("Here is category : ",formData);
    try {
      await createCategoryApi(formData).unwrap();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  return { createCategory, isLoading };
};
