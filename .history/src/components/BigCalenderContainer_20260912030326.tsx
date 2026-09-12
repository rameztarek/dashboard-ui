import prisma from "@/lib/prisma";

const BigCalenderContainer  = async ({type, id }:{type:"teacher" |"student" , id: string | number}) => {



  const data = await prisma.le.findMany({
  })
  return (

    <div className=''>

    </div>
  )
}

export default BigCalenderContainer