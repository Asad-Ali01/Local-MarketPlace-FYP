
import { Controller, type Control, type FieldErrors, type UseFormRegister, type UseFormSetValue } from 'react-hook-form';
import { DatePicker, InputNumber, Radio } from 'antd';
import dayjs from 'dayjs';
import type { CreateJobFormInput, CreateJobFormValues } from '@/schemas/jobSchema';


interface Props {
  control: Control<CreateJobFormInput>;
  register: UseFormRegister<CreateJobFormInput>;
  setValue: UseFormSetValue<CreateJobFormInput>;
  errors: FieldErrors<CreateJobFormInput>;
  budgetType: CreateJobFormInput['budgetType'];
  budgetMin: number;
}

export default function JobBudgetFields({
  control,
  register,
  setValue,
  errors,
  budgetType,
  budgetMin,
}: Props) {
  return (
    <div className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium">
          Budget type
        </label>
        <Controller
          name="budgetType"
          control={control}
          render={({ field }) => (
            <Radio.Group
              value={field.value}
              onChange={(event) => {
                const nextType = event.target.value;
                field.onChange(nextType);

                if (nextType === 'fixed') {
                  setValue('budgetMax', budgetMin, {
                    shouldValidate: true,
                  });
                }
              }}
              optionType="button"
              buttonStyle="solid"
              size="large"
              options={[
                { label: 'Fixed price', value: 'fixed' },
                { label: 'Budget range', value: 'range' },
              ]}
            />
          )}
        />
      </div>

      <div className={`grid gap-4 ${budgetType === 'range' ? 'sm:grid-cols-2' : ''}`}>
        <div>
          <label className="mb-2 block text-sm font-medium">
            {budgetType === 'fixed' ? 'Project price (PKR)' : 'Minimum budget (PKR)'}
          </label>
          <Controller
            name="budgetMin"
            control={control}
            render={({ field }) => (
              <InputNumber
                ref={field.ref}
                value={field.value}
                onChange={(value) => {
                  const amount = value ?? 0;
                  field.onChange(amount);

                  if (budgetType === 'fixed') {
                    setValue('budgetMax', amount, {
                      shouldValidate: true,
                    });
                  }
                }}
                min={1}
                precision={0}
                size="large"
                className="w-full"
                placeholder="5000"
                status={errors.budgetMin ? 'error' : ''}
              />
            )}
          />
          {errors.budgetMin && (
            <p className="mt-1 text-xs text-destructive">
              {errors.budgetMin.message}
            </p>
          )}
        </div>

        {budgetType === 'range' && (
          <div>
            <label className="mb-2 block text-sm font-medium">
              Maximum budget (PKR)
            </label>
            <Controller
              name="budgetMax"
              control={control}
              render={({ field }) => (
                <InputNumber
                  ref={field.ref}
                  value={field.value}
                  onChange={(value) => field.onChange(value ?? 0)}
                  min={1}
                  precision={0}
                  size="large"
                  className="w-full"
                  placeholder="15000"
                  status={errors.budgetMax ? 'error' : ''}
                />
              )}
            />
            {errors.budgetMax && (
              <p className="mt-1 text-xs text-destructive">
                {errors.budgetMax.message}
              </p>
            )}
          </div>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Project deadline
        </label>
        <Controller
          name="deadline"
          control={control}
          render={({ field }) => (
            <DatePicker
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) =>
                field.onChange(date ? date.format('YYYY-MM-DD') : '')
              }
              disabledDate={(date) =>
                !date || date.isBefore(dayjs().startOf('day'))
              }
              format="DD MMM YYYY"
              size="large"
              className="w-full"
              placeholder="Select completion date"
              status={errors.deadline ? 'error' : ''}
            />
          )}
        />
        {errors.deadline && (
          <p className="mt-1 text-xs text-destructive">
            {errors.deadline.message}
          </p>
        )}
      </div>
    </div>
  );
}