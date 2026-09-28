import FormModle from "@/components/FormModle";
import prisma from "@/lib/prisma";



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
    | "announcement"
    | "announcements"
    | "attendance"
    | "attendances"
    | "event"
    | "events";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
};

const FormContainer = async ({ table, type, data, id }: FormModleProps) => {

let relatedData = {}

if(type !== "delete"){
  switch(table){
    case "subject":
      const subjectTeachers = await prisma.teacher.findMany({
        select:{id:true , name: true , surname:true},
      })
  }
}

  return (
    <div className="">
      <FormModel table={table} type={type} data={data} id={id} />
    </div>
  );
};

export default FormContainer;
