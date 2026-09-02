"use client";
import Image from "next/image";
import {
  Legend,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// #region Sample data
const data = [
  { name: "Total", count: 100, fill: "white" },
  { name: "Girls", count: 50, fill: "#C3EBFA" },
  { name: "Boys", count: 50, fill: "#FAE27C" },
];

const CountChart = () => {
  return (
    <section className="bg-white rounded-xl w-full h-full p-4 ">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Student</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>

      {/* CHART */}

      <div className=" relative w-full h-[75%]">
        <ResponsiveContainer>
          <RadialBarChart
            width="100%"
            height="100%"
            responsive
            cx="50%"
            cy="50%"
            outerRadius="100%"
            innerRadius="40%"
            barSize={32}
            data={data}
          >
            <RadialBar background dataKey="count" />
            <Tooltip />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image
          src="/maleFemale.png"
          alt="maleFemale"
          width={50}
          height={50}
          className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* BOTTOM */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-lama-sky rounded-full" />
          <h1 className="font-bold">12.4</h1>
          <h2 className="text-xs text-gray-300">BOYS (50%)</h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-lama-yellow rounded-full" />
          <h1 className="font-bold">12.4</h1>
          <h2 className="text-xs text-gray-300">Girls (40%)</h2>
        </div>
      </div>
    </section>
  );
};

export default CountChart;
