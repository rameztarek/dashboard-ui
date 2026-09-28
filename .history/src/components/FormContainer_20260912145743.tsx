import prisma from "@/lib/prisma";
import FormModle from "./FormModle";

export type FormModalProps = {
  table:
    | "teachers"
    | "students"
    | "parents"
    | "subjects"
    | "classes"
    | "lessons"
    | "exams"
    | "assignments"
    | "results"
    | "attendance"
    | "events"
    | "announcements";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
  relatedData?: any;
};

const FormContainer = async ({ table, type, data, id }: FormModalProps) => {
  let relatedData = {};

  // جلب البيانات المرتبطة حسب نوع الجدول إن لزم الأمر
  if (type !== "delete") {
    if (table === "subjects") {
      const teachers = await prisma.teacher.findMany({
        select: { id: true, name: true, surname: true },
      });
      relatedData = { teachers };
    }
  }

  return (
    <FormModal
      table={table}
      type={type}
      data={data}
      id={id}
      relatedData={relatedData}
    />
  );
};

export default FormContainer;