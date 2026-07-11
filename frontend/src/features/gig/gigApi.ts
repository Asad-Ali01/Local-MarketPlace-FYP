import { baseQueryWithReauth } from "@/api/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { ICreateGigResponse, IGetGigDetailsResponse, IProviderDashboardTopCardRequest, IProviderDashboardTopCardResponse } from "./types";

export const gigApi = createApi({
    reducerPath:"gigApi",
    baseQuery:baseQueryWithReauth,
    tagTypes:["gigs"],
    endpoints:(builder) => ({
        getMyGigsApi:builder.query<IGetGigDetailsResponse,void>({
            query: () => ({
                url:'/gig',
                method:"GET"
            }),
            providesTags:[
                {
                    type:"gigs"
                }
            ],
            
        }),
        createGigApi: builder.mutation<ICreateGigResponse,FormData>({
            query: (data) => ({
                url:'/gig',
                method:"POST",
                body:data
            }),
            invalidatesTags:[{
                type:"gigs"
            }]
        }),

        providerDashboardTopCard: builder.query<IProviderDashboardTopCardResponse,string>({
            query:(providerId) => ({
                url:`gig/${providerId}`,
                method:"GET"
            })

        })
    })
})


export const {useGetMyGigsApiQuery,useCreateGigApiMutation,useProviderDashboardTopCardQuery} = gigApi;