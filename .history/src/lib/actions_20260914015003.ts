"use server";
import { z, string } from 'zod';
import { SubjectInput, subjectSchema } from "./FormValidationSchema";
import prisma from "./prisma";
import {
  classSchema,
  ClassSchemaInput,
  TeacherSchemaInput,
} from "@/lib/FormValidationSchema";

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

  try {
    switch (table) {
      case "teacher":
        await prisma.teacher.delete({ where: { id: id as string } });
        break;
      case "student":
        await prisma.student.delete({ where: { id: id as string } });
        break;
      case "parent":
        await prisma.parent.delete({ where: { id: id as string } });
        break;
      case "class":
        await prisma.class.delete({ where: { id: id as number } });
        break;
      case "subject":
        await prisma.subject.delete({ where: { id: id as number } });
        break;
      case "lesson":
        await prisma.lesson.delete({ where: { id: id as number } });
        break;
      case "exam":
        await prisma.exam.delete({ where: { id: id as number } });
        break;
      case "assignment":
        await prisma.assignment.delete({ where: { id: id as number } });
        break;
      case "result":
        await prisma.result.delete({ where: { id: id as number } });
        break;
      case "attendance":
        await prisma.attendance.delete({ where: { id: id as number } });
        break;
      case "event":
        await prisma.event.delete({ where: { id: id as number } });
        break;
      case "announcement":
        await prisma.announcement.delete({ where: { id: id as number } });
        break;
      default:
        return { success: false, error: true };
    }

    return { success: true, error: false };
  } catch (err) {
    console.error(`Error deleting ${table}:`, err);
    return { success: false, error: true };
  }
};

export const createClass = async (
  currentState: CurrentState,
  data: ClassSchemaInput,
) => {
  try {
    const parsedData = classSchema.parse(data);

    await prisma.class.create({
      data: {
        name: parsedData.name,
        capacity: parsedData.capacity,
        gradeId: parsedData.gradeId,
        supervisorId: parsedData.supervisorId || null,
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log("Error creating subject:", err);
    return { success: false, error: true };
  }
};

export const updateClass = async (
  currentState: CurrentState,
  data: ClassSchemaInput,
) => {
  try {
    const parsedData = classSchema.parse(data);

    if (parsedData.id === undefined) {
      return { success: false, error: true };
    }

    await prisma.class.update({
      where: {
        id: parsedData.id,
      },
      data: {
        name: parsedData.name,
        capacity: parsedData.capacity,
        gradeId: parsedData.gradeId,
        supervisorId: parsedData.supervisorId || null,
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log("Error creating subject:", err);
    return { success: false, error: true };
  }
};

export const deleteClass = async (
  currentState: CurrentState,
  data: FormData,
) => {
  try {
    const id = Number(data.get("id"));

    if (!Number.isInteger(id)) {
      return { success: false, error: true };
    }

    await prisma.class.delete({ where: { id } });

    return { success: true, error: false };
  } catch (err) {
    console.log("Error creating subject:", err);
    return { success: false, error: true };
  }
};

export const createTeacher = async (
  currentState: CurrentState,
  data: TeacherSchemaInput,
) => {
  try {
    const parsedData = classSchema.parse(data);

    await prisma.teacher.create({
      data: {
        name: parsedData.name,
        capacity: parsedData.capacity,
        gradeId: parsedData.gradeId,
        supervisorId: parsedData.supervisorId || null,
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log("Error creating subject:", err);
    return { success: false, error: true };
  }
};


const user = await clerkClient.user.createUsre({
  userName: data.userName,
  userName: data.userName
  publicMetadata:{role:"teacher"}
  password: data.password
  FirstName: data.name
  LastName: data.surname
})





export const updateTeacher = async (
  currentState: CurrentState,
  data: TeacherSchemaInput,
) => {
  try {
    const parsedData = classSchema.parse(data);

    if (parsedData.id === undefined) {
      return { success: false, error: true };
    }

    await prisma.teacher.update({
      where: {
        id: parsedData.id,
      },
      data: {
        name: parsedData.name,
        capacity: parsedData.capacity,
        gradeId: parsedData.gradeId,
        supervisorId: parsedData.supervisorId || null,
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log("Error creating subject:", err);
    return { success: false, error: true };
  }
};

export const deleteTeacher = async (
  currentState: CurrentState,
  data: FormData,
) => {
  try {
    const id = data.get("id");

    if (typeof id !== "string" || id.length === 0) {
      return { success: false, error: true };
    }

    await prisma.teacher.delete({ where: { id } });

    return { success: true, error: false };
  } catch (err) {
    console.log("Error creating subject:", err);
    return { success: false, error: true };
  }
};
