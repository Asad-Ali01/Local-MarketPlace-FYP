import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { message } from 'antd';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import JobDetailsFields from './JobDetailsFields';
import JobBudgetFields from './JobBudgetFields';

import type {
  ICreateJobRequest,
  ServerValidationError,
  UpdateJobFormProps,
} from '@/types/job.types';

import useUpdateJob from '@/hooks/useUpdatejob';
import { updateJobSchema, type UpdateJobFormValues } from '@/schemas/jobSchema';
import { getServerValidationErrors } from '@/utils/getServerValidatorErrors';
import useGetAllCategories from '@/hooks/useGetAllCategories';
import { useAdminGetAllCategoriesQuery } from '@/features/admin/adminApi';

export default function UpdateJobForm({ job, onCancel, onUpdated }: UpdateJobFormProps) {
  const { updateJob, error, isLoading } = useUpdateJob();

  const {
    handleSubmit,
    reset,
    control,
    register,
    setValue,
    watch,
    setError,
    formState: { errors, dirtyFields, isDirty },
  } = useForm<UpdateJobFormValues>({
    resolver: zodResolver(updateJobSchema),
    defaultValues: {
      title: job.title,
      description: job.description,
      category: job.category,
      skills: job.skills.join(', '),
      budgetType: job.budgetType,
      budgetMin: job.budgetMin,
      budgetMax: job.budgetMax,
      deadline: job.deadline,
    },
  });
  const {data} = useAdminGetAllCategoriesQuery()
   const categoryOptions =
    data?.data?.map((category) => ({
      value: category._id,
      label: category.name,
    })) ?? [];

  const serverError = useMemo(() => {
    console.log("Error: ",error)
  return  getServerValidationErrors(error)
  }, [error]);
  useEffect(() => {
    console.log("USE EFFECT",error)
    const validFields = [
      'title',
      'description',
      'category',
      'skills',
      'budgetType',
      'budgetMin',
      'budgetMax',
      'deadline',
    ] as const;
    console.log("Filed: ",serverError)
    for (const issue of serverError) {
      const field = issue.path[0];
      if (
        typeof field === 'string' &&
        validFields.includes(field as (typeof validFields)[number])
      ) {
        setError(field as (typeof validFields)[number], {
          type: 'server',
          message: issue.message,
        });
  
      }
    }
  }, [serverError, setError]);

  const budgetType = watch('budgetType');
  const budgetMin = watch('budgetMin');

  const onSubmit = async (values: UpdateJobFormValues) => {
    if (!isDirty) {
      message.info('No changes detected');
      return;
    }

    if (values.budgetType === 'range' && values.budgetMin > values.budgetMax) {
      message.error('Minimum budget cannot be greater than maximum budget');
      return;
    }

    if (values.budgetType === 'fixed' && values.budgetMin !== values.budgetMax) {
      message.error('For a fixed budget, minimum and maximum must be equal');
      return;
    }

    const jobData: Partial<ICreateJobRequest> = {};

    if (dirtyFields.title) jobData.title = values.title;

    if (dirtyFields.description) jobData.description = values.description;

    if (dirtyFields.category) jobData.category = values.category;

    if (dirtyFields.skills) {
      jobData.skills = values.skills
        .split(',')
        .map((skill) => skill.trim())
        .filter(Boolean);
    }

    const budgetChanged = dirtyFields.budgetType || dirtyFields.budgetMin || dirtyFields.budgetMax;

    if (budgetChanged) {
      if (values.budgetType === 'fixed') {
        jobData.budgetMin = values.budgetMin;
        jobData.budgetMax = values.budgetMin;
      } else {
        if (dirtyFields.budgetMin) {
          jobData.budgetMin = values.budgetMin;
        }

        if (dirtyFields.budgetMax) {
          jobData.budgetMax = values.budgetMax;
        }
      }

      if (dirtyFields.budgetType) {
        jobData.budgetType = values.budgetType;
      }
    }

    if (dirtyFields.deadline) {
      jobData.deadline = values.deadline;
    }

    if (Object.keys(jobData).length === 0) {
      message.info('No changes detected');
      return;
    }

    try {
      await updateJob(job._id, jobData);
      message.success('Job updated successfully');
      onUpdated?.();
    } catch (error:any) {
      console.log(error)
      // setError(error.data.errors)
      console.log("Server error:" ,serverError)
      const errorMessage = error.data.message || 'Failed to update job. Please try again.'
      message.error(errorMessage);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Project details</CardTitle>
          </CardHeader>

          <CardContent>
            <JobDetailsFields control={control} errors={errors} categoryOptions={categoryOptions} />
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Budget and timeline</CardTitle>
          </CardHeader>

          <CardContent>
            <JobBudgetFields
              register={register}
              control={control}
              setValue={setValue}
              errors={errors}
              budgetType={budgetType}
              budgetMin={Number(budgetMin) || 0}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3 border-t pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
