
import { useState } from 'react';
import { Alert, message, Spin } from 'antd';
import { BriefcaseBusiness } from 'lucide-react';
import { useGetAllCategoriesForHomePageQuery } from '@/features/home/homeApi';
import { useCreateJob } from '@/hooks/useCreateJob';
import type { CreateJobFormValues } from '@/schemas/jobSchema';

import type { ServerValidationError } from '@/types/job.types';
import CreateJob from '@/components/job/CreateJobForm';



export default function CreateJobPage() {
  const {
    data: categoriesResponse,
    isLoading: isLoadingCategories,
    isError: isCategoriesError,
  } = useGetAllCategoriesForHomePageQuery();

  const { submitJob, isLoading, error } = useCreateJob();
  const [successMessage, setSuccessMessage] = useState('');

  // Assumption: categoriesResponse.data is an array of {_id, name}.
  // Match this mapping to your actual IGetAllCategoriesHome type.
  const categoryOptions = (categoriesResponse?.data ?? []).map(
    (category) => ({
      label: category.name,
      value: category.name,
    }),
  );

  const handleSubmit = async (values: CreateJobFormValues) => {
    setSuccessMessage('');

    try {
     await submitJob(values);
      setSuccessMessage('Your job was published successfully.');
     
    } catch {
     message.error("Failed to create job")
    }
  };

  const getServerValidationErrors = (
  error: unknown
): ServerValidationError[] => {
  if (
    !error ||
    typeof error !== "object" ||
    !("data" in error)
  ) {
    return [];
  }

  const data = error.data;

  if (
    !data ||
    typeof data !== "object" ||
    !("errors" in data) ||
    !Array.isArray(data.errors)
  ) {
    return [];
  }

  return data.errors.filter(
    (item): item is ServerValidationError =>
      typeof item === "object" &&
      item !== null &&
      "path" in item &&
      Array.isArray(item.path) &&
      "message" in item &&
      typeof item.message === "string"
  );
};

const serverError = getServerValidationErrors(error);

  return (
    <main className="min-h-screen bg-muted/30 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-3xl space-y-7">
        <header className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BriefcaseBusiness className="size-4" />
            Client workspace
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Post a job
          </h1>
          <p className="text-muted-foreground">
            Describe your project and connect with the right providers.
          </p>
        </header>

        {successMessage && (
          <Alert
            type="success"
            showIcon
            message={successMessage}
          />
        )}

        {isCategoriesError && (
          <Alert
            type="error"
            showIcon
            message="Couldn't load job categories."
            description="Please refresh the page and try again."
          />
        )}

        {isLoadingCategories ? (
          <div className="flex justify-center py-16">
            <Spin size="large" />
          </div>
        ) : (
          <CreateJob
            categoryOptions={categoryOptions}
            onSubmit={handleSubmit}
            isSubmitting={isLoading}
            serverValidationErrors={serverError}
          />
        )}
      </div>
    </main>
  );
}