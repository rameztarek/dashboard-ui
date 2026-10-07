"use server";
import prisma from "./prisma";
import {
  classSchema,
  ClassSchemaInput,
  TeacherSchemaInput,
  teacherSchema,
  studentSchema,
  StudentSchemaInput,
  createTeacherSchema,
  createStudentSchema,
  parentSchema,
  createParentSchema,
  ParentSchemaInput,
} from "@/lib/FormValidationSchema";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";

export type CurrentState = {
  success: boolean;
  error: boolean;
  message?: string;
};

const failure = (context: string, error: unknown): CurrentState => {
  console.error(`${context}:`, error);

  if (error instanceof z.ZodError) {
    return {
      success: false,
      error: true,
      message: error.issues[0]?.message ?? "Check the submitted values.",
    };
  }

  if (typeof error === "object" && error !== null) {
    const details = error as {
      code?: string;
      meta?: { target?: string[] | string; field_name?: string };
      errors?: { longMessage?: string; message?: string }[];
      message?: string;
    };

    if (details.code === "P2002") {
      const target = Array.isArray(details.meta?.target)
        ? details.meta.target.join(", ")
        : String(details.meta?.target ?? "");
      const fields = target || "username, email, or phone";
      return {
        success: false,
        error: true,
        message: `That ${fields} is already in use.`,
      };
    }
    if (details.code === "P2003") {
      return {
        success: false,
        error: true,
        message: "This record is still referenced by related records.",
      };
    }
    if (details.code === "P2025") {
      return {
        success: false,
        error: true,
        message: "The record no longer exists.",
      };
    }

    const clerkMessage =
      details.errors?.[0]?.longMessage ?? details.errors?.[0]?.message;
    if (clerkMessage) {
      return { success: false, error: true, message: clerkMessage };
    }
    if (details.message) {
      return { success: false, error: true, message: details.message };
    }
  }

  return {
    success: false,
    error: true,
    message: "The operation could not be completed.",
  };
};

const deleteClerkUser = async (id: string) => {
  try {
    const client = await clerkClient();
    await client.users.deleteUser(id);
  } catch (err) {
    if ((err as { status?: number }).status !== 404) {
      throw err;
    }
  }
};

const getTeacherIdsForUser = async () => {
  const { userId } = await auth();

  if (!userId) {
    return [];
  }

  const client = await clerkClient();
  const clerkUser = await client.users.getUser(userId);
  const teacher = await prisma.teacher.findFirst({
    where: {
      OR: [
        { id: userId },
        ...(clerkUser.username ? [{ username: clerkUser.username }] : []),
      ],
    },
    select: { id: true },
  });

  return teacher ? [teacher.id] : [userId];
};

