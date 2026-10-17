import { Types } from "mongoose";

export type CreateJobInput = Pick<
  IJob,
  | "title"
  | "description"
  | "category"
  | "skills"
  | "budgetType"
  | "budgetMin"
  | "budgetMax"
  | "deadline"
>;
export type JobBudgetType = "fixed" | "range";
export interface JobPaginationOptions {
  limit?: number;
  cursor?: string;
}
export type JobStatus = "open" | "in_progress" | "completed" | "cancelled";

export type UpdateJobInput = Partial<CreateJobInput>;
export interface IJob extends Document {
  client: Types.ObjectId;
  title: string;
  description: string;
  category: string;
  skills: string[];
  budgetType: JobBudgetType;
  budgetMin: number;
  budgetMax: number;
  deadline: Date;
  status: JobStatus;
  createdAt: Date;
  updatedAt: Date;
}
