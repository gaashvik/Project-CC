"use client"

import { getWeeks } from "@/lib/getTime";
// import { useDateStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setMonth,setDate } from "@/redux/calender/dateSlice";
import dayjs from "dayjs";
import React, { Fragment, useEffect } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { RootState } from "@/redux/store";
import nextConfig from "@/next.config";

export default function SideBarCalendar() {
    const dispatch = useAppDispatch();
  const {userSelectedDate,userSelectedMonthIndex,twoDMonthArray} = useAppSelector((state:RootState)=>state.date)

  const weeksOfMonth = getWeeks(userSelectedMonthIndex);

  const handleNextClick=()=>{
    const nextMonthIndex = userSelectedMonthIndex+1;
    dispatch(setMonth(nextMonthIndex));
    dispatch(setDate(dayjs(new Date(dayjs().year(), nextMonthIndex)).startOf("month")));
  }
  const handlePrevClick=()=>{
    const prevMonthIndex = userSelectedMonthIndex-1;
    dispatch(setMonth(userSelectedMonthIndex - 1));
    dispatch(setDate(dayjs(new Date(dayjs().year(), prevMonthIndex)).startOf("month")));
  }

//   useEffect(()=>{
//     console.log(userSelectedDate.toDate());
//   },[userSelectedDate]);

  return (
    <div className="my-6 p-2">
      <div className="flex items-center justify-between">
        <h4 className="text-sm">
          {dayjs(new Date(dayjs().year(), userSelectedMonthIndex)).format(
            "MMMM YYYY",
          )}
        </h4>
        <div className="flex items-center gap-3">
          <MdKeyboardArrowLeft
            className="size-5 cursor-pointer font-bold"
            onClick={handlePrevClick}
          />
          <MdKeyboardArrowRight
            className="size-5 cursor-pointer font-bold"
            onClick={handleNextClick}
          />
        </div>
      </div>

      {/* Header Row: Days of the Week */}
      <div className="mt-2 grid grid-cols-[auto_1fr]">
        <div className="w-6"></div>
        <div className="grid grid-cols-7 text-xs">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
            <span key={i} className="py-1 text-center">
              {day}
            </span>
          ))}
        </div>
      </div>

      {/* Main Content: Weeks and Days */}
      <div className="mt-2 grid grid-cols-[auto_1fr] text-xs">
        {/* Week Number  column */}
        <div className="grid w-6 grid-rows-5 gap-1 gap-y-3 rounded-sm bg-gray-100 p-1">
          {weeksOfMonth.map((week, i) => (
            <span key={i} className="flex h-5 w-5 items-center justify-center">
              {week}
            </span>
          ))}
        </div>

        {/* Dates grid */}

        <div className="grid grid-cols-7 grid-rows-5 gap-1 gap-y-3 rounded-sm p-1 text-xs">
          {twoDMonthArray.map((row, i) => (
            <Fragment key={i}>
              {row.map((day, index) => (
                <button
                  key={index}
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full",
                    day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") &&
                      "bg-blue-600 text-white",
                      (day.format("DD-MM-YY") === userSelectedDate.format("DD-MM-YY") && dayjs().format("DD-MM-YY") != userSelectedDate.format("DD-MM-YY")) && "bg-blue-300 text-white",
                  )}
                >
                  <span>{day.format("D")}</span>
                </button>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
