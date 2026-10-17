
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  FileText,
  LoaderCircle,
  Wallet,
} from 'lucide-react';


import type { IJob } from '@/types/job.types';

import JobPreview from './JobPreview';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { createJobSchema, type CreateJobFormInput, type CreateJobFormValues } from '@/schemas/jobSchema';

interface CreateJobFormProps {
  onSubmit: (values: CreateJobFormValues) => Promise<void>;
  isSubmitting: boolean;
  serverError?: string;
  categories: { label: string; value: string; }[]
}

// const categories = [
//   'Web Development',
//   'Mobile Development',
//   'UI/UX Design',
//   'Graphic Design',
//   'Digital Marketing',
//   'Writing & Translation',
//   'Data Science & AI',
//   'Other',
// ];

export default function CreateJobForm({
    categories,
  onSubmit,
  isSubmitting,
  serverError,
}: CreateJobFormProps) {
    
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateJobFormValues>({
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
    mode: 'onBlur',
  });

  const values = watch();
  const budgetType = watch('budgetType');

  // The browser and backend must agree on a future deadline.
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDeadline = [
    tomorrow.getFullYear(),
    String(tomorrow.getMonth() + 1).padStart(2, '0'),
    String(tomorrow.getDate()).padStart(2, '0'),
  ].join('-');

  const fieldError = (message?: string) =>
    message ? (
      <p className="mt-1.5 text-xs font-medium text-destructive">
        {message}
      </p>
    ) : null;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      noValidate
    >
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="rounded-2xl border-border/70 shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FileText className="size-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      Job details
                    </CardTitle>
                    <CardDescription>
                      Tell providers what you need done.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <label
                    htmlFor="title"
                    className="text-sm font-medium"
                  >
                    Job title <span className="text-destructive">*</span>
                  </label>

                  <Input
                    id="title"
                    placeholder="e.g. Build a responsive e-commerce website"
                    maxLength={150}
                    {...register('title')}
                    aria-invalid={!!errors.title}
                    className="h-11"
                  />

                  <div className="flex justify-between gap-3">
                    {fieldError(errors.title?.message)}
                    <span className="ml-auto text-xs text-muted-foreground">
                      {values.title?.length ?? 0}/150
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="category"
                    className="text-sm font-medium"
                  >
                    Category <span className="text-destructive">*</span>
                  </label>

                  <select
                    id="category"
                    {...register('category')}
                    aria-invalid={!!errors.category}
                    className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Choose a category</option>
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>

                  {fieldError(errors.category?.message)}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="description"
                    className="text-sm font-medium"
                  >
                    Project description{' '}
                    <span className="text-destructive">*</span>
                  </label>

                  <Textarea
                    id="description"
                    placeholder="Explain the project, key requirements, expected deliverables, and what a successful result looks like..."
                    rows={7}
                    maxLength={10000}
                    {...register('description')}
                    aria-invalid={!!errors.description}
                    className="resize-y leading-6"
                  />

                  <div className="flex justify-between gap-3">
                    {fieldError(errors.description?.message)}
                    <span className="ml-auto text-xs text-muted-foreground">
                      {values.description?.length ?? 0}/10,000
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="skills"
                    className="text-sm font-medium"
                  >
                    Required skills{' '}
                    <span className="text-destructive">*</span>
                  </label>

                  <Input
                    id="skills"
                    placeholder="React, TypeScript, Node.js, MongoDB"
                    {...register('skills')}
                    aria-invalid={!!errors.skills}
                    className="h-11"
                  />

                  <p className="text-xs text-muted-foreground">
                    Separate skills with commas. These help match your
                    job with suitable providers.
                  </p>

                  {fieldError(errors.skills?.message)}

                  <div className="flex flex-wrap gap-2 pt-1">
                    {values.skills
                      ?.split(',')
                      .map((skill) => skill.trim())
                      .filter(Boolean)
                      .map((skill, index) => (
                        <Badge
                          key={`${skill}-${index}`}
                          variant="secondary"
                        >
                          {skill}
                        </Badge>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <Card className="rounded-2xl border-border/70 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Wallet className="size-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">
                    Budget & timeline
                  </CardTitle>
                  <CardDescription>
                    Set a realistic budget and deadline.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="space-y-2">
                <span className="text-sm font-medium">
                  Budget type
                </span>

                <Controller
                  control={control}
                  name="budgetType"
                  render={({ field }) => (
                    <div className="grid grid-cols-2 gap-3">
                      {(
                        [
                          {
                            value: 'fixed',
                            title: 'Fixed price',
                            detail: 'One total project price',
                          },
                          {
                            value: 'range',
                            title: 'Budget range',
                            detail: 'Set a minimum and maximum',
                          },
                        ] as const
                      ).map((option) => {
                        const selected = field.value === option.value;

                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              field.onChange(option.value);

                              if (option.value === 'fixed') {
                                setValue(
                                  'budgetMax',
                                  Number(values.budgetMin),
                                  { shouldValidate: true },
                                );
                              }
                            }}
                            className={`rounded-xl border p-4 text-left transition-colors ${
                              selected
                                ? 'border-primary bg-primary/5 ring-1 ring-primary'
                                : 'border-border hover:bg-muted/50'
                            }`}
                          >
                            <span className="block text-sm font-semibold">
                              {option.title}
                            </span>
                            <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                              {option.detail}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                />
              </div>

              <div
                className={`grid gap-4 ${
                  budgetType === 'range'
                    ? 'sm:grid-cols-2'
                    : 'sm:grid-cols-1'
                }`}
              >
                <div className="space-y-2">
                  <label
                    htmlFor="budgetMin"
                    className="text-sm font-medium"
                  >
                    {budgetType === 'fixed'
                      ? 'Project price (PKR)'
                      : 'Minimum budget (PKR)'}
                  </label>

                  <Input
                    id="budgetMin"
                    type="number"
                    min={1}
                    step={1}
                    {...register('budgetMin', {
                      valueAsNumber: true,
                    })}
                    aria-invalid={!!errors.budgetMin}
                    className="h-11"
                  />

                  {fieldError(errors.budgetMin?.message)}
                </div>

                {budgetType === 'range' && (
                  <div className="space-y-2">
                    <label
                      htmlFor="budgetMax"
                      className="text-sm font-medium"
                    >
                      Maximum budget (PKR)
                    </label>

                    <Input
                      id="budgetMax"
                      type="number"
                      min={1}
                      step={1}
                      {...register('budgetMax', {
                        valueAsNumber: true,
                      })}
                      aria-invalid={!!errors.budgetMax}
                      className="h-11"
                    />

                    {fieldError(errors.budgetMax?.message)}
                  </div>
                )}
              </div>

              {budgetType === 'fixed' && (
                <p className="text-xs text-muted-foreground">
                  Your project price will be used as both the minimum
                  and maximum budget.
                </p>
              )}

              <Separator />

              <div className="space-y-2">
                <label
                  htmlFor="deadline"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <CalendarDays className="size-4 text-muted-foreground" />
                  Project deadline
                  <span className="text-destructive">*</span>
                </label>

                <Input
                  id="deadline"
                  type="date"
                  min={minDeadline}
                  {...register('deadline')}
                  aria-invalid={!!errors.deadline}
                  className="h-11"
                />

                {fieldError(errors.deadline?.message)}

                <p className="text-xs text-muted-foreground">
                  Select the date by which you want the project
                  completed.
                </p>
              </div>
            </CardContent>
          </Card>

          {serverError && (
            <div
              role="alert"
              className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
            >
              {serverError}
            </div>
          )}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-5 text-muted-foreground">
              Review your details before publishing.
            </p>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="h-12 rounded-xl px-6"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle className="mr-2 size-4 animate-spin" />
                  Publishing job...
                </>
              ) : (
                <>
                  Publish job
                  <ArrowRight className="ml-2 size-4" />
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <JobPreview values={values} />

          <div className="flex gap-3 rounded-xl border border-border/70 p-4">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-medium">
                Better details, better matches
              </p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Clear requirements and relevant skills help providers
                understand your project before submitting proposals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}