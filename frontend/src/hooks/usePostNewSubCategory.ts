import { useAdminCreateSubCategoryMutation } from "@/features/admin/adminApi";
import type { CreateSubSchemaType } from "../schemas/categorySchema";

export const usePostNewSubCategory = () => {
     const [createSubCategoryApi,{isLoading}] = useAdminCreateSubCategoryMutation();

    const createSubCategory = async(data:CreateSubSchemaType) => {
     
        try {
            await createSubCategoryApi(data).unwrap();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    return {createSubCategory,isLoading};
}