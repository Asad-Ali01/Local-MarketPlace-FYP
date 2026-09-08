import { useFormContext } from 'react-hook-form';
import type { ProviderGigSchemaInputType } from '../../../schemas/gig';
import useGetAllCategories from '@/hooks/useGetAllCategories';
import useGetAllSubCategories from '@/hooks/useGetAllSubCategories';

function ReviewStep() {
  const form = useFormContext<ProviderGigSchemaInputType>();
  const values = form.getValues();
  const { categoryOptions } = useGetAllCategories();
  const { subCategoryOptions } = useGetAllSubCategories();

  const categoryLabel =
    categoryOptions.find((c) => c.value === values.category)?.label ?? values.category;

  const subCategoryLabel =
    subCategoryOptions?.find((c) => c.value === values.subcategory)?.name ?? values.subcategory;

  const images = [values.image1, values.image2, values.image3].filter(
    (img): img is File => img instanceof File,
  );
  const avatar = values.avatar;
  return (
    <div className="w-full space-y-6">
      <h3 className="text-lg font-semibold">Review your gig</h3>

      <div className="space-y-1">
        <p className="text-sm text-gray-500">Title</p>
        <p className="font-medium">{values.title}</p>
      </div>

      <div className="space-y-1">
        <p className="text-sm  text-gray-500">Description</p>
        <p className="whitespace-pre-wrap wrap-break-word">{values.description}</p>
      </div>

      <section className="grid sm:grid-cols-2">
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Location Lat</p>
          <p className="font-medium">{values?.location?.lat}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Location Lng</p>
          <p className="font-medium">{values.location.lng}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-gray-500">Location city</p>
          <p className="font-medium"> {values.location.city}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Location completeName</p>
          <p className="font-medium"> {values.location.locationName}</p>
        </div>
      </section>

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
      {/*Avatar  */}
      <div className="space-y-2">
        <p className="text-sm text-gray-500">Profile Picture</p>
        <div className="flex gap-3">
          {avatar ? (
            <img
              key={'avatar'}
              src={URL.createObjectURL(avatar)}
              alt={'Profile picture'}
              className="h-24 w-24 rounded-md object-cover border"
            />
          ) : (
            <p className="text-sm text-gray-400">No profiles picture was added</p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-gray-500">Images</p>
        <div className="flex gap-3">
          {images.length === 0 && <p className="text-sm text-gray-400">No images added</p>}
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
