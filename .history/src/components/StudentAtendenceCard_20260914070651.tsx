const StudentAtendenceCard = async ({id}:{id:string}) => {
  import prisma from "@/lib/prisma";

  const adentance = await prisma
  return (
              <div>
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-500">Attendance</span>
              </div>
  )
}

export default StudentAtendenceCard