import FormModle from "@/components/FormModle";
import prisma from "@/lib/prisma";

export type FormModleProps = {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
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

const FormContainer = async ({
  table,
  type,
  data,
  id,
}: FormModleProps & { relatedData?: any }) => {
  let relatedData = {};

  if (type !== "delete") {
    switch (table) {
      case "subject": {
        const subjectTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { teacher: subjectTeachers };
      }
    }
  }

  return (
    <div className="">
      <FormModle table={table} type={type} data={data} id={id} />
    </div>
  );
};

export default FormContainer;
