import { baseQueryWithReauth } from "@/api/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { IGetAllCategories } from "../admin/types";
import type { IGetAllCategoriesHome } from "./types";

export const homeApi = createApi({
    reducerPath:"homeapi",
    baseQuery:baseQueryWithReauth,
    endpoints:(builder) => ({
        getAllCategoriesForHomePage: builder.query<IGetAllCategoriesHome,void>({
            query: () => ({
                url:"/users/categories",
                method:"GET"
            })
        })
    })
})

export const {useGetAllCategoriesForHomePageQuery} = homeApi