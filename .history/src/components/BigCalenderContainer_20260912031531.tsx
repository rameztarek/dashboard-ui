import prisma from "@/lib/prisma";

const BigCalenderContainer = async ({ type, id }: { type: "teacherId" | "classId", id: string | number }) => {



  const dataRes = await prisma.lesson.findMany({
    where: {
      ...(type === "teacherId" ? { teacherId: id as string } : { classId: id as number }),
    }
  })

const data = dataRes.map(lesson=>{
  
})

  return (
    <div className=''>
      <BigCalender data={data}/>

    </div>
  )
}

export default BigCalenderContainer