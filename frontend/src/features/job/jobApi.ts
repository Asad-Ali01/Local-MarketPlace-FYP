import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from '@/api/baseQuery';

import type { IApiResponse, ICreateJobRequest, IJob, IJobbApiResponseWithCursor, IUpdateJobRequest } from '@/types/job.types';

export const jobApi = createApi({
  reducerPath: 'jobApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Job'],

  endpoints: (builder) => ({
    createJobApi: builder.mutation<IApiResponse<IJob>, ICreateJobRequest>({
      query: (jobData) => ({
        url: '/jobs',
        method: 'POST',
        body: jobData,
      }),

      invalidatesTags: [{ type: 'Job', id: 'MY_JOBS' }],
    }),
    getOpenJobsApi: builder.query<
      IJobbApiResponseWithCursor<IJob[]>,
      {
        limit?: number;
        cursor?: string;
      }
    >({
      query: ({ limit = 10, cursor } = {}) => ({
        url: '/jobs/open',
        method: 'GET',
        params: { limit, cursor },
      }),
      providesTags: [{ type: 'Job', id: 'OPEN_JOBS' }],
    }),
    getJobByIdApi: builder.query<IApiResponse<IJob>, string>({
      query: (jobId) => ({
        url: `/jobs/${jobId}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, jobId) => [{ type: 'Job', id: jobId }],
    }),
    updateJobApi: builder.mutation<
      IApiResponse<IJob>,
      { jobId: string; jobData: IUpdateJobRequest }
    >({
      query: ({ jobId, jobData }) => ({
        url: `/jobs/update-job/${jobId}`,
        method: 'PATCH',
        body: jobData,
      }),
      invalidatesTags: (_result, _error, { jobId }) => [
        { type: 'Job', id: jobId },
        { type: 'Job', id: 'OPEN_JOBS' },
        { type: 'Job', id: 'MY_JOBS' },
      ],
    }),
    getMyJobsApi: builder.query<IJobbApiResponseWithCursor<IJob[]>, void>({
      query: () => ({
        url: '/jobs/mine',
        method: 'GET',
      }),
      providesTags: (result) => [
        { type: 'Job', id: 'MY_JOBS' },
      
      ],
    }),
  }),
});

export const {
  useCreateJobApiMutation,
  useGetOpenJobsApiQuery,
  useGetJobByIdApiQuery,
  useUpdateJobApiMutation,
  useGetMyJobsApiQuery
} = jobApi;
