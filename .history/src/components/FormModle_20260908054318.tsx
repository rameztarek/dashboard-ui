"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { JSX, useState } from "react";

const TeachersForm = dynamic(() => import("./forms/TeachersForm"), {
  loading: () => <h1>Loading</h1>,
});

const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <h1>Loading</h1>,
});

const ParentForm = dynamic(() => import("./forms/ParentForm"), {
  loading: () => <h1>Loading</h1>,
});

const SubjectForm = dynamic(() => import("./forms/SubjectForm"), {
  loading: () => <h1>Loading</h1>,
});

const ClassForm = dynamic(() => import("./forms/ClassForm"), {
  loading: () => <h1>Loading</h1>,
});

const LessonForm = dynamic(() => import("./forms/LessonForm"), {
  loading: () => <h1>Loading</h1>,
});

const ExamForm = dynamic(() => import("./forms/ExamForm"), {
  loading: () => <h1>Loading</h1>,
});

const AssignmentForm = dynamic(() => import("./forms/AssignmentForm"), {
  loading: () => <h1>Loading</h1>,
});

const ResultForm = dynamic(() => import("./forms/ResultForm"), {
  loading: () => <h1>Loading</h1>,
});

const AnnouncementForm = dynamic(() => import("./forms/AnnouncementForm"), {
  loading: () => <h1>Loading</h1>,
});

const EventForm = dynamic(() => import("./forms/EventForm"), {
  loading: () => <h1>Loading</h1>,
});

const forms: {
  [key: string]: (type: "create" | "update", data?: any) => JSX.Element;
} = {
  teachers: (type, data) => <TeachersForm type={type} data={data} />,
  students: (type, data) => <StudentForm type={type} data={data} />,
  parents: (type, data) => <ParentForm type={type} data={data} />,
  subjects: (type, data) => <SubjectForm type={type} data={data} />,
  classes: (type, data) => <ClassForm type={type} data={data} />,
  lessons: (type, data) => <LessonForm type={type} data={data} />,
  exams: (type, data) => <ExamForm type={type} data={data} />,
  assignments: (type, data) => <AssignmentForm type={type} data={data} />,
  results: (type, data) => <ResultForm type={type} data={data} />,
  announcements: (type, data) => <AnnouncementForm type={type} data={data} />,
  events: (type, data) => <EventForm type={type} data={data} />,
};

type FormModleProps = {
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
    | "announcements"
    | "attendance"
    | "events";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | String;
};

const FormModle = ({ table, type, data, id }: FormModleProps) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";

  const bgColor =
    type === "create"
      ? "bg-lama-yellow"
      : type === "update"
        ? "bg-lama-sky"
        : "bg-lama-purple";

  const [open, setOpen] = useState(false);

  const Form = () => {
    return type === "delete" && id ? (
      <form action="" className="flex flex-col gap-4 p-4">
        <span className="text-center font-medium">
          Are you sure you want to delete this {table}?
        </span>
        <button
          type="submit"
          className="bg-red-700 text-white py-2 px-4 rounded-md w-max self-center border-none"
        >
          Delete
        </button>
      </form>
    ) : type === "create" || type === "update" ? (
      (forms[table]?.(type, data) ?? "Not Found Update")
    ) : (
      "Not Found Update"
    );
  };

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt={type} width={16} height={16} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative max-h-[90vh] w-[90%] overflow-hidden rounded-md bg-white shadow md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <div className="max-h-[90vh] overflow-y-auto p-4">
              <Form />
            </div>

            <button
              type="button"
              aria-label="Close modal"
              className="absolute right-4 top-4 z-10 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="" width={14} height={14} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModle;
