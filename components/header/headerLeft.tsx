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
// import { setView } from "@/redux/calender/viewSlice";

import { RootState } from "@/redux/store";
import dayjs from "dayjs";

export default function HeaderLeft() {
  const todaysDate = dayjs();
   const dispatch = useAppDispatch();
  const {userSelectedDate,userSelectedMonthIndex} = useAppSelector((state:RootState)=>state.date)
  
  const selectedView = useAppSelector((state:RootState)=>state.view.selectedView)

  const handleTodayClick = () => {
    switch (selectedView) {
      case "month":
        setMonth(dayjs().month());
        break;
      case "week":
        setDate(todaysDate);
        break;
      case "day":
        setDate(todaysDate);
        setMonth(dayjs().month());
        break;
      default:
        break;
    }
  };

  const handlePrevClick = () => {
    switch (selectedView) {
      case "month":
        setMonth(userSelectedMonthIndex - 1);
        break;
      case "week":
        setDate(userSelectedDate.subtract(1, "week"));
        break;
      case "day":
        setDate(userSelectedDate.subtract(1, "day"));
        break;
      default:
        break;
    }
  };

  const handleNextClick = () => {
    switch (selectedView) {
      case "month":
        setMonth(userSelectedMonthIndex + 1);
        break;
      case "week":
        setDate(userSelectedDate.add(1, "week"));
        break;
      case "day":
        setDate(userSelectedDate.add(1, "day"));
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

      {/* Current Month and Year Display */}
      <h1 className="hidden text-xl lg:block">
        {dayjs(new Date(dayjs().year(), userSelectedMonthIndex)).format(
          "MMMM YYYY",
        )}
      </h1>
    </div>
  );
}
