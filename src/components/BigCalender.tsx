"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import { calendarEvents } from "@/lib/data";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

const localizer = momentLocalizer(moment);

type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
  className?: string;
  subjectName?: string;
};

const subjectColors = [
  "#bae6fd",
  "#ddd6fe",
  "#fbcfe8",
  "#fde68a",
];

const colorForEvent = (event: CalendarEvent) => {
  const key = event.subjectName ?? event.title;
  const index = Array.from(key).reduce(
    (total, character) => total + character.charCodeAt(0),
    0,
  );
  return subjectColors[index % subjectColors.length];
};

const Event = ({ event }: { event: CalendarEvent }) => (
  <div className="flex h-full flex-col gap-1 overflow-hidden rounded-lg px-2 py-1 text-slate-800">
    <strong className="truncate">{event.className ?? "Class"}</strong>
    <span className="truncate">{event.subjectName ?? event.title}</span>
    <span className="text-xs">
      {event.start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      {" - "}
      {event.end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
    </span>
  </div>
);

const BigCalender = ({ data = calendarEvents }: { data?: CalendarEvent[] }) => {
  // Uses fetched lessons when provided and preserves standalone calendar pages.
  const [view, setView] = useState<View>(Views.WORK_WEEK);
  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };


  return (
    <Calendar
      localizer={localizer}
      events={data} // Displays fetched lessons or fallback events when no data prop is provided.
      components={{ event: Event }}
      eventPropGetter={(event) => ({
        style: {
          backgroundColor: colorForEvent(event),
          border: "none",
          borderRadius: "0.5rem",
          color: "#1e293b",
        },
      })}
      startAccessor="start"
      endAccessor="end"
      views={["work_week", "day"]}
      view={view}
      style={{ height: "98%" }}
      onView={handleOnChangeView}
      min={new Date(2025, 1, 0, 8, 0, 0)}
      max={new Date(2025, 1, 0, 17, 0, 0)}
    />
  );
};

export default BigCalender;
