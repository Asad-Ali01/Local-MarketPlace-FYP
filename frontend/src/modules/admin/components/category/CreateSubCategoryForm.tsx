import { useForm } from "react-hook-form";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

import { Field } from "@/components/ui/field";
import CustomField from "@/components/shared/CustomField";
import useGetAllCategories from "../../hooks/useGetAllCategories";
import { useAdminGetAllCategoriesQuery } from "@/features/admin/adminApi";
import { useEffect, useState } from "react";
import { usePostNewSubCategory } from "../../hooks/usePostNewSubCategory";
import type { CreateSubSchemaType } from "../../schemas/categorySchema";
import toast from "react-hot-toast";

type FormType = {
  category: string;
  name: string;
};

export default function CreateSubCategoryForm() {
  const form = useForm<FormType>();
    const {categoryOptions} = useGetAllCategories(); 
    const {createSubCategory,isLoading} = usePostNewSubCategory();

  const onSubmit = async (data: CreateSubSchemaType) => {
    console.log(data);
    try {
      await createSubCategory(data);
      toast.success("Sub category created successfully");
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create subCategory");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create SubCategory</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <CustomField
            label="Category"
            error={form.formState.errors.category?.message}
          >
            <Select onValueChange={(value) => form.setValue("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>

              <SelectContent>
                {categoryOptions?.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CustomField>

          <CustomField
            label="SubCategory Name"
            error={form.formState.errors.name?.message}
          >
            <Input placeholder="Web Development" {...form.register("name")} />
          </CustomField>

          <Button className="w-full" disabled={isLoading}>Create SubCategory</Button>
        </form>
      </CardContent>
    </Card>
  );
}
