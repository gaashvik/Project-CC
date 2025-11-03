import React, { useEffect, useRef, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import dayjs from "dayjs";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import { FiClock } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { MdVideocam, MdPeopleOutline } from "react-icons/md";
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
  const [activeTab, setActiveTab] = useState<"event" | "task">("event");
  const [showTimeInputs, setShowTimeInputs] = useState(false);

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
    setActiveTab("event");
    setShowTimeInputs(false);
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
        }, 1500);
      } catch (err) {
        setError("An unexpected error occurred. Please try again.");
      }
    });
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-transparent"
      onClick={handleClose}
    >
      <div
        ref={popoverRef}
        className="w-full max-w-[560px] rounded-lg bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
        onClick={handlePopoverClick}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <HiOutlineMenuAlt2 className="h-6 w-6 text-gray-600" />
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={handleClose}
            className="h-10 w-10 hover:bg-gray-100"
          >
            <IoCloseSharp className="h-6 w-6 text-gray-600" />
          </Button>
        </div>

        {/* Form */}
        <form className="space-y-0 px-6 pb-6 pt-4" onSubmit={onSubmit}>
          {/* Title Input */}
          <div className="mb-6">
            <Input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add title and time"
              className="border-0 border-b-2 border-blue-500 px-0 text-2xl font-normal placeholder:text-gray-500 focus-visible:border-blue-600 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          {/* Tab Navigation */}
          <div className="mb-6 flex space-x-1">
            <button
              type="button"
              onClick={() => setActiveTab("event")}
              className={cn(
                "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                activeTab === "event"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              Event
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("task")}
              className={cn(
                "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                activeTab === "task"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              Task
            </button>
          </div>

          {/* Date and Time Section */}
          <div className="mb-4 flex items-start space-x-4 py-3">
            <FiClock className="mt-1 h-5 w-5 text-gray-600" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">
                    {dayjs(date).format("dddd, MMMM D")} –{" "}
                    {dayjs(date).format("dddd, MMMM D")}
                  </span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTimeInputs(!showTimeInputs)}
                  className="text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                >
                  Add time
                </Button>
              </div>
              <p className="mt-1 text-xs text-gray-500">Does not repeat</p>
              
              {showTimeInputs && (
                <div className="mt-3 flex items-center space-x-2">
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
              )}
            </div>
          </div>

          {/* Add Guests */}
          <div className="flex items-center space-x-4 py-3">
            <MdPeopleOutline className="h-5 w-5 text-gray-600" />
            <button
              type="button"
              className="flex-1 text-left text-sm text-gray-600 hover:text-gray-800"
            >
              Add guests
            </button>
          </div>

          {/* Add Google Meet */}
          <div className="flex items-center space-x-4 py-3">
            <MdVideocam className="h-5 w-5 text-gray-600" />
            <button
              type="button"
              className="flex-1 text-left text-sm text-gray-600 hover:text-gray-800"
            >
              Add Google Meet video conferencing
            </button>
          </div>

          {/* Add Location */}
          <div className="flex items-center space-x-4 py-3">
            <IoLocationOutline className="h-5 w-5 text-gray-600" />
            <button
              type="button"
              className="flex-1 text-left text-sm text-gray-600 hover:text-gray-800"
            >
              Add location
            </button>
          </div>

          {/* Description */}
          <div className="flex items-start space-x-4 py-3">
            <HiOutlineMenuAlt2 className="mt-1 h-5 w-5 text-gray-600" />
            <Input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add description or a Google Drive attachment"
              className={cn(
                "flex-1 border-0 bg-transparent px-0 text-sm placeholder:text-gray-600",
                "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              )}
            />
          </div>

          {/* User Info Section */}
          <div className="flex items-center space-x-3 border-t py-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-medium text-white">
              SK
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">Shubh Kamra</p>
              <p className="text-xs text-gray-500">
                Free · Default visibility · Notify the day before at 5pm
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between border-t pt-4">
            <Button
              type="button"
              variant="ghost"
              className="text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-700"
            >
              More options
            </Button>
            <Button
              type="submit"
              disabled={isPending || !title.trim()}
              className="rounded-full bg-blue-600 px-6 hover:bg-blue-700"
            >
              {isPending ? "Saving..." : "Save"}
            </Button>
          </div>

          {/* Status Messages */}
          {error && (
            <div className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}
          {success && (
            <div className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-600">
              Event created successfully!
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
