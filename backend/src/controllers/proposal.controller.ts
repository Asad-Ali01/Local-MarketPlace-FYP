
import { Request, Response } from "express";
import { createProposalService, getMyProposalsService, getSingleProposalService, withdrawProposalService } from "../services/proposal.service";
import { asyncHandler } from "../utils/asynHandler";
import { ApiResponse } from "../utils/ApiRespose";

export const createProposalController = asyncHandler(
  async (req: Request<{ jobId: string }>, res: Response) => {
    const { jobId } = req.params;

    const {
      coverLetter,
      budgetType,
      proposedBudget,
      estimatedDuration,
    } = req.body;

    const providerId = req.user._id.toString();

    const proposal = await createProposalService({
      jobId,
      providerId,
      coverLetter,
      budgetType,
      proposedBudget,
      estimatedDuration,
    });

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          proposal,
          "Proposal submitted successfully"
        )
      );
  }
);




export const getMyProposalsController = asyncHandler(
  async (req: Request, res: Response) => {
    const providerId = req.user._id;

    const proposals = await getMyProposalsService(providerId);

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          proposals,
          "Your proposals retrieved successfully"
        )
      );
  }
);

export const withdrawProposalController = asyncHandler(
  async (
    req: Request<{ proposalId: string }>,
    res: Response
  ) => {
    const { proposalId } = req.params;

    const providerId = req.user._id;

    await withdrawProposalService(
      proposalId,
      providerId
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        {},
        "Proposal withdrawn successfully"
      )
    );
  }
);

export const getSingleProposalController = asyncHandler(
  async (
    req: Request<{ proposalId: string }>,
    res: Response
  ) => {
    const { proposalId } = req.params;

    const providerId = req.user._id;

    const proposal = await getSingleProposalService(
      proposalId,
      providerId
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        proposal,
        "Proposal fetched successfully"
      )
    );
  }
);