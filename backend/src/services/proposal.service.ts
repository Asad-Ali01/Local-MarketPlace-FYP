import mongoose, { Types } from "mongoose";
import Proposal, { ProposalBudgetType } from "../models/proposal.model";
import { Job } from "../models/job.model";
import { ApiError } from "../utils/ApiError";

interface CreateProposalInput {
  jobId: string;
  providerId: string;
  coverLetter: string;
  budgetType: ProposalBudgetType;
  proposedBudget: number;
  estimatedDuration: string;
}

export const createProposalService = async ({
  jobId,
  providerId,
  coverLetter,
  budgetType,
  proposedBudget,
  estimatedDuration,
}: CreateProposalInput) => {
  const session = await mongoose.startSession();

  try {
    const createdProposal = await session.withTransaction(async () => {
      //  Find the job
      const job = await Job.findById(jobId).session(session);

      if (!job) {
        throw new ApiError(404, "Job not found");
      }

      // Check whether the job is open
      if (job.status !== "open") {
        throw new ApiError(400, "This job is no longer accepting proposals");
      }

      // 3. Prevent the client from applying to their own job
      if (job.client.toString() === providerId) {
        throw new ApiError(403, "You cannot apply to your own job");
      }

      // . Check for an existing proposal
      const existingProposal = await Proposal.findOne({
        job: jobId,
        provider: providerId,
      }).session(session);

      if (existingProposal) {
        throw new ApiError(409, "You have already submitted a proposal");
      }

      //  Create proposal
      const [proposal] = await Proposal.create(
        [
          {
            job: jobId,
            provider: providerId,
            coverLetter,
            budgetType,
            proposedBudget,
            estimatedDuration,
          },
        ],
        { session },
      );

      //  Increment application count
      const updatedJob = await Job.findOneAndUpdate(
        {
          _id: jobId,
          status: "open",
        },
        {
          $inc: { applicationsCount: 1 },
        },
        {
          returnDocument: "after",
          session,
        },
      );

      if (!updatedJob) {
        throw new ApiError(400, "Job is no longer accepting proposals");
      }

      return proposal;
    });

    return createdProposal;
  } catch (error: any) {
    // Handle duplicate requests, including concurrent requests
    if (error.code === 11000) {
      throw new ApiError(409, "You have already submitted a proposal");
    }

    throw error;
  } finally {
    await session.endSession();
  }
};

export const getMyProposalsService = async (providerId: Types.ObjectId) => {
  const proposals = await Proposal.find({
    provider: providerId,
  })
    .populate({
      path: "job",
      select: "title status budgetType budgetMin budgetMax",
    })
    .sort({ createdAt: -1 })
    .lean();

  return proposals;
};

export const withdrawProposalService = async (
  proposalId: string,
  providerId: Types.ObjectId
) => {
  if (!proposalId) {
    throw new ApiError(400, "Proposal ID is required");
  }

  const proposal = await Proposal.findOneAndUpdate(
    {
      _id: proposalId,
      provider: providerId,
      status: "PENDING",
    },
    {
      $set: {
        status: "WITHDRAWN",
      },
    },
    {
      returnDocument: "after",
    }
  );

  if (!proposal) {
    throw new ApiError(
      404,
      "Proposal not found or it cannot be withdrawn"
    );
  }

  return {};
};


export const getSingleProposalService = async (
  proposalId: string,
  providerId: Types.ObjectId
) => {
  if (!mongoose.isValidObjectId(proposalId)) {
    throw new ApiError(400, "Invalid proposal ID");
  }

  const proposal = await Proposal.findOne({
    _id: proposalId,
    provider: providerId,
  }).populate("job");

  if (!proposal) {
    throw new ApiError(404, "Proposal not found");
  }

  return proposal;
};