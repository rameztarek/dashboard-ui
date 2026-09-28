import FormModle from "@/components/FormModle";
import { subjectSchema } from "@/lib/FormValidationSchema";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
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
}: FormModleProps & { relatedData?: any }) => {
  let relatedData = {};

  if (type !== "delete") {
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
        relatedData = { classes: studentClasses, grades: studentGrades };
        break;
      }

      case "exam": {
        const {userId , sessionClass},
        });
        relatedData = { classes: examClasses };
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
