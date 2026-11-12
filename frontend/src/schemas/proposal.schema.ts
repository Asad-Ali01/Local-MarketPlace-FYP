import { z } from "zod";

export const createProposalSchema = z.object({
  coverLetter: z
    .string()
    .trim()
    .min(30, "Cover letter must be at least 30 characters")
    .max(3000, "Cover letter cannot exceed 3000 characters"),

  budgetType: z.enum(["fixed", "hourly"], {
    error: "Please select a budget type",
  }),

  proposedBudget: z
    .number({
      error: "Proposed budget is required",
    })
    .positive("Proposed budget must be greater than 0"),

  estimatedDuration: z
    .string()
    .trim()
    .min(1, "Estimated duration is required")
    .max(100, "Estimated duration cannot exceed 100 characters"),
});

export type CreateProposalInput = z.infer<
  typeof createProposalSchema
>;