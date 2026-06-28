import { Controller, useForm } from "react-hook-form";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import CustomField from "@/components/shared/CustomField";
import { usePostNewCategory } from "../../hooks/usePostNewCategory";
import toast from "react-hot-toast";
import { createSchema, type CreateSchemaType } from "../../schemas/categorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CategoryForm } from "../../types/CategoryFormType";



export default function CreateCategoryForm() {

  const form = useForm<CreateSchemaType>({
    resolver:zodResolver(createSchema)
  });
    const {createCategory,isLoading} = usePostNewCategory();
  const onSubmit = async (data: CreateSchemaType) => {
   try {
     console.log(data);
     await createCategory(data);
     form.reset();
     toast.success("Category created successfully");
   } catch (error:any) {
    console.log(error);
    toast.error("Failed to create category");
   }
  };

  return (
    <Card>

      <CardHeader>

        <CardTitle>
          Create Category
        </CardTitle>

      </CardHeader>

      <CardContent>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        >

          <CustomField
            label="Category Name"
            error={form.formState.errors.name?.message}
          >

            <Input
              placeholder="Information Technology"
              {...form.register("name")}
            />

          </CustomField>

          <CustomField
            label="Category Icon"
            error={form.formState.errors.icon?.message}
          >

            <Controller
            name="icon"
            control={form.control}
            render={({field}) => (
                <Input
                type="file"
                onChange={(e) => {
                    field.onChange(e.target.files?.[0] ?? null)
                }}
                />
            )}
            />

          </CustomField>

          <Button className="w-full" disabled={isLoading}>
            Create Category
          </Button>

        </form>

      </CardContent>

    </Card>
  );
}