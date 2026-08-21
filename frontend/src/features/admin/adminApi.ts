import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../api/baseQuery";
import type { IAdminAllUsersResponse,  IAdminStatsResponse, IAdminUserResponse, ICategoryResponse,IGetAllCategories,IGetAllSubCategories,ISubCategoryResponse  } from "../../types/admin.types";
import type { ILoginUserRequest, ILoginUserResponse } from "../../types/auth.types";

export const adminApi = createApi({
    reducerPath:"adminApi",
    baseQuery:baseQueryWithReauth,
    tagTypes:["Users","Category","SubCategory"],
    endpoints:(builder) => ({
          // Admin Login
        adminLoginApi: builder.mutation<ILoginUserResponse,ILoginUserRequest>({
            query:(data) => ({
                url:'/admin/login',
                method:"POST",
                body:data
            }),
        }),

        // Admin stats
        adminGetStatsApi: builder.mutation<IAdminStatsResponse,string>({
            query:(range="7d") => ({
                url:"/admin/stats",
                method:"POST",
                body:{range}
            }),

        }),
        adminAllUsersApi: builder.query<IAdminAllUsersResponse,{page:number;filterStatus:string;searchUser:string;}>({
            query: ({page,filterStatus,searchUser}) => ({
                url:'/admin/users',
                method:"GET",
                params:{
                    page,
                    limit:10,
                    filterStatus,
                    searchUser
                },
            }),
            providesTags:(result) => result ? [...result?.data.users.map((user) => ({
                type:"Users" as const,
                id:user._id
            })) ]:[{type:"Users" as const,id:"LIST"}]
        }),
        // Delete user
        adminDeleteUser: builder.mutation<{},{id:string}>({
            query:({id}) => ({
                url:`/admin/users/${id}`,
                method:"DELETE",
            }),
            invalidatesTags:(result,error,arg) => [
                { type:"Users", id:"LIST" },
                {  type:"Users", id:arg.id}
            ]
        }),
        adminGetUser: builder.query<IAdminUserResponse,string>({
            query:(userId) => ({
                url:`/admin/users/${userId}`,
                method:"GET",
            }),
        }),
        // Admin update usere
        adminUpdateUser:builder.mutation<IAdminUserResponse,{id:string,data:FormData}>({
            query:({id,data}) => ({
                url:`/admin/users/${id}`,
                method:"PATCH",
                body:data
            }),

            invalidatesTags:(result,error,arg) => [
                { type:"Users", id:arg.id},
                { type:"Users",id:"LIST"}
            ]
        }),
        // Admin Logout 



        // Create Category
        adminCreateCategoryApi: builder.mutation<ICategoryResponse,FormData>({
            query:(data) => ({
                url:"/admin/category",
                method:"POST",
                body:data
            }),
            invalidatesTags:[
               {
                    type:"Category",
                    id:"LIST"
                }
            ]
        }),
        adminCreateSubCategory: builder.mutation<ISubCategoryResponse,{name:string;category:string;}>({
            query:(data) => ({
                url:"/admin/sub-category",
                method:"POST",
                body:data
            }),
            invalidatesTags:[{
                type:"SubCategory",
                id:"LIST"
            }]
        }),
        adminGetAllCategories:builder.query<IGetAllCategories,void>({
            query:() => ({
                url:'/admin/category',
                method:"GET"
            }),
            providesTags:[
                {
                    type:"Category",
                    id:"LIST"
                }
            ]
        }),
         adminGetAllSubCategories:builder.query<IGetAllSubCategories,void>({
            query:() => ({
                url:'/admin/sub-category',
                method:"GET"
            }),
             providesTags:[
                {
                    type:"SubCategory",
                    id:"LIST"
                }
            ]
        }),
        adminDeleteCategory: builder.mutation<void,string>({
            query:(categoryId) => ({
                url:`/admin/category/${categoryId}`,
                method:"DELETE"
            }),
            invalidatesTags:[
                {
                    type:"Category",
                    id:"LIST"
                },
                {
                    type:"SubCategory",
                    id:"LIST"
                }
            ]
        }),
        adminDeleteSubCategory: builder.mutation<void,string>({
            query:(subCategoryId) => ({
                url:`/admin/sub-category/${subCategoryId}`,
                method:"DELETE"
            }),
             invalidatesTags:[
                {
                    type:"SubCategory",
                    id:"LIST"
                }
            ]
        }),
    })
})

export const {useAdminGetStatsApiMutation,useAdminAllUsersApiQuery,useAdminLoginApiMutation,useAdminDeleteUserMutation,useAdminGetUserQuery,useAdminUpdateUserMutation,useAdminCreateCategoryApiMutation,useAdminCreateSubCategoryMutation,useAdminGetAllCategoriesQuery,useAdminGetAllSubCategoriesQuery,useAdminDeleteCategoryMutation,useAdminDeleteSubCategoryMutation} = adminApi;