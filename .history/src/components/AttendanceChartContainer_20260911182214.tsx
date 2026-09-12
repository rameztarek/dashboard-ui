import AttendanceChart from "./AttendanceChart";
import Image from "next/image";
import prisma from "@/lib/prisma";



const AttendanceChartContainer = async () => {

  const toDay = new Date()
  const dayOfWeek = toDay.getDay()
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const lastMonday = new Date()

  lastMonday.setDate(toDay.getDate() - daysSinceMonday )

  const resData = await prisma.attendance.findMany({
    where:{
      date:{
        gte:lastMonday
      }
    }
    ,select:{
      date:true,
      present: true,
    }
  })

  
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const attendanceMap = {
  Mon: { present: 0, absent: 0 },
  Tue: { present: 0, absent: 0 },
  Wed: { present: 0, absent: 0 },
  Thu: { present: 0, absent: 0 },
  Fri: { present: 0, absent: 0 },
};

resData.forEach(item=>{
  const itemDate = new Date(item.date)

  if(dayOfWeek > 1 || daysOfWeek <5 )
})

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