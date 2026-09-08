import { baseQueryWithReauth } from '@/api/baseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';
import type {
  ICreateGigResponse,
  IGetAllMyGigsResponse,
  IGetGigDetailsById,
  IGetLocationSuggestionsResponse,
  IGetMyGigDetailsResponse,
  IGig,
  IProviderDashboardTopCardResponse,
  IProviderGetAllGigsByCategoryResponse,
} from '../../types/gig.types';

export const gigApi = createApi({
  reducerPath: 'gigApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['gigs'],
  endpoints: (builder) => ({
    getMyGigsApi: builder.query<IGetMyGigDetailsResponse, void>({
      query: () => ({
        url: '/gig',
        method: 'GET',
      }),
      providesTags: [
        {
          type: 'gigs',
          id: 'LIST',
        },
      ],
    }),
    createGigApi: builder.mutation<ICreateGigResponse, FormData>({
      query: (data) => ({
        url: '/gig',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [
        {
          type: 'gigs',
          id: 'LIST',
        },
      ],
    }),

    providerDashboardTopCard: builder.query<IProviderDashboardTopCardResponse, string>({
      query: (providerId) => ({
        url: `gig/dashboard/${providerId}`,
        method: 'GET',
      }),
    }),
    getAllGigsByCategory: builder.query<IProviderGetAllGigsByCategoryResponse, string>({
      query: (slug) => ({
        url: `gig/category/${slug}`,
        method: 'GET',
      }),
    }),
    getAllMyGigs: builder.query<IGetAllMyGigsResponse, string>({
      query: (providerId) => ({
        url: `/gig/provider/${providerId}`,
        method: 'GET',
      }),
      providesTags: [{ type: 'gigs', id: 'LIST' }],
    }),
    deleteGig: builder.mutation({
      query: (gigId) => ({
        url: `/gig/${gigId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        {
          type: 'gigs',
          id: 'LIST',
        },
      ],
    }),
    gigDetailsByGigId: builder.query<IGetGigDetailsById, string>({
      query: (gigId) => ({
        url: `/gig/details/${gigId}`,
        method: 'GET',
      }),
    }),
    getLocationSuggestions: builder.query<IGetLocationSuggestionsResponse, string>({
      query: (q) => ({
        url: `/gig/location/search?q=${q}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetMyGigsApiQuery,
  useCreateGigApiMutation,
  useProviderDashboardTopCardQuery,
  useGetAllGigsByCategoryQuery,
  useGetAllMyGigsQuery,
  useDeleteGigMutation,
  useGigDetailsByGigIdQuery,
  useLazyGetLocationSuggestionsQuery,
} = gigApi;
