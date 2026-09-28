import prisma from "@/lib/prisma";

const StudentAtendenceCard = async ({id}:{id:string}) => {

  const attendance = await prisma.attendance.findMany({
    where:{
      studentId:id,
      date:{
        gte:new Date(new Date().getFullYear(),0,1)
      }
    }
  })
  const totalDay = attendance.lenght;
  const presentDays = attendance.filter()
  return (
      <div>
        <h1 className="text-xl font-semibold">90%</h1>
        <span className="text-sm text-gray-500">Attendance</span>
      </div>
  )
}

export default StudentAtendenceCard