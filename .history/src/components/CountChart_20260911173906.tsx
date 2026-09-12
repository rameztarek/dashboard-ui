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

const CountChart = ({ boys, girls }: { boys: number, girls: number }) => {
  const data = [
    { name: "Total", count: boys+b, fill: "white" },
    { name: "Girls", count: 50, fill: "#C3EBFA" },
    { name: "Boys", count: 50, fill: "#FAE27C" },
  ];
  return (
    <div className=" relative w-full h-[75%]">
        {/* CHART */}
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
  );
};

export default CountChart;
