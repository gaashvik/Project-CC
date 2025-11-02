"use client";

import React from "react";
import { Menu } from "lucide-react";
import { Button } from "../ui/button"
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
// import { useDateStore, useToggleSideBarStore, useViewStore } from "@/lib/store";
import { useAppDispatch,useAppSelector } from "@/redux/hooks";
import {setDate,setMonth} from "../../redux/calender/dateSlice"
import { toggleSidebar } from "@/redux/calender/sidebarSlice";
import dayjs from "dayjs";
// import { setView } from "@/redux/calender/viewSlice";

import { RootState } from "@/redux/store";
// import dayjs from "dayjs";

export default function HeaderLeft() {
  const todaysDate = dayjs();
   const dispatch = useAppDispatch();
  const {userSelectedDate,userSelectedMonthIndex} = useAppSelector((state:RootState)=>state.date)
  
  const selectedView = useAppSelector((state:RootState)=>state.view.selectedView)

  const handleTodayClick = () => {
    switch (selectedView) {
      case "month":
        dispatch(setMonth(dayjs().month()));
        dispatch(setDate(todaysDate));
        break;
      case "week":
        dispatch(setDate(todaysDate));
         dispatch(setMonth(dayjs().month()));
        break;
      case "day":
        dispatch(setDate(todaysDate));
        dispatch(setMonth(dayjs().month()));
        break;
      default:
        break;
    }
  };

  const handlePrevClick = () => {
    switch (selectedView) {
      case "month":
        const newMonthIndex = userSelectedMonthIndex - 1
        dispatch(setMonth(newMonthIndex));
        dispatch(setDate(dayjs(new Date(dayjs().year(),newMonthIndex,1))));
        break;
      case "week":
        const original_month = userSelectedMonthIndex;
        const prev_date = userSelectedDate.subtract(1, "week");
        const prev_month = prev_date.month();
        dispatch(setDate(prev_date));
        if ((original_month)%12!=prev_month){
          dispatch(setMonth(original_month-1));
        }
        break;
      case "day":
        const original_month_day = userSelectedMonthIndex;
        const prev_date_by_day = userSelectedDate.subtract(1, "day");
        const prev_month_day = prev_date_by_day.month();
        dispatch(setDate(prev_date_by_day));
        if ((original_month_day)%12!=prev_month_day){
          dispatch(setMonth(original_month_day-1));
        }

        break;
      default:
        break;
    }
  };

  const handleNextClick = () => {
    switch (selectedView) {
      case "month":
        const newMonthIndex = userSelectedMonthIndex + 1
        dispatch(setMonth(newMonthIndex));
        dispatch(setDate(dayjs(new Date(dayjs().year(),newMonthIndex,1))));
        break;
      case "week":
        const original_month = userSelectedMonthIndex;
        const next_date = userSelectedDate.add(1, "week");
        const next_month = next_date.month();
        // console.log(next_date.toDate());
        dispatch(setDate(next_date));
        if ((original_month)%12!=next_month){
          dispatch(setMonth(original_month+1));
        }
        break;
      case "day":
        const original_month_day = userSelectedMonthIndex;
        const next_date_by_day = userSelectedDate.add(1, "week");
        const next_month_day = next_date_by_day.month();
        dispatch(setDate(userSelectedDate.add(1, "day")));
        if ((original_month_day)%12!=next_month_day){
          dispatch(setMonth(original_month_day+1));
        }

        break;
      default:
        break;
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* Sidebar Toggle and Calendar Icon */}
      <div className="hidden items-center lg:flex">
        <Button
          variant="ghost"
          className="rounded-full p-2"
          onClick={() => dispatch(toggleSidebar())}
        >
          <Menu className="size-6" />
        </Button>
        <Image
          src={`/img/calendar_${todaysDate.date().toString()}_2x.png`}
          width={40}
          height={40}
          alt="icon"
        />
        <h1 className="text-xl">Calendar</h1>
      </div>

      {/* Today Button */}
      <Button variant="outline" onClick={handleTodayClick}>
        Today
      </Button>

      {/* Navigation Controls */}
      <div className="flex items-center gap-3">
        <ChevronLeft
          className="size-6 cursor-pointer font-bold"
          onClick={handlePrevClick}
        />
        <ChevronRight
          className="size-6 cursor-pointer font-bold"
          onClick={handleNextClick}
        />
      </div>

      <h1 className="hidden text-xl lg:block">
        {dayjs(new Date(dayjs().year(), userSelectedMonthIndex)).format(
          "MMMM YYYY",
        )}
      </h1>
    </div>
  );
}
