"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventCalender = () => {
  const [value, onChange] = useState<Value>(new Date());
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (value instanceof Date) {
      const formattedDate = value.toISOString().split("T")[0];
      router.push(`?date=${formattedDate}`);
    }
  }, [value, router]);

  if (!isMounted) return null;

  return <Calendar onChange={onChange} value={value} locale="en-US" />;
};

export default EventCalender;