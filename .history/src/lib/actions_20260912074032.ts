import { revalidatePath } from 'next/cache';
import { subjectSchema } from './FormValidationSchema';
import { z } from 'zod';
import prisma from './prisma';
"use server"


export const creatSubject = async (data: z.infer<typeof subjectSchema>)=>{

  try{
    await prisma.subject.create({
      data:{
        name: data.name,
      },
    });

    revalidatePath("/list/subjects")

  }catch (err){
    console.log(err)
  }
}