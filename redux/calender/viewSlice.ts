import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import path from "path";
import { act } from "react";


type ViewState={
    selectedView:string;
}

const initialState: ViewState = {
  selectedView: "month",
};

const viewSlice = createSlice({
    name:"view",
    initialState,
    reducers:{
        setView:(state,action: PayloadAction<string>)=>{
            state.selectedView=action.payload;
        }
    }
});

export const { setView } = viewSlice.actions;
export default viewSlice.reducer;