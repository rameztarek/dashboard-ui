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
  const totalDay = attendance.length;
  const presentDays = attendance.filter((day) => day.present).length;
  const presentAge = totalDay === 0 ? 0 : (presentDays / totalDay) * 100;
  return (
      <div>
        <h1 className="text-xl font-semibold">{presentAge}%</h1>
        <span className="text-sm text-gray-500">Attendance</span>
      </div>
  )
}

export default StudentAtendenceCard