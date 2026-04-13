import {createSlice, type PayloadAction} from '@reduxjs/toolkit'
import type { IAuth, IUpdateUser } from './types'
import type{ IUser } from '@/types/global.types'

const initialState:IAuth = {
    user:null,
    accessToken:null,
    isAuthenticated:false
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        registerUser:(state,action:PayloadAction<{user:IUser,accessToken:string}>) => {
            state.user = action.payload.user;
        },
        loginUser:(state,action:PayloadAction<{user:IUser,accessToken:string}>) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.isAuthenticated = true;
        },
        logoutUser: (state) => {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
        },
        updateUser: (state,action:PayloadAction<{updateUserValues:IUpdateUser}>) => {
            if(state.user){
                state.user = {
                ...state.user,
                name: action.payload.updateUserValues.name ?? state.user.name,
                avatar: action.payload.updateUserValues.avatar?.url && action.payload.updateUserValues.avatar?.public_id ?
                {
                    url: action.payload.updateUserValues.avatar?.url,
                    public_id: action.payload.updateUserValues.avatar?.public_id 
                } : state.user.avatar
            }
            }
            
        }
    }
})

export const {registerUser,loginUser,updateUser,logoutUser} = authSlice.actions

export default authSlice.reducer;