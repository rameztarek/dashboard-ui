import AttendanceChart from "./AttendanceChart";
import Image from "next/image";


const AttendanceChartContainer = async () => {

  c
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