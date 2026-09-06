"use client";

import Image from "next/image";
import { useState } from "react";
import { JSX } from "react";
import dynamic from "next/dynamic";

const TeachersForm = dynamic(() => import("./forms/TeachersForm"), {
  loading: () => <h1>Loading</h1>,
});
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <h1>Loading</h1>,
});

const forms: {
  [key: string]: (type: "create" | "update", data?: any) => JSX.Element;
} = {
  teachers: (type, data) => <TeachersForm type={type} data={data} />,
  students: (type, data) => <StudentForm type={type} data={data} />,
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
  id?: number;
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
        <span className="text-center font-medium ">
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
      forms[table](type, data)
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
        <div className="absolute top-0 left-0 bg-black/50 w-screen h-screen z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />
            <div
              className=" absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="" width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModle;
