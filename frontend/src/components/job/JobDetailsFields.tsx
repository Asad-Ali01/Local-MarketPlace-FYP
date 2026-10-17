
import { Controller, type Control, type FieldErrors, type UseFormRegister } from 'react-hook-form';
import { Input, Select } from 'antd';
import type { CreateJobFormInput, CreateJobFormValues } from '@/schemas/jobSchema';

const { TextArea } = Input;

interface Props {
  control: Control<CreateJobFormInput>;
  register: UseFormRegister<CreateJobFormInput>;
  errors: FieldErrors<CreateJobFormInput>;
  categoryOptions: { label: string; value: string }[];
}

export default function JobDetailsFields({
  control,
  register,
  errors,
  categoryOptions,
}: Props) {
  return (
    <div className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium">
          Job title
        </label>
        <Input
          size="large"
          placeholder="e.g. Build a React dashboard"
          status={errors.title ? 'error' : ''}
          {...register('title')}
        />
        {errors.title && (
          <p className="mt-1 text-xs text-destructive">
            {errors.title.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Category
        </label>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              size="large"
              showSearch
              optionFilterProp="label"
              placeholder="Select a category"
              options={categoryOptions}
              className="w-full"
              status={errors.category ? 'error' : undefined}
            />
          )}
        />
        {errors.category && (
          <p className="mt-1 text-xs text-destructive">
            {errors.category.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Project description
        </label>
        <TextArea
          {...register('description')}
          rows={6}
          maxLength={10000}
          showCount
          placeholder="Explain the work, requirements, and expected deliverables..."
          status={errors.description ? 'error' : ''}
        />
        {errors.description && (
          <p className="mt-1 text-xs text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Required skills
        </label>
        <Input
          size="large"
          placeholder="React, TypeScript, Node.js"
          {...register('skills')}
          status={errors.skills ? 'error' : ''}
        />
        <p className="mt-1 text-xs text-muted-foreground">
          Separate skills with commas.
        </p>
        {errors.skills && (
          <p className="mt-1 text-xs text-destructive">
            {errors.skills.message}
          </p>
        )}
      </div>
    </div>
  );
}