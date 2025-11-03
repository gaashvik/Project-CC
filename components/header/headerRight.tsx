"use client";

import { useState, useRef, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RootState } from "@/redux/store";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setView } from "@/redux/calender/viewSlice";
import { useUser } from "@auth0/nextjs-auth0";
import { LogOut, User, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeaderRight() {
  const user = useUser();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const selectedView = useAppSelector((state: RootState) => state.view.selectedView);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    router.push("/auth/logout");
  };

  return (
    <div className="flex items-center space-x-4">
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

      <div className="relative" ref={dropdownRef}>
        <Avatar
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <AvatarImage src={user.user?.picture} />
          <AvatarFallback>{user.user?.name?.charAt(0) || "CN"}</AvatarFallback>
        </Avatar>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">

            {/* Logout */}
            <div className="border-t border-gray-200 py-1">
              <button
                className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
