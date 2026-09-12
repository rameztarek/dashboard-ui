import prisma from "@/lib/prisma";

const BigCalenderContainer  = async ({type, id }:{type:"teacher" |"student" , id: string | number}) => {



  const data = await prisma.lesson.findMany({
    where:{
      ...
    }
  })
  return (

    <div className=''>

    </div>
  )
}

export default BigCalenderContainer