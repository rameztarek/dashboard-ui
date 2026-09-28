"use server";
import prisma from "./prisma";
import {
  classSchema,
  ClassSchemaInput,
  TeacherSchemaInput,
  teacherSchema,
} from "@/lib/FormValidationSchema";
import { clerkClient } from "@clerk/nextjs/server";

type CurrentState = { success: boolean; error: boolean };

export const creatSubject = async (
  currentState: CurrentState,
  formData: FormData,
) => {
  const name = formData.get("name") as string;
  const teacherIds = formData.getAll("teachers").map(String);

  try {
    const classItem = await prisma.class.findUnique({
      where: { id.data.classd },
      include: { _count: { select: { studenst: true } } }
    });
    if (classItem && classItem.capacity === classItem._count.students) {
      return { success: false, error: true }
    }
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

// TEACHERS CREATE

export const createTeacher = async (
  currentState: CurrentState,
  data: TeacherSchemaInput,
) => {
  try {
    const parsedData = teacherSchema.parse(data);
    const bloodType = (data as { bloodType?: string | null }).bloodType ?? "";

    const client = await clerkClient();
    const user = await client.users.createUser({
      username: parsedData.userName,
      password: parsedData.password,
      firstName: parsedData.firstName,
      lastName: parsedData.lastName,
      publicMetadata: { role: "teacher" },
    });

    await prisma.teacher.create({
      data: {
        id: user.id,
        username: parsedData.userName,
        name: parsedData.firstName,
        surname: parsedData.lastName,
        email: parsedData.email || null,
        phone: parsedData.phone || null,
        address: parsedData.address,
        img: parsedData.img || null,
        bloodType,
        sex: parsedData.sex,
        birthday: new Date(parsedData.birthDate),
        subjects: {
          connect: (parsedData.subject ?? [])
            .filter((subjectId): subjectId is string => !!subjectId)
            .map((subjectId) => ({
              id: parseInt(subjectId, 10),
            })),
        },
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log("Error creating teacher:", err);
    return { success: false, error: true };
  }
};

export const updateTeacher = async (
  currentState: CurrentState,
  data: TeacherSchemaInput,
) => {
  try {
    const parsedData = teacherSchema.parse(data);
    const bloodType = (data as { bloodType?: string | null }).bloodType ?? "";

    if (!parsedData.id) {
      return { success: false, error: true };
    }

    const client = await clerkClient();
    await client.users.updateUser(parsedData.id, {
      username: parsedData.userName,
      ...(parsedData.password ? { password: parsedData.password } : {}),
      firstName: parsedData.firstName,
      lastName: parsedData.lastName,
    });

    await prisma.teacher.update({
      where: { id: parsedData.id },
      data: {
        username: parsedData.userName,
        name: parsedData.firstName,
        surname: parsedData.lastName,
        email: parsedData.email || null,
        phone: parsedData.phone || null,
        address: parsedData.address,
        img: parsedData.img || null,
        bloodType,
        sex: parsedData.sex,
        birthday: new Date(parsedData.birthDate),
        subjects: {
          set: parsedData.subject
            ?.filter((subjectId): subjectId is string => subjectId !== undefined)
            .map((subjectId) => ({
              id: parseInt(subjectId),
            })),
        },
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log("Error updating teacher:", err);
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

    const lessons = await prisma.lesson.findMany({
      where: { teacherId: id },
      select: { id: true },
    });
    const lessonIds = lessons.map((lesson) => lesson.id);

    await prisma.$transaction(async (transaction) => {
      if (lessonIds.length > 0) {
        await transaction.result.deleteMany({
          where: {
            OR: [
              { exam: { lessonId: { in: lessonIds } } },
              { assignment: { lessonId: { in: lessonIds } } },
            ],
          },
        });
        await transaction.exam.deleteMany({
          where: { lessonId: { in: lessonIds } },
        });
        await transaction.assignment.deleteMany({
          where: { lessonId: { in: lessonIds } },
        });
        await transaction.attendance.deleteMany({
          where: { lessonId: { in: lessonIds } },
        });
        await transaction.lesson.deleteMany({
          where: { id: { in: lessonIds } },
        });
      }

      await transaction.class.updateMany({
        where: { supervisorId: id },
        data: { supervisorId: null },
      });
      await transaction.teacher.delete({ where: { id } });
    });

    const client = await clerkClient();
    await client.users.deleteUser(id);

    return { success: true, error: false };
  } catch (err) {
    console.log("Error deleting teacher:", err);
    return { success: false, error: true };
  }
};



// STUDENT CREATE



export const createStudent = async (
  currentState: CurrentState,
  data: TeacherSchemaInput,
) => {
  try {
    const parsedData = teacherSchema.parse(data);
    const bloodType = (data as { bloodType?: string | null }).bloodType ?? "";

    const client = await clerkClient();
    const user = await client.users.createUser({
      username: parsedData.userName,
      password: parsedData.password,
      firstName: parsedData.firstName,
      lastName: parsedData.lastName,
      publicMetadata: { role: "teacher" },
    });

    await prisma.teacher.create({
      data: {
        id: user.id,
        username: parsedData.userName,
        name: parsedData.firstName,
        surname: parsedData.lastName,
        email: parsedData.email || null,
        phone: parsedData.phone || null,
        address: parsedData.address,
        img: parsedData.img || null,
        bloodType,
        sex: parsedData.sex,
        birthday: new Date(parsedData.birthDate),
        subjects: {
          connect: (parsedData.subject ?? [])
            .filter((subjectId): subjectId is string => !!subjectId)
            .map((subjectId) => ({
              id: parseInt(subjectId, 10),
            })),
        },
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log("Error creating teacher:", err);
    return { success: false, error: true };
  }
};

export const updateStudent = async (
  currentState: CurrentState,
  data: TeacherSchemaInput,
) => {
  try {
    const parsedData = teacherSchema.parse(data);
    const bloodType = (data as { bloodType?: string | null }).bloodType ?? "";

    if (!parsedData.id) {
      return { success: false, error: true };
    }

    const client = await clerkClient();
    await client.users.updateUser(parsedData.id, {
      username: parsedData.userName,
      ...(parsedData.password ? { password: parsedData.password } : {}),
      firstName: parsedData.firstName,
      lastName: parsedData.lastName,
    });

    await prisma.teacher.update({
      where: { id: parsedData.id },
      data: {
        username: parsedData.userName,
        name: parsedData.firstName,
        surname: parsedData.lastName,
        email: parsedData.email || null,
        phone: parsedData.phone || null,
        address: parsedData.address,
        img: parsedData.img || null,
        bloodType,
        sex: parsedData.sex,
        birthday: new Date(parsedData.birthDate),
        subjects: {
          set: parsedData.subject
            ?.filter((subjectId): subjectId is string => subjectId !== undefined)
            .map((subjectId) => ({
              id: parseInt(subjectId),
            })),
        },
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log("Error updating teacher:", err);
    return { success: false, error: true };
  }
};

export const deleteStudent = async (
  currentState: CurrentState,
  data: FormData,
) => {
  try {

    const id = data.get("id");

    if (typeof id !== "string" || id.length === 0) {
      return { success: false, error: true };
    }

    const lessons = await prisma.lesson.findMany({
      where: { teacherId: id },
      select: { id: true },
    });
    const lessonIds = lessons.map((lesson) => lesson.id);

    await prisma.$transaction(async (transaction) => {
      if (lessonIds.length > 0) {
        await transaction.result.deleteMany({
          where: {
            OR: [
              { exam: { lessonId: { in: lessonIds } } },
              { assignment: { lessonId: { in: lessonIds } } },
            ],
          },
        });
        await transaction.exam.deleteMany({
          where: { lessonId: { in: lessonIds } },
        });
        await transaction.assignment.deleteMany({
          where: { lessonId: { in: lessonIds } },
        });
        await transaction.attendance.deleteMany({
          where: { lessonId: { in: lessonIds } },
        });
        await transaction.lesson.deleteMany({
          where: { id: { in: lessonIds } },
        });
      }

      await transaction.class.updateMany({
        where: { supervisorId: id },
        data: { supervisorId: null },
      });
      await transaction.teacher.delete({ where: { id } });
    });

    const client = await clerkClient();
    await client.users.deleteUser(id);

    return { success: true, error: false };
  } catch (err) {
    console.log("Error deleting teacher:", err);
    return { success: false, error: true };
  }
};