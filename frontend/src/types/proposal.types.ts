import type { IJob } from "./job.types";

export type ProposalStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "WITHDRAWN";

export interface ICreateProposalRequest {
  coverLetter: string;
  proposedBudget: number;
  estimatedDuration: string;
}

export interface IProposal {
  _id: string;
  job: string;
  provider: string;
  coverLetter: string;
  proposedBudget: number;
  budgetType:"fixed" | "hourly";
  estimatedDuration: string;
  status: ProposalStatus;
  createdAt: string;
  updatedAt: string;
}
export const JobStatus = {
  OPEN: "open",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;
type JobStatus = typeof JobStatus[keyof typeof JobStatus]
export interface IPopulatedJob {
  _id: string;
  title: string;
  status: JobStatus;
  budgetType: "fixed" | "hourly";
  budgetMin: number;
  budgetMax: number;
}

export interface IGetAllMyProposal
  extends Omit<IProposal, "job"> {
  job: IPopulatedJob;
}


export interface IGetSingleProposal extends Omit<IProposal, "job"> {
  job: IJob;
}

// Full job information returned by the backend
export interface IFullPopulatedJob {
  _id: string;
  title: string;
  description: string;
  status: JobStatus;
  budgetType: "fixed" | "hourly";
  budgetMin: number;
  budgetMax: number;
}
