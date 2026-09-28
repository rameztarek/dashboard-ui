"use server"
import { revalidatePath } from 'next/cache';
import { subjectSchema } from './FormValidationSchema';
import { z } from 'zod';
import prisma from './prisma';


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