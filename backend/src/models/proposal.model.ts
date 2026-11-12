import mongoose, { Schema, Document, Types } from "mongoose";

export enum ProposalStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  WITHDRAWN = "WITHDRAWN",
}
export enum ProposalBudgetType {
  FIXED = "fixed",
  HOURLY = "hourly",
}
export interface IProposal extends Document {
  job: Types.ObjectId;
  provider: Types.ObjectId;
  coverLetter: string;
  budgetType: ProposalBudgetType;
  proposedBudget: number;
  estimatedDuration: string;
  status: ProposalStatus;
  createdAt: Date;
  updatedAt: Date;
} 

const proposalSchema = new Schema<IProposal>(
  {
    job: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    provider: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    coverLetter: {
      type: String,
      required: true,
      trim: true,
      minlength: 30,
      maxlength: 3000,
    },

    proposedBudget: {
      type: Number,
      required: true,
      min: 1,
    },

    estimatedDuration: {
      type: String,
      required: true,
      trim: true,
    },
    budgetType: {
      type: String,
      enum: Object.values(ProposalBudgetType),
     required:true,

    },
    status: {
      type: String,
      enum: Object.values(ProposalStatus),
      default: ProposalStatus.PENDING,
    },
  },
  {
    timestamps: true,
  },
);

// A provider can submit only one proposal per job.
proposalSchema.index({ job: 1, provider: 1 }, { unique: true });
proposalSchema.index({ createdAt: -1 });
const Proposal = mongoose.model<IProposal>("Proposal", proposalSchema);

export default Proposal;
