import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  BriefcaseBusiness,
  Clock3,
  DollarSign,
  FileText,
  Loader2,
  Send,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { InputNumber, message } from 'antd';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { createProposalSchema, type CreateProposalInput } from '@/schemas/proposal.schema';
import { useSubmitProposal } from '@/hooks/useSubmitProposal';
import { getServerValidationErrors } from '@/utils/getServerValidatorErrors';
import RichTextEditor from '../shared/RickTextEditor';
import { useNavigate } from 'react-router';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface SubmitProposalFormProps {
  jobId: string;
}

const SubmitProposalForm = ({ jobId }: SubmitProposalFormProps) => {
  const { handleSubmit, isLoading, error } = useSubmitProposal();

  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit: handleFormSubmit,
    reset,
    setError,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<CreateProposalInput>({
    resolver: zodResolver(createProposalSchema),
    defaultValues: {
      coverLetter: '',
      budgetType: 'fixed',
      proposedBudget: undefined,
      estimatedDuration: '',
    },
  });
  const navigate = useNavigate();
  const serverError = getServerValidationErrors(error);

  useEffect(() => {
    const validFields = [
      'coverLetter',
      'budgetType',
      'proposedBudget',
      'estimatedDuration',
    ] as const;
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
  const budget = watch('proposedBudget');
  const coverLetter = watch('coverLetter');

  const onSubmit = async (values: CreateProposalInput) => {
    setSuccess(false);

    try {
      await handleSubmit(jobId, values);
      setSuccess(true);
      reset();
      message.success('Proposal submitted successfully.');
    } catch (error: any) {
      console.log('error: ', error);
      const errorMessage = error.data.message || 'Failed to submit the proposal.';
      message.error(errorMessage);
    }
  };

  if (success) {
    return (
      <Card className="mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border shadow-sm">
        <CardContent className="flex flex-col items-center px-6 py-14 text-center sm:px-10">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950">
            <CheckCircle2 size={42} strokeWidth={1.7} />
          </div>

          <span className="mb-3 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
            Successfully submitted
          </span>

          <h2 className="text-2xl font-bold tracking-tight">Your proposal is on its way!</h2>

          <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
            Your proposal has been submitted successfully. You can track its progress from your
            proposals dashboard.
          </p>

          <Button
            className="mt-7 gap-2"
            onClick={() => {
              setSuccess(false);
              navigate(-1);
            }}
          >
            Done
            <ArrowRight size={16} />
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border-border/70 shadow-sm">
      {/* Header */}
      <CardHeader className="space-y-4 bg-muted/30 px-6 py-7 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <BriefcaseBusiness size={22} />
          </div>

          <div>
            <CardTitle className="text-xl font-bold tracking-tight">Submit your proposal</CardTitle>
            <CardDescription className="mt-1">
              Make your offer stand out to the client.
            </CardDescription>
          </div>
        </div>

        <div className="flex items-start gap-2 rounded-lg border border-primary/15 bg-primary/5 px-4 py-3">
          <Sparkles size={17} className="mt-0.5 shrink-0 text-primary" />
          <p className="text-xs leading-5 text-muted-foreground">
            A strong proposal clearly explains your approach, relevant experience, and estimated
            delivery time.
          </p>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="px-6 py-7 sm:px-8 sm:py-8">
        <form onSubmit={handleFormSubmit(onSubmit)} className="space-y-8">
          {/* Cover letter */}
          <section className="space-y-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <FileText size={17} className="text-primary" />
                <h3 className="font-semibold tracking-tight">Your introduction</h3>
              </div>

              <p className="text-sm text-muted-foreground">
                Tell the client why you're the right person for this job.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverLetter">
                Cover letter <span className="text-destructive">*</span>
              </Label>

              <Controller
                name="coverLetter"
                control={control}
                render={({ field }) => (
                  <RichTextEditor
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder="Explain the work, requirements, and expected deliverables..."
                  />
                )}
              />
              <div className="flex items-center justify-between gap-3">
                {errors.coverLetter ? (
                  <p className="text-xs text-destructive">{errors.coverLetter.message}</p>
                ) : (
                  <p className="text-xs text-muted-foreground">Minimum 30 characters</p>
                )}

                <span className="shrink-0 text-xs text-muted-foreground">
                  {coverLetter?.length || 0}/3000
                </span>
              </div>
            </div>
          </section>

          <Separator />

          {/* Budget and timeline */}
          <section className="space-y-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <DollarSign size={17} className="text-primary" />
                <h3 className="font-semibold tracking-tight">Budget & timeline</h3>
              </div>

              <p className="text-sm text-muted-foreground">
                Set your price and expected project completion time.
              </p>
            </div>
            {/* Budget Type */}
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="budgetType">
                Budget type <span className="text-destructive">*</span>
              </Label>

              <Controller
                name="budgetType"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="budgetType" className="h-11 rounded-xl">
                      <SelectValue placeholder="Select budget type" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="fixed">Fixed Price</SelectItem>

                      <SelectItem value="hourly">Hourly Rate</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.budgetType && (
                <p className="text-xs text-destructive">{errors.budgetType.message}</p>
              )}
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Budget */}
              <div className="space-y-2">
                <Label htmlFor="proposedBudget">
                  Proposed budget <span className="text-destructive">*</span>
                </Label>

                <div >
                  <div className="flex items-center">
                    <span className=" px-3 py-3 text-sm font-medium text-muted-foreground">
                      PKR
                    </span>

                    <InputNumber
                      id="proposedBudget"
                      min={1}
                      precision={0}
                      controls={false}
                      placeholder="15,000"
                      value={budget}
                      onChange={(value) =>
                        setValue(
                          'proposedBudget',
                          value === null ? (undefined as unknown as number) : Number(value),
                          { shouldValidate: true, shouldDirty: true },
                        )
                      }
                      className="w-full border-0 bg-transparent shadow-none [&_.ant-input-number-input]:h-10 [&_.ant-input-number-input]:px-3 focus-visible:"
                      style={{ width: '100%', boxShadow: 'none' }}
                    />
                  </div>
                </div>

                {errors.proposedBudget ? (
                  <p className="text-xs text-destructive">{errors.proposedBudget.message}</p>
                ) : (
                  <p className="text-xs text-muted-foreground">Enter your total project price.</p>
                )}
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <Label htmlFor="estimatedDuration">
                  Estimated duration <span className="text-destructive">*</span>
                </Label>

                <div className="relative">
                  <Clock3
                    size={17}
                    className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-muted-foreground"
                  />

                  <Input
                    id="estimatedDuration"
                    type="text"
                    placeholder="e.g. 2 weeks"
                    className="h-11 rounded-xl pl-10"
                    {...register('estimatedDuration')}
                  />
                </div>

                {errors.estimatedDuration ? (
                  <p className="text-xs text-destructive">{errors.estimatedDuration.message}</p>
                ) : (
                  <p className="text-xs text-muted-foreground">How long will the project take?</p>
                )}
              </div>
            </div>
          </section>

          <Separator />

          {/* Footer */}
          <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-5 text-muted-foreground">
              Please review your information before submitting.
            </p>

            <Button
              type="submit"
              disabled={isLoading}
              className="h-11 gap-2 rounded-xl px-6 font-semibold shadow-sm"
            >
              {isLoading ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit proposal
                  <Send size={16} />
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SubmitProposalForm;
