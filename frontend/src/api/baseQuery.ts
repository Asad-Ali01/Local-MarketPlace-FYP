import {fetchBaseQuery, type BaseQueryApi, type FetchBaseQueryError} from "@reduxjs/toolkit/query/react"
import type{ RootState } from "../app/store";
import type { IUser } from "../features/auth/types";
import { logoutUser, registerUser } from "../features/auth/authSlice";

const baseURL = import.meta.env.VITE_BASE_URL;
const rawBaseQuery = fetchBaseQuery({
    baseUrl:baseURL,
    credentials:"include",
    prepareHeaders:(headers, {getState}) => {
        const token = (getState() as RootState).auth.accessToken;
        if(token){
            headers.set("Authorization",`Bearer ${token}`);
        }
        return headers;
    },
})

type BaseQueryFn<Args=any,DefinitionExtraOptions={},Result=unknown,Error=unknown> = (args:Args,api:BaseQueryApi,extraOptions:DefinitionExtraOptions) => Promise<{data:Result} | {error:Error}>

export const baseQueryWithReauth:BaseQueryFn<
Parameters<typeof rawBaseQuery>[0],
{},
any,
FetchBaseQueryError
> = async (args,api,extraOptions) => {
    let result = await rawBaseQuery(args,api,extraOptions);
    if((result.error as FetchBaseQueryError)?.status  === 401){

        const refreshResult = await rawBaseQuery(
            {
                url:"/users/refresh-token",
                method:"POST"
            },
            api,
            extraOptions
        )

        if(refreshResult.data){

            const data = refreshResult.data as {
                data:{
                    user:IUser,
                    accessToken:string
                }
            }

            api.dispatch(registerUser({user:data.data.user,accessToken:data.data.accessToken}));

            result = await rawBaseQuery(args,api,extraOptions)
        }else{
        api.dispatch(logoutUser());
        // api.dispatch(authApi)
    }

    }
    return result;
} 