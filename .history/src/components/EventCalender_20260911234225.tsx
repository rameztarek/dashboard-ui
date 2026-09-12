"use client";

import Image from "next/image";
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

  return (

      <div className="flex flex-col gap-4">
        {events.map((event)=>(
          <div key={event.id} className="p-5 rounded-md border-2 border-gray-200 border-t-4 odd:border-t-lama-sky even:border-t-lama-purple">
            <div className= "flex items-center justify-between">
              <h1 className="font-semibold text-gray-600">{event.title}</h1>
              <span className="text-gray-300 text-xs" >{event.time}</span>
            </div>
            <p className="mt-2 text-gray-400 text-xs">{event.discription}</p>
          </div>
        ))}
  );
};

export default EventCalender;
