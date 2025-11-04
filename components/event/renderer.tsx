import { CalendarEventType } from "@/redux/calender/eventSlice";
import { openEventSummary } from "@/redux/calender/eventSlice";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React from "react";

// Enable custom parse format plugin
dayjs.extend(customParseFormat);

type EventRendererProps = {
  date: dayjs.Dayjs;
  view: "month" | "week" | "day";
  events: CalendarEventType[];
};

export function EventRenderer({ date, view, events }: EventRendererProps) {
  const dispatch = useAppDispatch();

  // Helper function to parse time string and combine with date
  const parseEventTime = (dateObj: dayjs.Dayjs, timeString: string) => {
    // Parse time string (e.g., "09:30", "14:00")
    const time = dayjs(timeString, "HH:mm");
    // Combine date with parsed time
    return dateObj.hour(time.hour()).minute(time.minute()).second(0);
  };

  const filteredEvents = events.filter((event: CalendarEventType) => {
    if (view === "month") {
      return event.date.format("DD-MM-YY") === date.format("DD-MM-YY");
    } else if (view === "week" || view === "day") {
      // Parse event times
      const eventStart = parseEventTime(event.date, event.from_time);
      const eventEnd = parseEventTime(event.date, event.to_time);
      
      const slotStart = date;
      const slotEnd = date.add(1, "hour");
      
      // Check if event overlaps with this hour slot
      return eventStart.isBefore(slotEnd) && eventEnd.isAfter(slotStart);
    }
  });

  // Calculate position and height for day/week view
  const calculateEventStyle = (event: CalendarEventType) => {
    if (view === "month") return {};

    const slotStart = date;
    const eventStart = parseEventTime(event.date, event.from_time);
    const eventEnd = parseEventTime(event.date, event.to_time);

    // Calculate minutes from the start of the hour slot
    const minutesFromSlotStart = eventStart.diff(slotStart, "minute");
    const durationMinutes = eventEnd.diff(eventStart, "minute");

    // Convert to percentage (each hour slot is 64px = h-16)
    const topPercentage = (minutesFromSlotStart / 60) * 100;
    const heightPercentage = (durationMinutes / 60) * 100;

    return {
      position: "absolute" as const,
      top: `${Math.max(0, topPercentage)}%`,
      height: `${Math.min(heightPercentage, 100 - topPercentage)}%`,
      minHeight: "24px", // Ensure small events are visible
    };
  };

  return (
    <>
      {filteredEvents.map((event) => (
        <div
          key={event.id}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(openEventSummary(event));
          }}
          style={calculateEventStyle(event)}
          className="line-clamp-1 w-[90%] cursor-pointer rounded-sm bg-green-700 p-1 text-sm text-white"
        >
          {event.title}
        </div>
      ))}
    </>
  );
}
