'use client'
import Image from "next/image";
import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closePopOver } from "@/redux/calender/eventSlice";
import Header from "@/components/header/header";
import SideBar from "@/components/sidebar/sidebar";
import MainView from "@/components/view/main";
import EventPopover from "@/components/event/popUp";
import { RootState } from "@/redux/store";
import { setEvents } from "@/redux/calender/eventSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const { user, isLoading, error } = useUser();
  const { isPopoverOpen } = useAppSelector((state: RootState) => state.event);
  const { userSelectedDate } = useAppSelector((state: RootState) => state.date);

  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, isLoading, router]);

  // Fetch events when user is authenticated
  useEffect(() => {
    if (user) {
      fetchEvents();
    }
  }, [user]);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }

      const data = await response.json();
      
      // Dispatch to your Redux store
      dispatch(setEvents(data.events || []));
      
    } catch (err) {
      console.error('Error fetching events:', err);

    }
  };

  const handlePopoverClose = () => {
    dispatch(closePopOver());
    fetchEvents(); 
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-red-500">Error: {error.message}</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Header />
      <div className="flex">
        <SideBar />
        <div className="w-full flex-1 rounded-2xl p-3">
          <MainView />
          
          {isPopoverOpen && (
            <EventPopover
              isOpen={isPopoverOpen}
              onClose={handlePopoverClose}
              date={userSelectedDate.format("YYYY-MM-DD")}
            />
          )}
        </div>
      </div>
    </>
  );
}