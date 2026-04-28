import type{ IUser } from "@/types/global.types";



// Auth state
export interface IAuth {
  user: IUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
}

// Update User
export interface IUpdateUser {
  name?: string;
  avatar?: {
    url: string;
    public_id: string;
  };
  password?: string;
}


// LoginUser Request
export interface ILoginUserRequest {
  email: string;
  password: string;
}
// LoginUser Response
export interface ILoginUserResponse  {
  data:{
    user: IUser;
    accessToken: string;
  }
  message:string;
}


