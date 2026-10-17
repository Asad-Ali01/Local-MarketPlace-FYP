
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';


import JobDetailsFields from './JobDetailsFields';
import JobBudgetFields from './JobBudgetFields';
import { createJobSchema, type CreateJobFormInput, type CreateJobFormValues } from '@/schemas/jobSchema';
import type { ServerValidationError } from '@/types/job.types';
import { useEffect } from 'react';

interface Props {
  categoryOptions: { label: string; value: string }[];
  onSubmit: (values: CreateJobFormValues) => Promise<void>;
  isSubmitting: boolean;
    serverValidationErrors: ServerValidationError[];
}

export default function CreateJob({
  categoryOptions,
  onSubmit,
  isSubmitting,

  serverValidationErrors
}: Props) {
  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    setError,
  
    formState: { errors },
  } = useForm<CreateJobFormInput,unknown,CreateJobFormValues>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      skills: '',
      budgetType: 'range',
      budgetMin: 5000,
      budgetMax: 15000,
      deadline: '',
    },
  });
useEffect(() => {
  const validFields = [
    "title",
    "description",
    "category",
    "skills",
    "budgetType",
    "budgetMin",
    "budgetMax",
    "deadline",
  ] as const;
  for (const issue of serverValidationErrors) {
    const field = issue.path[0];

    if (
      typeof field === "string" &&
      validFields.includes(
        field as (typeof validFields)[number]
      )
    ) {
      setError(field as (typeof validFields)[number], {
        type: "server",
        message: issue.message,
      });
    }
  }
}, [serverValidationErrors, setError]);

  const budgetType = watch('budgetType');
  const budgetMin = watch('budgetMin');

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
            <JobDetailsFields
              control={control}
     
              errors={errors}
              categoryOptions={categoryOptions}
            />
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

    

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting} size="lg">
            {isSubmitting ? 'Publishing…' : 'Publish job'}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}