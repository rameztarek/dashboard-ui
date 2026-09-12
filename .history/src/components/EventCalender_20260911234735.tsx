"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';


type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

// TEMPORARY
const events =[
  {
    id:1,
    title:"lorem ipsum dolor sit amet ",
    time: "10:00 AM",
    discription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
    {
      id:2,
      title:"lorem ipsum dolor sit amet ",
      time: "11:00 AM",
      discription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      id:3,
      title:"lorem ipsum dolor sit amet ",
      time: "12:00 AM",
      discription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      id:4,
      title:"lorem ipsum dolor sit amet ",
      time: "1:00 AM",
      discription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
]

const EventCalender = () => {
  const [value, onChange] = useState<Value>(new Date());

  return <Calendar/>
};

export default EventCalender;
