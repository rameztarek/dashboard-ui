import { revalidatePath } from 'next/cache';
import { subjectSchema } from './FormValidationSchema';
import prisma from './prisma';
import { z } from 'zod';
"use server"


export const creatSubject = async (data: z.infer<typeof subjectSchema>)=>{

  try{
    await prisma.subjects.create({
      data:{
        name: data.name,
      },
    });

    revalidatePath("/list/subjects")

  }catch (err){
    console.log(err)
  }
}