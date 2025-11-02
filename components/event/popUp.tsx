import React, { useEffect, useRef, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import dayjs from "dayjs";
import {
  HiOutlineMenuAlt2,
  HiOutlineMenuAlt4,
} from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import { FiClock } from "react-icons/fi";
import AddTime from "../add-time";
import { cn } from "@/lib/utils";

interface EventPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  date: string;
}

export default function EventPopover({
  isOpen,
  onClose,
  date,
}: EventPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [fromTime, setFromTime] = useState("09:00");
  const [toTime, setToTime] = useState("10:00");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventType, setEventType] = useState("meeting");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    resetForm();
    onClose();
  };

  const handlePopoverClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setFromTime("09:00");
    setToTime("10:00");
    setEventType("meeting");
    setError(null);
    setSuccess(false);
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch("/api/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: eventType,
            date: date,
            title: title,
            description: description,
            from_time: fromTime,
            to_time: toTime,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Failed to create event");
          return;
        }

        setSuccess(true);
        setTimeout(() => {
          resetForm();
          onClose();
          window.location.reload(); // Refresh to show new event
        }, 1500);
      } catch (err) {
        setError("An unexpected error occurred. Please try again.");
      }
    });
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleClose}
    >
      <div
        ref={popoverRef}
        className="w-full max-w-lg rounded-lg bg-white shadow-xl"
        onClick={handlePopoverClick}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center space-x-2">
            <HiOutlineMenuAlt4 className="h-5 w-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Event</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={handleClose}
            className="h-8 w-8"
          >
            <IoCloseSharp className="h-5 w-5" />
          </Button>
        </div>

        {/* Form */}
        <form className="space-y-4 p-6" onSubmit={onSubmit}>
          {/* Title Input */}
          <div>
            <Input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add title"
              className="border-0 border-b-2 border-transparent text-2xl font-normal placeholder:text-gray-400 focus-visible:border-b-blue-600 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          {/* Date and Time */}
          <div className="flex items-start space-x-3 py-2">
            <FiClock className="mt-1 h-5 w-5 text-gray-600" />
            <div className="flex-1 space-y-2">
              <p className="text-sm font-medium text-gray-700">
                {dayjs(date).format("dddd, MMMM D, YYYY")}
              </p>
              <div className="flex items-center space-x-2">
                <AddTime
                  onTimeSelect={setFromTime}
                  defaultTime={fromTime}
                  placeholder="Start time"
                />
                <span className="text-gray-500">–</span>
                <AddTime
                  onTimeSelect={setToTime}
                  defaultTime={toTime}
                  placeholder="End time"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="flex items-start space-x-3 py-2">
            <HiOutlineMenuAlt2 className="mt-1 h-5 w-5 text-gray-600" />
            <Input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add description"
              className={cn(
                "flex-1 border-0 bg-transparent placeholder:text-gray-400",
                "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              )}
            />
          </div>

          {/* Event Type Selection */}
          <div className="flex items-center space-x-2 border-t pt-4">
            <Button
              type="button"
              variant={eventType === "meeting" ? "default" : "ghost"}
              size="sm"
              onClick={() => setEventType("meeting")}
              className={cn(
                eventType === "meeting" &&
                  "bg-blue-50 text-blue-600 hover:bg-blue-100"
              )}
            >
              Meeting
            </Button>
            <Button
              type="button"
              variant={eventType === "task" ? "default" : "ghost"}
              size="sm"
              onClick={() => setEventType("task")}
              className={cn(
                eventType === "task" &&
                  "bg-blue-50 text-blue-600 hover:bg-blue-100"
              )}
            >
              Task
            </Button>
            <Button
              type="button"
              variant={eventType === "appointment" ? "default" : "ghost"}
              size="sm"
              onClick={() => setEventType("appointment")}
              className={cn(
                eventType === "appointment" &&
                  "bg-blue-50 text-blue-600 hover:bg-blue-100"
              )}
            >
              Appointment
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 border-t pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={handleClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending || !title.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isPending ? "Saving..." : "Save"}
            </Button>
          </div>

          {/* Status Messages */}
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}
          {success && (
            <div className="rounded-md bg-green-50 p-3 text-sm text-green-600">
              Event created successfully!
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
