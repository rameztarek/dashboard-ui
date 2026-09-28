import { subjectSchema } from './FormValidationSchema';
import prisma from './prisma';
"use server"


export const creatSubject = async (data:typeof subjectSchema)=>{

  try{
    await prisma.subject.create({
      
    })
  }
}