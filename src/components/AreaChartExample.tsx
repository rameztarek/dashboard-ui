"use client";
import { LineChart, Line, XAxis, YAxis } from "recharts";

const data = [
  { name: "A", value: 400 },
  { name: "B", value: 300 },
];

export default function AreaChartExample() {
  return (
    <LineChart width={400} height={300} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Line dataKey="value" />
    </LineChart>
  );
}
