import { useSubmitProposalMutation } from "@/features/proposal/proposalApi";
import type { ICreateProposalRequest } from "@/types/proposal.types";

export const useSubmitProposal = () => {
  const [submitProposal, { isLoading, isSuccess, error, reset }] =
    useSubmitProposalMutation();

  const handleSubmit = async (
    jobId: string,
    data: ICreateProposalRequest
  ) => {
    return await submitProposal({ jobId, data }).unwrap();
  };

  return {
    handleSubmit,
    isLoading,
    isSuccess,
    error,
    reset,
  };
};