"use client";

import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  createHorizontalChart,
} from "recharts";
import Image from "next/image";
import { ResponsiveContainer } from "recharts";

interface FinanceData {
  name: string;
  income: number;
  expense: number;
}

const data: FinanceData[] = [
  { name: "jan", income: 4000, expense: 2400 },
  { name: "feb", income: 3000, expense: 1398 },
  { name: "mar", income: 2000, expense: 9800 },
  { name: "apr", income: 2780, expense: 3908 },
  { name: "may", income: 1890, expense: 4800 },
  { name: "jun", income: 2390, expense: 3800 },
  { name: "jul", income: 3490, expense: 4300 },
  { name: "aug", income: 3490, expense: 4300 },
  { name: "sep", income: 2490, expense: 9300 },
  { name: "oct", income: 7490, expense: 1300 },
  { name: "nov", income: 4490, expense: 3300 },
  { name: "dec", income: 4900, expense: 4700 },
];
const Typed = createHorizontalChart<FinanceData, string, number>()({
  XAxis,
  YAxis,
  Tooltip,
  Line,
});

const FinaenceChart = () => {
  return (
    <section className="bg-white rounded-lg p-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Finance</h1>
        <Image src="/moreDark.png" alt="Finance" width={20} height={20} />
      </div>
      <Typed.LineChart
        style={{
          width: "100%",
          height: "90%",
          maxHeight: "70vh",
        }}
        responsive
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid />
        <Typed.XAxis
          dataKey="name"
          axisLine={false}
          tick={{ fill: "#d1d5db" }}
          tickLine={false}
        />
        <Typed.YAxis
          width="auto"
          axisLine={false}
          tick={{ fill: "#d1d5db" }}
          tickLine={false}
        />
        <Tooltip />
        <Legend
          align="left"
          verticalAlign="top"
          wrapperStyle={{
            paddingTop: "20px",
            paddingBottom: "40px",
          }}
        />
        <Typed.Line
          dataKey="income"
          type="monotone"
          stroke="#C3EBFA"
          strokeWidth={5}
        />
        <Typed.Line
          dataKey="expense"
          type="monotone"
          stroke="#CFCEFF"
          strokeWidth={5}
        />
      </Typed.LineChart>
    </section>
  );
};

export default FinaenceChart;
