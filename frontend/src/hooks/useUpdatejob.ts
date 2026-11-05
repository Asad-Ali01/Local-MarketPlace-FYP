
import { useUpdateJobApiMutation } from '@/features/job/jobApi';
import type { ICreateJobRequest, IUpdateJobRequest } from '@/types/job.types';

export default function useUpdateJob() {
  const [updateJobApi, { isLoading, isSuccess, isError, error }] =
    useUpdateJobApiMutation();

  const updateJob = async (
    jobId: string,
    jobData: IUpdateJobRequest,
  ) => {
    return await updateJobApi({ jobId, jobData }).unwrap();
  };

  return {
    updateJob,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}