"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import { calendarEvents } from "@/lib/data";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

const localizer = momentLocalizer(moment);

type CalendarEvent = { title: string; start: Date; end: Date }; // Defines the shape of each lesson event rendered by the calendar.

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
