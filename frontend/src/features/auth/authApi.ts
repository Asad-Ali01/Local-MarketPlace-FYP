import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../api/baseQuery";
import type { ILoginUserRequest, ILoginUserResponse, IResetPassword } from "./types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // Register User Api
    registerUserApi: builder.mutation<{ message: string }, FormData>({
      query: (data) => ({
        url: "/users/register",
        method: "POST",
        body: data,
      }),
    }),

    // Login User Api
    loginUserApi: builder.mutation<ILoginUserResponse, ILoginUserRequest>({
      query: (data) => ({
        url: "/users/login",
        method: "POST",
        body: data,
      }),
    }),
    logoutApi: builder.mutation<{}, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    resetPasswordApi: builder.mutation<{},IResetPassword>({
        query: (data) => ({
          url:"/auth/reset-password",
          method:"POST",
          body:data
        })
    })
  }),
});

export const { useRegisterUserApiMutation, useLoginUserApiMutation,useLogoutApiMutation,useResetPasswordApiMutation } = authApi;
