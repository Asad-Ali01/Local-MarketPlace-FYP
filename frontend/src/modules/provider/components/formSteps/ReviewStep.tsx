import { useFormContext } from "react-hook-form";
import type { ProviderGigSchemaInputType } from "../../schemas/schema";
import useGetAllCategories from "@/modules/admin/hooks/useGetAllCategories";
import useGetAllSubCategories from "@/modules/admin/hooks/useGetAllSubCategories";

function ReviewStep() {
  const form = useFormContext<ProviderGigSchemaInputType>();
  const values = form.getValues();
  const { categoryOptions } = useGetAllCategories();
  const { subCategoryOptions } = useGetAllSubCategories();

  const categoryLabel =
    categoryOptions.find((c) => c.value === values.category)?.label ??
    values.category;

  const subCategoryLabel =
    subCategoryOptions?.find((c) => c.value === values.subcategory)?.name ??
    values.subcategory;

  const images = [values.image1, values.image2, values.image3].filter(
    (img): img is File => img instanceof File
  );

  return (
    <div className="w-full space-y-6">
      <h3 className="text-lg font-semibold">Review your gig</h3>

      <div className="space-y-1">
        <p className="text-sm text-gray-500">Title</p>
        <p className="font-medium">{values.title}</p>
      </div>

      <div className="space-y-1">
        <p className="text-sm  text-gray-500">Description</p>
        <p className="whitespace-pre-wrap wrap-break-word" >{values.description}</p>
      </div>

      <div className="space-y-1">
        <p className="text-sm text-gray-500">Location</p>
        <p className="font-medium">{values.location}</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Category</p>
          <p className="font-medium">{categoryLabel}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Sub Category</p>
          <p className="font-medium">{subCategoryLabel}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Status</p>
          <p className="font-medium capitalize">{values.status}</p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-gray-500">Images</p>
        <div className="flex gap-3">
          {images.length === 0 && (
            <p className="text-sm text-gray-400">No images added</p>
          )}
          {images.map((file, i) => (
            <img
              key={i}
              src={URL.createObjectURL(file)}
              alt={`Preview ${i + 1}`}
              className="h-24 w-24 rounded-md object-cover border"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReviewStep;