
import { useState } from 'react';
import { Alert, Spin } from 'antd';
import { BriefcaseBusiness } from 'lucide-react';
import { useGetAllCategoriesForHomePageQuery } from '@/features/home/homeApi';
import { useCreateJob } from '@/hooks/useCreateJob';
import type { CreateJobFormValues } from '@/schemas/jobSchema';
import CreateJobForm from '@/components/job/CreateJob';
import type { IJob } from '@/types/job.types';



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
      // RTK Query retains the mutation error for display.
    }
  };

  const getServerErrorMessage = (error: unknown): string | undefined => {
  if (!error || typeof error !== 'object') {
    return undefined;
  }

  if (!('data' in error)) {
    return 'Unable to publish your job. Please try again.';
  }

  const data = error.data;

  if (
    data !== null &&
    typeof data === 'object' &&
    'message' in data &&
    typeof data.message === 'string'
  ) {
    return data.message;
  }

  return 'Unable to publish your job. Please try again.';
};

const serverError = getServerErrorMessage(error);

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
          <CreateJobForm
            categories={categoryOptions}
            onSubmit={handleSubmit}
            isSubmitting={isLoading}
            serverError={serverError}
          />
        )}
      </div>
    </main>
  );
}