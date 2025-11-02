import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { stat } from "fs";


type sidebarState = {
    isOpen:boolean;
}

const initialState:sidebarState={
    isOpen:true
}

const sidebarSlice = createSlice({
    name:"sidebar",
    initialState,
    reducers:{
        openSidebar:(state)=>{
            state.isOpen=true;
        },
        closeSideBar:(state)=>{
            state.isOpen=false;
        },
        toggleSidebar:(state)=>{
            state.isOpen=!state.isOpen;
        }
    }
})

export const {openSidebar,closeSideBar,toggleSidebar} = sidebarSlice.actions;

export default sidebarSlice.reducer;