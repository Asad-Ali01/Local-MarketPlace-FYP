
export type JobBudgetType = 'fixed' | 'range';

export type JobStatus =
  | 'open'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface IJobClient {
  _id: string;
  name: string;
}

export interface IJob {
  _id: string;
  client: IJobClient;
  title: string;
  description: string;
  category: string;
  skills: string[];
  budgetType: JobBudgetType;
  budgetMin: number;
  budgetMax: number;
  deadline: string;
  status: JobStatus;
 applicationsCount:number;
  createdAt: string;
  updatedAt: string;
}
export type ServerValidationError = {
  path: (string | number)[];
  message: string;
};
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
export interface IUpdateJobRequest extends Partial<ICreateJobRequest> {}
export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface IJobbApiResponseWithCursor<T> {
  success: boolean;
  message: string;
  data: {
    results:T,
    hasMore:boolean;
    nextCursor:string | null;
  };
}

export interface UpdateJobFormProps {
  job: IJob;
   
  onCancel: () => void;
  onUpdated?: () => void;
}