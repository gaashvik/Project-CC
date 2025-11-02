import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import dayjs, { Dayjs } from "dayjs";
import { getMonth } from "@/lib/getTime";
import { Playball } from "next/font/google";

type DateState = {
    userSelectedDate:Dayjs;
    userSelectedMonthIndex:number;
    twoDMonthArray:Dayjs[][];
}

const initialState:DateState={
    userSelectedDate:dayjs(),
    userSelectedMonthIndex:dayjs().month(),
    twoDMonthArray:getMonth()
}

const DateSlice = createSlice({
    name:"date",
    initialState,
    reducers:{
        setDate:(state,action:PayloadAction<Dayjs>)=>{
            state.userSelectedDate = action.payload;
        },
        setMonth:(state,action:PayloadAction<number>)=>{
            state.twoDMonthArray = getMonth(action.payload);
            state.userSelectedMonthIndex=action.payload;
        }
    }
})

export const {setDate,setMonth}=DateSlice.actions;

export default DateSlice.reducer;