export const creatSubject = async (
  currentState: CurrentState,
  formData: FormData,
) => {
  const name = formData.get("name") as string;
  const teacherIds = formData.getAll("teachers").map(String);

  try {
    const classId = Number(formData.get("classId"));
    const classItem = await prisma.class.findUnique({
      where: { id: classId },
      include: { _count: { select: { students: true } } },
    });

    if (classItem && classItem.capacity === classItem._count.students) {
      return { success: false, error: true };
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
    const parsedData = createTeacherSchema.parse(data);
    const client = await clerkClient();
    const subjectIds = parsedData.subject
      .filter((subjectId): subjectId is string => Boolean(subjectId))
      .map(Number)
      .filter(Number.isInteger);

    await createClerkUserWithRollback(
      () => client.users.createUser({
        username: parsedData.userName,
        password: parsedData.password,
        firstName: parsedData.firstName,
        lastName: parsedData.lastName,
        publicMetadata: { role: "teacher" },
      }),
      (userId) => prisma.teacher.create({
        data: {
          id: userId,
          username: parsedData.userName,
          name: parsedData.firstName,
          surname: parsedData.lastName,
          email: parsedData.email || null,
          phone: parsedData.phone || null,
          address: parsedData.address,
          img: parsedData.img || null,
          bloodType: parsedData.bloodType,
          sex: parsedData.sex,
          birthday: new Date(parsedData.birthDate),
          subjects: { connect: subjectIds.map((id) => ({ id })) },
        },
      }),
    );

    return { success: true, error: false };
  } catch (err) {
    return failure("Error creating teacher", err);
  }
};

export const updateTeacher = async (
  currentState: CurrentState,
  data: TeacherSchemaInput,
) => {
  try {
    const parsedData = teacherSchema.parse(data);

    if (!parsedData.id) {
      return { success: false, error: true, message: "Teacher ID is required." };
    }

    const client = await clerkClient();
    await client.users.updateUser(parsedData.id, {
      username: parsedData.userName,
      ...(parsedData.password ? { password: parsedData.password } : {}),
      firstName: parsedData.firstName,
      lastName: parsedData.lastName,
    });

    const subjectIds = parsedData.subject
      .filter((subjectId): subjectId is string => Boolean(subjectId))
      .map(Number)
      .filter(Number.isInteger);

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
        bloodType: parsedData.bloodType,
        sex: parsedData.sex,
        birthday: new Date(parsedData.birthDate),
        subjects: {
          set: subjectIds.map((id) => ({ id })),
        },
      },
    });

    return { success: true, error: false };
  } catch (err) {
    return failure("Error updating teacher", err);
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
      await transaction.teacher.update({
        where: { id },
        data: { subjects: { set: [] } },
      });
      await transaction.teacher.delete({ where: { id } });
    });

    await deleteClerkUser(id);

    return { success: true, error: false };
  } catch (err) {
    console.log("Error deleting teacher:", err);
    return { success: false, error: true };
  }
};

// STUDENT CREATE

