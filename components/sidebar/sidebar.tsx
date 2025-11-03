import { cn } from "@/lib/utils";
import React from "react";
import SideBarCalendar from "./mySidebarCalender";
// import { useToggleSideBarStore } from "@/lib/store";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import Create from "./create"
import Search from "./search"

export default function SideBar() {

  const { isOpen } = useAppSelector((state:RootState)=>state.sidebar);
  return (
    <aside
      className={cn(
        "w-92 hidden border-t px-2 py-3 transition-all duration-300 ease-in-out lg:block",
        !isOpen && "lg:hidden",
      )}
    >
      <Create/>
      <SideBarCalendar />
      <Search/>
    </aside>
  );
}
