import { z } from 'zod';
export const createJobSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(10, 'Title must contain at least 10 characters')
      .max(150, 'Title cannot exceed 150 characters'),

    description: z
      .string()
      .trim()
      .min(30, 'Description must contain at least 30 characters')
      .max(10000, 'Description cannot exceed 10,000 characters'),

    category: z
      .string()
      .trim()
      .min(1, 'Please select a category'),
skills: z
  .string()
  .trim()
  .min(1, "Add at least one skill")
  .refine(
    (value) =>
      value
        .split(",")
        .every((skill) => /[a-zA-Z]/.test(skill.trim())),
    "Every skill must contain at least one letter"
  ),

    budgetType: z.enum(['fixed', 'range']),

    budgetMin: z
      .number()
      .positive('Budget must be greater than zero'),

    budgetMax: z
      .number()
      .positive('Budget must be greater than zero'),

    deadline: z
      .string()
      .min(1, 'Please select a deadline')
      .refine(
        (value) => {
          const date = new Date(`${value}T23:59:59`);
          return !Number.isNaN(date.getTime()) && date > new Date();
        },
        'Deadline must be in the future',
      ),
  })
  .superRefine((data, ctx) => {
    if (data.budgetMin >= data.budgetMax) {
      ctx.addIssue({
        code: 'custom',
        path: ['budgetMax'],
        message: 'Maximum budget must be greater the minimum budget',
      });
    }
    
    if (
      data.budgetType === 'fixed' &&
      data.budgetMin !== data.budgetMax
    ) {
      ctx.addIssue({
        code: 'custom',
        path: ['budgetMax'],
        message: 'Fixed budget must have equal minimum and maximum values',
      });
    }
  });


  export const updateJobSchema = z.object({
  title: z.string().trim().min(10, 'Title must be at least 10 characters').max(150),
  description: z.string().trim().min(30, 'Description must be at least 30 characters').max(10000),
  category: z.string().min(1, 'Please select a category'),
  skills: z.string().trim().min(1, 'Enter at least one skill'),
  budgetType: z.enum(['fixed', 'range']),
  budgetMin: z.number().min(1, 'Budget must be greater than zero'),
  budgetMax: z.number().min(1, 'Budget must be greater than zero'),
  deadline: z.string().min(1, 'Please select a deadline'),
}).refine(
  (values) => values.budgetMax >= values.budgetMin,
  {
    message: 'Maximum budget must be greater than the minimum budget',
    path: ['budgetMax'],
  },
).refine(
  (values) =>
    values.budgetType !== 'fixed' ||
    values.budgetMin === values.budgetMax,
  {
    message: 'For a fixed budget, minimum and maximum must be equal',
    path: ['budgetMax'],
  },
);
export type CreateJobFormInput =  z.input<typeof createJobSchema>;
export type CreateJobFormValues = z.output<typeof createJobSchema>;
export type UpdateJobFormValues  = z.infer<typeof updateJobSchema>
