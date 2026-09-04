import { store } from "@/app/store";
import { baseURL } from "@/config/env"
import { registerUser } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/hooks/useAppDispatchSelector";
import type { IUser } from "@/types/global.types";

export const refreshAccessToken = async() => {
    const response = await fetch(`${baseURL}/auth/refresh-token`,{
        method:"POST",
        credentials:"include",
    })
    const data = (await response.json()) as {
        data: {
            user: IUser;
            accessToken: string;
        };
    };
    console.log("Here is data: ",data);
    store.dispatch(registerUser({user:data.data.user,accessToken:data.data.accessToken}))
    return data;
}