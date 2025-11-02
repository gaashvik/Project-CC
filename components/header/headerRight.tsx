"use client";


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RootState } from "@/redux/store";
// import { useViewStore } from "@/lib/store";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { useAppDispatch,useAppSelector } from "@/redux/hooks";
import { setView } from "@/redux/calender/viewSlice";
import { useUser } from "@auth0/nextjs-auth0";

export default function HeaderRight() {
    const user = useUser();
    const dispatch = useAppDispatch();
    const selectedView = useAppSelector((state:RootState)=>state.view.selectedView)

  return (
    <div className="flex items-center space-x-4">
    {/* <SearchComponent /> */}
    <Select onValueChange={(v) => dispatch(setView(v))}>
      <SelectTrigger className="w-24 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0">
        <SelectValue placeholder="Month" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="month">Month</SelectItem>
        <SelectItem value="week">Week</SelectItem>
        <SelectItem value="day">Day</SelectItem>
      </SelectContent>
    </Select>

    <Avatar>
      <AvatarImage src={user.user?.picture} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  </div>
  )
}
