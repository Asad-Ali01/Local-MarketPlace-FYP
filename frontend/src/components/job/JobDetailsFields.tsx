
import {
  Controller,
  type Control,
  type FieldErrors,
} from 'react-hook-form';

import { Input, Select } from 'antd';

import type {
  CreateJobFormInput,
  CreateJobFormValues,
} from '@/schemas/jobSchema';

const { TextArea } = Input;

interface Props {
  control: Control<CreateJobFormInput>;
  errors: FieldErrors<CreateJobFormValues>;
  categoryOptions: { label: string; value: string }[];
}

export default function JobDetailsFields({
  control,
  errors,
  categoryOptions,
}: Props) {
  return (
    <div className="space-y-5">
      {/* Job title */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Job title
        </label>

        <Controller
          name="title"
          control={control}
          render={({ field }) => (  
            <Input
              {...field}
              size="large"
              placeholder="e.g. Build a React dashboard"
              status={errors.title ? 'error' : undefined}
              maxLength={150}
            />
          )}
        />

        {errors.title?.message && (
          <p className="mt-1 text-xs text-destructive">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Category
        </label>

        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select
              ref={field.ref}
              value={field.value || undefined}
              onChange={field.onChange}
              onBlur={field.onBlur}
              size="large"
              showSearch={{
              optionFilterProp:"label"
                              
              }}
              placeholder="Select a category"
              options={categoryOptions}
              className="w-full"
              status={errors.category ? 'error' : undefined}
            />
          )}
        />

        {errors.category?.message && (
          <p className="mt-1 text-xs text-destructive">
            {errors.category.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Project description
        </label>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextArea
              {...field}
              rows={6}
              maxLength={10000}
              showCount
              placeholder="Explain the work, requirements, and expected deliverables..."
              status={errors.description ? 'error' : undefined}
            />
          )}
        />

        {errors.description?.message && (
          <p className="mt-1 text-xs text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Skills */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Required skills
        </label>

        <Controller
          name="skills"
          control={control}
          render={({ field }) => (
            <Input
            
              {...field}
              size="large"
              placeholder="React, TypeScript, Node.js"
              status={errors.skills ? 'error' : undefined}
            />
          )}
        />

        <p className="mt-1 text-xs text-muted-foreground">
          Separate skills with commas.
        </p>

        {errors.skills?.message && (
          <p className="mt-1 text-xs text-destructive">
            {errors.skills.message}
          </p>
        )}
      </div>
    </div>
  );
}