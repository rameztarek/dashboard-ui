"use server";
import { revalidatePath } from "next/cache";
import { subjectSchema } from "./FormValidationSchema";
import { z } from "zod";
import prisma from "./prisma";

type CurrentState = { success: boolean; error: boolean }; 

export const creatSubject = async (
  currentState: CurrentState,
  formData: FormData,
) => {

  const data = subjectSchema.safeParse({ name: formData.get("name") }); 
  if (!data.success) return { success: false, error: true }; 
  try {
    await new Promise((resolve))
    await prisma.subject.create({
      data: { name: data.data.name },
    });
    console.log("Subject created successfully");
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log("Error creating subject:", err);
    return { success: false, error: true };
  }
};
