import FormModle from "@/components/FormModle";
import { subjectSchema } from "@/lib/FormValidationSchema";
import prisma from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { Dispatch, SetStateAction } from "react";

export type FormModleProps = {
  table:
    | "teacher"
    | "teachers"
    | "student"
    | "students"
    | "parent"
    | "parents"
    | "subject"
    | "subjects"
    | "class"
    | "classes"
    | "lesson"
    | "lessons"
    | "exam"
    | "exams"
    | "assignment"
    | "assignments"
    | "result"
    | "results"
    | "attendance"
    | "attendances"
    | "event"
    | "events"
    | "announcement"
    | "error"
    | "announcements";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
  relatedData?: any;
  setOpen?: Dispatch<SetStateAction<boolean>>;
};

const FormContainer = async ({
  table,
  type,
  data,
  id,
  relatedData: providedRelatedData,
}: FormModleProps & { relatedData?: any }) => {
  let relatedData = providedRelatedData ?? {};

  if (type !== "delete" && !providedRelatedData) {
    switch (table) {
      case "subjects": {
        const subjectTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { teachers: subjectTeachers };
        break;
      }

      case "classes": {
        const classGrades = await prisma.grade.findMany({
          select: { id: true, level: true },
        });
        const classTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { teachers: classTeachers, grades: classGrades };
        break;
      }

      case "teacher":
      case "teachers": {
        const teacherSubject = await prisma.subject.findMany({
          select: { id: true, name: true },
        });
        relatedData = { subjects: teacherSubject };
        break;
      }

      case "student":
      case "students": {
        const studentGrades = await prisma.grade.findMany({
          select: { id: true, level: true },
        });
        const studentClasses = await prisma.class.findMany({
          include: { _count: { select: { students: true } } },
        });
        const studentParents = await prisma.parent.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = {
          classes: studentClasses,
          grades: studentGrades,
          parents: studentParents,
        };
        break;
      }

      case "exam": {
        const { userId, sessionClaims } = await auth();
        const role = (
          sessionClaims?.metadata as
            | {
                role?: "admin" | "teacher" | "teachers" | "student" | "parent";
              }
            | undefined
        )?.role;
        const examLessons = await prisma.lesson.findMany({
          where: {
            ...(role === "teacher" || role === "teachers"
              ? {
                  teacherId: {
                    in: await (async () => {
                      if (!userId) return [];
                      const client = await clerkClient();
                      const clerkUser = await client.users.getUser(userId);
                      const teacher = await prisma.teacher.findFirst({
                        where: {
                          OR: [
                            { id: userId },
                            ...(clerkUser.username
                              ? [{ username: clerkUser.username }]
                              : []),
                          ],
                        },
                        select: { id: true },
                      });
                      return teacher ? [teacher.id] : [userId];
                    })(),
                  },
                }
              : {}),
          },
          select: { id: true, name: true },
        });

        relatedData = { lessons: examLessons };
        break;
      }

      default:
        break;
    }
  }

  return (
    <div className="">
      <FormModle
        table={table}
        type={type}
        data={data}
        id={id}
        relatedData={relatedData}
      />
    </div>
  );
};

export default FormContainer;
