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

export const creatSubject = async (data: z.infer<typeof subjectSchema>) => {
  console.log("creatSubject called with:", data);
  try {
    await prisma.subject.create({
      data: { name: data.name },
    });
    console.log("Subject created successfully");
    revalidatePath("/list/subjects");
  } catch (err) {
    console.log("Error creating subject:", err);
  }
};