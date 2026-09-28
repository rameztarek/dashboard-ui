import { subjectSchema } from './FormValidationSchema';
import prisma from './prisma';
import { z } from 'zod';
"use server"


export const creatSubject = async (data: z.infer<typeof subjectSchema>)=>{

  try{
    await prisma.subject.create({
      data:{
        name: data.name,
      },
    });

    revalida

  }catch (err){
    console.log(err)
  }
}