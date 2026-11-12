import { jobApi } from '@/features/job/jobApi';

import type { IApiResponse } from '@/types/job.types';
import type { ICreateProposalRequest, IGetAllMyProposal, IGetSingleProposal, IProposal } from '@/types/proposal.types';

interface ISubmitProposalArgs {
  jobId: string;
  data: ICreateProposalRequest;
}

export const proposalApi = jobApi.injectEndpoints({
  endpoints: (builder) => ({
    // Submit a proposal
    submitProposal: builder.mutation<IApiResponse<IProposal>, ISubmitProposalArgs>({
      query: ({ jobId, data }) => ({
        url: `/proposals/${jobId}`,
        method: 'POST',
        body: data,
      }),

      invalidatesTags: [{ type: 'Job', id: 'MY_PROPOSALS' }],
    }),

    // Get all proposals submitted by the logged-in provider
    getMyProposals: builder.query<IApiResponse<IGetAllMyProposal[]>, void>({
      query: () => ({
        url: '/proposals/mine',
        method: 'GET',
      }),

      providesTags: [{ type: 'Job', id: 'MY_PROPOSALS' }],
    }),
    withdrawProposal: builder.mutation<void, string>({
      query: (proposalId) => ({
        url: `/proposals/${proposalId}/withdraw`,
        method: 'PATCH',
      }),
      invalidatesTags: [{ type: 'Job', id: 'MY_PROPOSALS' }],
    }),

    getSingleProposal: builder.query<IApiResponse<IGetSingleProposal>, string>({
      query: (proposalId) => ({
        url: `/proposals/${proposalId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useSubmitProposalMutation, useGetMyProposalsQuery, useWithdrawProposalMutation,useGetSingleProposalQuery } =
  proposalApi;
