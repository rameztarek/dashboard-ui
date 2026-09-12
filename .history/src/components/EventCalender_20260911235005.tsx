"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';


type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];


const EventCalender = () => {
  const [value, onChange] = useState<Value>(new Date());

  const router = useRouter()

  useEffect({},[])

  return <Calendar/>
};

export default EventCalender;
