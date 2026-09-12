import prisma from "@/lib/prisma";

const BigCalenderContainer = async ({ type, id }: { type: "teacherId" | "classId", id: string | number }) => {



  const data = await prisma.lesson.findMany({
    where: {
      ...(type === "teacherId" ? { teacherId: id as string } : { classId: id as number }),
    }
  })



  return (
    <div className=''>
      <BigCalender data={data}/>

    </div>
  )
}

export default BigCalenderContainer