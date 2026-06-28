import { baseQueryWithReauth } from "@/api/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { IOtpPasswordResetRequest, IOtpVerifyRequest, IOtpVerifyResponse } from "./types";


export const otpApi = createApi({
  reducerPath: "otpApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    otpSendApi: builder.mutation<{message:string},{email:string | null | undefined}>({
      query: ({ email }) => ({
        url: `/otp/otp-send/${email}`,
        method: "POST",
      }),
    }),
    otpVerifyApi: builder.mutation<IOtpVerifyResponse,IOtpVerifyRequest>({
      query: ({email,otp}) => ({
        url:'/otp/otp-verify',
        method:"POST",
        body:{email,otp}      
    }),
        }),
      otpPasswordResetApi: builder.mutation<{},IOtpPasswordResetRequest>({
        query:({resetToken,newPassword,confirmPassword}) => ({
          url: '/otp/reset-password',
          method:"POST",
          body:{
            newPassword,confirmPassword
          },
          headers:{
            Authorization: `Bearer ${resetToken}`
          }
        })
      })
  }),
});

export const {useOtpSendApiMutation,useOtpVerifyApiMutation,useOtpPasswordResetApiMutation} = otpApi