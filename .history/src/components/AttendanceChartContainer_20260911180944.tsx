import AttendanceChart from "./AttendanceChart";
import Image from "next/image";
import prisma from "@/lib/prisma";



const AttendanceChartContainer = async () => {

  const toDay = new Date()
  const dayOfWeek = toDay.getDay()
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const lastMonday = new Date()

  

  const data = await prisma.attendance.findMany(
    where
  )
  return (

    <div className="bg-white rounded-lg p-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Attendance</h1>
        <Image src="/moreDark.png" alt="Attendance" width={20} height={20} />
      </div>
      <AttendanceChart/>
      </div>
    
  )
}

export default AttendanceChartContainer