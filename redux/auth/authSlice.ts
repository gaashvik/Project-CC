import { createSlice } from '@reduxjs/toolkit'
import { error } from 'console'
import { stat } from 'fs';
import { act } from 'react';
import {User, AuthResponse} from "../types/user"

type UserState = {
  user: User | null;
  token: string | null;
  loading:boolean;
  error: string | null;
  isAuthenticated:boolean;
};


const initialState:UserState = {
    user:null,
    token:null,
    loading:false,
    error:null,
    isAuthenticated:false
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        loginStart:(state)=>{
            state.loading=true;
            state.error=null;
        },
        loginSuccess:(state,action)=>{
            const {user,token} = action.payload
            state.loading=false;
            state.user=user;
            state.token=token;
            state.isAuthenticated=true;
        },
        loginFailure:(state,action)=>{
            const {error} = action.payload;
            state.loading = false;
            state.error = error;
            state.isAuthenticated=false;
            state.user=null;
            state.token=null;
        },
        setUser:(state,action)=>{
            const {user} = action.payload;
            state.user = user;
        },
        logout:(state)=>{
            state.user=null;
            state.token=null;
            state.isAuthenticated=false;
        }
    }
});

export const { loginStart, loginSuccess, loginFailure, setUser, logout } =
  authSlice.actions;

export default authSlice.reducer;
