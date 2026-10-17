
import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from '@/api/baseQuery';

import type {
  IApiResponse,
  ICreateJobRequest,
  IJob,
} from '@/types/job.types';

export const jobApi = createApi({
  reducerPath: 'jobApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Job'],

  endpoints: (builder) => ({
    createJobApi: builder.mutation<
      IApiResponse<IJob>,
      ICreateJobRequest
    >({
      query: (jobData) => ({
        url: '/jobs',
        method: 'POST',
        body: jobData,
      }),

      invalidatesTags: [{ type: 'Job', id: 'MY_JOBS' }],
    }),
  }),
});

export const { useCreateJobApiMutation } = jobApi;