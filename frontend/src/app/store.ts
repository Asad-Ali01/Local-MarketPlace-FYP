import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE,persistReducer,persistStore} from 'redux-persist'
import { authApi } from "@/features/auth/authApi";
import { adminApi } from "@/features/admin/adminApi";
import { otpApi } from "@/features/otp/otpApi";
import { gigApi } from "@/features/gig/gigApi";
const storage = {
  getItem:(key:string) => {
    return Promise.resolve(localStorage.getItem(key))
  },
  setItem: (key:string,value:any) => {
    localStorage.setItem(key,value)
   return Promise.resolve(true)
  },
  removeItem:(key:string) => {
    localStorage.removeItem(key)
   return Promise.resolve();
  }
}
const authPersistantConfig = {
    key:"auth",
    storage:storage,
    whitelist: ["user","isAuthenticated"]
}
const rootReducer = combineReducers({
    auth: persistReducer(authPersistantConfig,authReducer),
    [authApi.reducerPath]:authApi.reducer,
    [adminApi.reducerPath]:adminApi.reducer,
    [otpApi.reducerPath]:otpApi.reducer,
    [gigApi.reducerPath]:gigApi.reducer

})

export const store = configureStore({
    reducer: rootReducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:{
            ignoredActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]
        }
    }).concat(authApi.middleware).concat(adminApi.middleware).concat(otpApi.middleware).concat(gigApi.middleware)
})


export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 