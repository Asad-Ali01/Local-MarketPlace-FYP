import { baseQueryWithReauth } from "@/api/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { IGetGigDetailsResponse } from "./types";

export const gigApi = createApi({
    reducerPath:"gigApi",
    baseQuery:baseQueryWithReauth,
    endpoints:(builder) => ({
        getMyGigsApi:builder.query<IGetGigDetailsResponse,void>({
            query: () => ({
                url:'/gig',
                method:"GET"
            })
        })
    })
})


export const {useGetMyGigsApiQuery} = gigApi;