
export type JobBudgetType = 'fixed' | 'range';

export type JobStatus =
  | 'open'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface IJobClient {
  _id: string;
  name: string;
  avatar?: string;
}

export interface IJob {
  _id: string;
  client: string | IJobClient;
  title: string;
  description: string;
  category: string;
  skills: string[];
  budgetType: JobBudgetType;
  budgetMin: number;
  budgetMax: number;
  deadline: string;
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateJobRequest {
  title: string;
  description: string;
  category: string;
  skills: string[];
  budgetType: JobBudgetType;
  budgetMin: number;
  budgetMax: number;
  deadline: string;
}

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}