"use client"

import React from "react"
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import MonthView from "./Month/monthView";
import DayView from "./dayView";
import WeekView from "./weekVIew";


export default function MainView(){
    const selectedView = useAppSelector((state:RootState)=>state.view.selectedView)
    switch (selectedView){
        case "month":{
            return <MonthView/>
        }
        case "day":{
            return <DayView/>
        }
        case "week":{
            return <WeekView/>
        }
        default:{
            return <MonthView/>
        }
    }
}