export const createStudent = async (
  currentState: CurrentState,
  data: StudentSchemaInput,
) => {
  let createdUserId: string | undefined;

  const parsedData = studentSchema.parse(data);
  try {
    const client = await clerkClient();
    const user = await client.users.createUser({
      username: parsedData.userName,
      password: parsedData.password,
      firstName: parsedData.firstName,
      lastName: parsedData.lastName,
      publicMetadata: { role: "student" },
    });

    createdUserId = user.id;

    await prisma.student.create({
      data: {
        id: user.id,
        username: parsedData.userName,
        name: parsedData.firstName ?? "",
        surname: parsedData.lastName ?? "",
        email: parsedData.email || null,
        phone: parsedData.phone || null,
        address: parsedData.address,
        img: parsedData.img || null,
        bloodType: parsedData.bloodType ?? "",
        gradeId: parsedData.gradeId,
        classId: parsedData.classId,
        parentId: parsedData.parentId!,
        sex: parsedData.sex,
        birthday: new Date(parsedData.birthDate),
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log("Error creating student:", err);

    if (createdUserId) {
      await deleteClerkUser(createdUserId);
    }

    return { success: false, error: true };
  }
};

export const updateStudent = async (
  currentState: CurrentState,
  data: StudentSchemaInput,
) => {
  try {
    if (!data.id) {
      return { success: false, error: true };
    }

    const existingStudent = await prisma.student.findUnique({
      where: { id: data.id },
    });

    if (!existingStudent) {
      return { success: false, error: true };
    }

    const parsedData = studentSchema.parse({
      ...data,
      birthDate:
        data.birthDate || existingStudent.birthday.toISOString().split("T")[0],
    });

    try {
      const client = await clerkClient();

      await client.users.updateUser(parsedData.id!, {
        username: parsedData.userName,
        ...(parsedData.password ? { password: parsedData.password } : {}),
        firstName: parsedData.firstName,
        lastName: parsedData.lastName,
      });
    } catch (err) {
      if ((err as { status?: number }).status !== 404) {
        throw err;
      }

      console.warn(`Clerk user ${parsedData.id} was not found.`);
    }

    await prisma.student.update({
      where: { id: parsedData.id },
      data: {
        username: parsedData.userName,
        name: parsedData.firstName,
        surname: parsedData.lastName,
        email: parsedData.email || null,
        phone: parsedData.phone || null,
        address: parsedData.address,
        img: parsedData.img || null,
        bloodType: parsedData.bloodType || "",
        sex: parsedData.sex,
        gradeId: parsedData.gradeId,
        classId: parsedData.classId,
        parentId: parsedData.parentId,
        birthday: new Date(parsedData.birthDate),
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.error("Error updating student:", err);
    return { success: false, error: true };
  }
};

export const deleteStudent = async (
  currentState: CurrentState,
  data: FormData,
) => {
  const id = data.get("id");

  if (typeof id !== "string" || id.trim() === "") {
    return { success: false, error: true };
  }

  try {
    await prisma.student.delete({
      where: { id },
    });

    await deleteClerkUser(id);

    return { success: true, error: false };
  } catch (err) {
    console.error("Error deleting student:", err);
    return { success: false, error: true };
  }
};

// EXAM CREATE

// EXAM CREATE

const getExamFormData = (formData: FormData) => {
  const title = String(formData.get("title") ?? "").trim();
  const startTime = new Date(String(formData.get("startTime") ?? ""));
  const endTime = new Date(String(formData.get("endTime") ?? ""));
  const lessonId = Number(formData.get("lessonId"));

  if (
    !title ||
    !Number.isInteger(lessonId) ||
    Number.isNaN(startTime.getTime()) ||
    Number.isNaN(endTime.getTime()) ||
    endTime <= startTime
  ) {
    return null;
  }

  return { title, startTime, endTime, lessonId };
};

const canManageLesson = async (lessonId: number) => {
  const { sessionClaims } = await auth();

  const role = String(
    (sessionClaims?.metadata as { role?: string })?.role ?? "",
  ).toLowerCase();

  if (role !== "teacher" && role !== "teachers") {
    return true;
  }

  const teacherIds = await getTeacherIdsForUser();

  const lesson = await prisma.lesson.findFirst({
    where: {
      id: lessonId,
      teacherId: { in: teacherIds },
    },
    select: { id: true },
  });

  return Boolean(lesson);
};

export const createExam = async (
  currentState: CurrentState,
  formData: FormData,
) => {
  try {
    const examData = getExamFormData(formData);

    if (!examData || !(await canManageLesson(examData.lessonId))) {
      return { success: false, error: true };
    }

    await prisma.exam.create({ data: examData });

    return { success: true, error: false };
  } catch (err) {
    console.error("Error creating exam:", err);
    return { success: false, error: true };
  }
};

export const updateExam = async (
  currentState: CurrentState,
  formData: FormData,
) => {
  try {
    const id = Number(formData.get("id"));
    const examData = getExamFormData(formData);

    if (
      !Number.isInteger(id) ||
      !examData ||
      !(await canManageLesson(examData.lessonId))
    ) {
      return { success: false, error: true };
    }

    await prisma.exam.update({
      where: { id },
      data: examData,
    });

    return { success: true, error: false };
  } catch (err) {
    console.error("Error updating exam:", err);
    return { success: false, error: true };
  }
};

export const DeleteExam = async (
  currentState: CurrentState,
  formData: FormData,
) => {
  try {
    const id = Number(formData.get("id"));

    if (!Number.isInteger(id)) {
      return { success: false, error: true };
    }

    const exam = await prisma.exam.findUnique({
      where: { id },
      select: { lessonId: true },
    });

    if (!exam || !(await canManageLesson(exam.lessonId))) {
      return { success: false, error: true };
    }

    await prisma.exam.delete({ where: { id } });

    return { success: true, error: false };
  } catch (err) {
    console.error("Error deleting exam:", err);
    return { success: false, error: true };
  }
};

const createClerkUserWithRollback = async <T>(
  createUser: () => Promise<{ id: string }>,
  saveRecord: (userId: string) => Promise<T>,
) => {
  let userId: string | undefined;

  try {
    const user = await createUser();
    userId = user.id;
    return await saveRecord(user.id);
  } catch (error) {
    if (userId) {
      try {
        await deleteClerkUser(userId);
      } catch (rollbackError) {
        console.error("Failed to roll back Clerk user:", rollbackError);
      }
    }
    throw error;
  }
};
