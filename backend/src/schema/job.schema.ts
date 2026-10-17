
import { z } from 'zod';

const jobFields = {
  title: z.string().trim().min(10).max(150),
  description: z.string().trim().min(30).max(10000),
  category: z.string().trim().min(1),
 skills: z
  .array(
    z
      .string()
      .trim()
      .min(1, "Skill cannot be empty")
      .regex(
        /.*[a-zA-Z].*/,
        "Skill must contain at least one letter"
      )
  )
  .min(1, "Add at least one skill"),
  budgetType: z.enum(['fixed', 'range']),
  budgetMin: z.coerce.number().positive(),
  budgetMax: z.coerce.number().positive(),
  deadline: z.coerce.date().refine(
    (date) => date > new Date(),
    'Deadline must be in the future',
  ),
};

export const createJobSchema = z
  .object(jobFields)
  .strict()
  .refine((data) => data.budgetMin < data.budgetMax, {
    message: 'Maximum budget must be greater the minimum budget',
    path: ['budgetMax'],
  })
  .refine(
    (data) =>
      data.budgetType !== 'fixed' ||
      data.budgetMin === data.budgetMax,
    {
      message: 'Fixed budgets require equal minimum and maximum values',
      path: ['budgetMax'],
    },
  );

export const updateJobSchema = z
  .object({
    title: jobFields.title.optional(),
    description: jobFields.description.optional(),
    category: jobFields.category.optional(),
    skills: jobFields.skills.optional(),
    budgetType: jobFields.budgetType.optional(),
    budgetMin: jobFields.budgetMin.optional(),
    budgetMax: jobFields.budgetMax.optional(),
    deadline: jobFields.deadline.optional(),
  })
  .strict()
  .refine(
    (data) =>
      data.budgetMin === undefined ||
      data.budgetMax === undefined ||
      data.budgetMin < data.budgetMax,
    {
      message: 'Maximum budget must be greater the minimum budget',
      path: ['budgetMax'],
    },
  )
  .refine(
    (data) =>
      data.budgetType !== 'fixed' ||
      data.budgetMin === undefined ||
      data.budgetMax === undefined ||
      data.budgetMin === data.budgetMax,
    {
      message: 'Fixed budgets require equal minimum and maximum values',
      path: ['budgetMax'],
    },
  )
  .refine(
    (data) => Object.keys(data).length > 0,
    'Provide at least one field to update',
  );