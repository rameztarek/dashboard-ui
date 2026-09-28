"use server";
import { z } from "zod";
import { SubjectInput, subjectSchema } from "./FormValidationSchema";
import prisma from "./prisma";

type CurrentState = { success: boolean; error: boolean };

export const creatSubject = async (
  currentState: CurrentState,
  formData: FormData,
) => {
  const name = formData.get("name") as string;
  const teacherIds = formData.getAll("teachers").map(String);

  try {
    await prisma.subject.create({
      data: {
        name,
        teachers: {
          connect: teacherIds.map((teacherId) => ({ id: teacherId })),
        },
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log("Error creating subject:", err);
    return { success: false, error: true };
  }
};

export const updateSubject = async (
  currentState: CurrentState,
  formData: FormData,
) => {
  const id = Number(formData.get("id"));
  const name = formData.get("name") as string;
  const teacherIds = formData.getAll("teachers").map(String);

  try {
    await prisma.subject.update({
      where: { id },
      data: {
        name: name,
        teachers: {
          set: teacherIds.map((teacherId) => ({ id: teacherId })),
        },
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const DeletSubject = async (
  currentState: CurrentState,
  data: FormData,
) => {
  const id = data.get("id") as string;
  try {
    await prisma.subject.delete({
      where: {
        id: parseInt(id),
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteRecord = async (
  currentState: CurrentState,
  data: FormData,
) => {
  const table = data.get("table");
  const rawId = data.get("id");

  if (typeof table !== "string" || rawId === null) {
    return { success: false, error: true };
  }

  const stringIdTables = new Set(["teacher", "student", "parent"]);
  const id = stringIdTables.has(table) ? String(rawId) : Number(rawId);

  if (!stringIdTables.has(table) && !Number.isInteger(id)) {
    return { success: false, error: true };
  }


    return { success: true, error: false };
  } catch (err) {
    console.error(`Error deleting ${table}:`, err);
    return { success: false, error: true };
  }
};

