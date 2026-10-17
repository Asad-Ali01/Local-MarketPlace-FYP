
import { useCreateJobApiMutation } from '@/features/job/jobApi';
import type { CreateJobFormValues } from '@/schemas/jobSchema';
import type { IJob } from '@/types/job.types';

export function useCreateJob() {
  const [createJobApi, { isLoading, error, reset }] =
    useCreateJobApiMutation();

  const submitJob = async (
    values: CreateJobFormValues,
  ): Promise<IJob> => {
    const skills = [
      ...new Set(
        values.skills
          .split(',')
          .map((skill) => skill.trim())
          .filter(Boolean),
      ),
    ];

    const budgetMin = Number(values.budgetMin);
    const budgetMax =
      values.budgetType === 'fixed'
        ? budgetMin
        : Number(values.budgetMax);

    // Set the deadline to the end of the selected calendar day.
    const deadline = new Date(
      `${values.deadline}T23:59:59.999`,
    ).toISOString();

    const response = await createJobApi({
      title: values.title.trim(),
      description: values.description.trim(),
      category: values.category,
      skills,
      budgetType: values.budgetType,
      budgetMin,
      budgetMax,
      deadline,
    }).unwrap();

    return response.data;
  };

  return {
    submitJob,
    isLoading,
    error,
    reset,
  };
}