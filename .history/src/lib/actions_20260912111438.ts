"use server";
import { subjectSchema ,  } from "./FormValidationSchema";
import prisma from "./prisma";

type CurrentState = { success: boolean; error: boolean };

export const creatSubject = async (
  currentState: CurrentState,
  formData: FormData,
) => {
  const data = subjectSchema.safeParse({ name: formData.get("name") });
  if (!data.success) return { success: false, error: true };
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
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

export const updateSubject = async (
  currentState: CurrentState,
  data: SubjectSchema,
) => {
  try {
    await prisma.subject.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
      },
    });

    revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};