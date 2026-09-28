


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

const FormContainer = () => {
  return (
    <div className=''></div>
  )
}

export default FormContainer