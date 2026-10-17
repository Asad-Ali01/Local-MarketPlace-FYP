
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

interface Props {
  categoryOptions: { label: string; value: string }[];
  onSubmit: (values: CreateJobFormValues) => Promise<void>;
  isSubmitting: boolean;
  serverError?: string;
}

export default function CreateJobForm({
  categoryOptions,
  onSubmit,
  isSubmitting,
  serverError,
}: Props) {
  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
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
              register={register}
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

        {serverError && (
          <p role="alert" className="text-sm text-destructive">
            {serverError}
          </p>
        )}

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting} size="lg">
            {isSubmitting ? 'Publishing…' : 'Publish job'}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}