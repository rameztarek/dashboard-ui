import prisma from "@/lib/prisma";

const BigCalenderContainer  = async ({type, id }:{type:"teacherId" |"classId" , id: string | number}) => {



  const data = await prisma.lesson.findMany({
    where:{
      ...(type=== teacherId ? {teacherId:id as s} : {classId : id} )
    }
  })
  return (

    <div className=''>

    </div>
  )
}

export default BigCalenderContainer