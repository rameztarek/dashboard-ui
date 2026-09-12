"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventCalender = () => {
  const [value, onChange] = useState<Value>(new Date());
  const router = useRouter();

  useEffect(() => {
    if (value instanceof Date) {
      const formattedDate = value.toISOString().split("T")[0];
      router.push(`?date=${formattedDate}`);
    }
  }, [value, router]);

  // إجبار المكون على استخدام locale موحد (en-US) للتخلص من Hydration Mismatch
  return <Calendar onChange={onChange} value={value} locale="en-US" />;
};

export default EventCalender;