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
    </section>
  );
};

export default CountChart;
