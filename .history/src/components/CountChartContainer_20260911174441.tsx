import prisma from "@/lib/prisma";
import Image from "next/image";
import CountChart from "./CountChart";

const CountChartContainer = async () => {
const data =await prisma.student.groupBy{
  by:["sex"],
}


  return (
    <div className="bg-white rounded-xl w-full h-full p-4 ">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Student</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
              {/* CHART */}
      <CountChart/>
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
    </div>
  )
}

export default CountChartContainer