"use client";

import Image from "next/image";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { day: "Mon", present: 30, absent: 10 },
  { day: "Tue", present: 25, absent: 15 },
  { day: "Wed", present: 35, absent: 5 },
  { day: "Thu", present: 20, absent: 20 },
  { day: "Fri", present: 40, absent: 0 },
  { day: "Sat", present: 15, absent: 25 },
];

const AttendanceChart = ({data}: {data:{name:string , present:number , absent:number}[]}) => {
  return (

      <ResponsiveContainer width="100%" height="90%">
        <BarChart width={500} height={300} responsive data={data} barSize={20}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
          <XAxis dataKey="day" axisLine={false} tick={{ fill: "#d1d5db" }} />
          <YAxis
            width="auto"
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{ borderRadius: "10px", borderColor: "lightgray " }}
          />
          <Legend
            align="left"
            verticalAlign="top"
            wrapperStyle={{
              paddingTop: "20px",
              paddingBottom: "40px",
            }}
          />
          <Bar
            dataKey="present"
            fill="#FAE27C"
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="absent"
            fill="#C3EBFA"
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
};

export default AttendanceChart;
