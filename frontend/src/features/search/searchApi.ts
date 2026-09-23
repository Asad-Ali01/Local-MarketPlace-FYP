import { baseQueryWithReauth } from "@/api/baseQuery";
import type { IGig } from "@/types/gig.types";
import type { IGetSearchGigs } from "@/types/searchApi.types";
import { createApi } from "@reduxjs/toolkit/query/react";

export  const searchApi = createApi({
    reducerPath:"searchApi",
    baseQuery:baseQueryWithReauth,
    endpoints:(builder) => ({
        searchServices:builder.query({
            query:(q) => ({
                url:`/search?q=${q}`,
                method:"GET"
            })
        }),
        getSearchGigsWithCursor:builder.query<IGetSearchGigs,{limit:number;cursor?:{createdAt:string;_id:string;}}>({
            query:({limit,cursor}) => ({
                url:`/search/getGigs?limit=${limit}&cursor=${
                    cursor ? encodeURIComponent(JSON.stringify(cursor)) : ""
                }`
            })
        })
    })
})

export const {useSearchServicesQuery,useGetSearchGigsWithCursorQuery} = searchApi