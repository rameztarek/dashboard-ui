"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import {
  ComponentType,
  Dispatch,
  JSX,
  SetStateAction,
  useActionState,
  useEffect,
  useState,
} from "react";
import {
  deleteClass,
  deleteRecord,
  deleteStudent,
  deleteTeacher,
  DeletSubject,
} from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FormModleProps } from "./FormContainer";

const deleteActionMap = {
  subject: DeletSubject,
  class: deleteClass,
  teacher: deleteTeacher,
  student: deleteStudent,
  parent: deleteRecord,
  lesson: deleteRecord,
  exam: deleteRecord,
  assignment: deleteRecord,
  result: deleteRecord,
  attendance: deleteRecord,
  event: deleteRecord,
  announcement: deleteRecord,
};

const TeachersForm = dynamic(() => import("./forms/TeachersForm"), {
  loading: () => <h1>Loading...</h1>,
});
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <h1>Loading...</h1>,
});
const SubjectForm = dynamic(
  () =>
    import("./forms/SubjectForm").then(
      (module) => module.default as unknown as ComponentType<any>,
    ),
  {
    loading: () => <h1>Loading...</h1>,
  },
);

const ClassForm = dynamic(
  () =>
    import("./forms/ClassForm").then(
      (module) => module.default as unknown as ComponentType<any>,
    ),
  {
    loading: () => <h1>Loading...</h1>,
  },
);

const ExamForm = dynamic(
  () =>
    import("./forms/ClassForm").then(
      (module) => module.default as unknown as ComponentType<any>,
    ),
  {
    loading: () => <h1>Loading...</h1>,
  },
);

const forms: {
  [key: string]: (
    setOpen: Dispatch<SetStateAction<boolean>>,
    type: "create" | "update",
    data?: any,
    relatedData?: any,
  ) => JSX.Element;
} = {
  subject: (setOpen, type, data, relatedData) => (
    <SubjectForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  class: (setOpen, type, data, relatedData) => (
    <ClassForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  teacher: (setOpen, type, data, relatedData) => (
    <TeachersForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  student: (setOpen, type, data, relatedData) => (
    <StudentForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
};

const FormModal = ({
  table,
  type,
  data,
  id,
  relatedData,
}: FormModleProps & { relatedData?: any }) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";

  const bgColor =
    type === "create"
      ? "bg-lama-yellow"
      : type === "update"
        ? "bg-lama-sky"
        : "bg-lama-purple";

  const [open, setOpen] = useState(false);
  const normalizedTable =
    table === "classes"
      ? "class"
      : table.endsWith("s")
        ? table.slice(0, -1)
        : table;

  const Form = () => {
    const singularTable = normalizedTable;
    const deleteAction =
      deleteActionMap[singularTable as keyof typeof deleteActionMap];
    const action: (
      state: { success: boolean; error: boolean },
      payload: FormData,
    ) => Promise<{ success: boolean; error: boolean }> = (state, payload) =>
        (
          deleteAction as unknown as (
            state: { success: boolean; error: boolean },
            payload: FormData,
          ) => Promise<{ success: boolean; error: boolean }>
        )(state, payload);

    const [state, formAction] = useActionState(action, {
      success: false,
      error: false,
    });

    const router = useRouter();

    useEffect(() => {
      if (state.success) {
        toast(`${singularTable} has been deleted`);
        setOpen(false);
        router.refresh();
      }
    }, [state, router, singularTable]);

    return type === "delete" && id ? (
      <form action={formAction} className="flex flex-col gap-4 p-4">
        <input
          type="text|number"
          hidden
          name="table"
          defaultValue={singularTable}
        />
        <input type="hidden" name="id" defaultValue={id} />
        <span className="text-center font-medium">
          Are you sure you want to delete this {normalizedTable}?
        </span>
        <button
          type="submit"
          className="bg-red-700 text-white py-2 px-4 rounded-md w-max self-center border-none"
        >
          Delete
        </button>
        {state.error && (
          <p className="text-center text-sm text-red-500">
            Could not delete this {normalizedTable}.
          </p>
        )}
      </form>
    ) : type === "create" || type === "update" ? (
      (forms[normalizedTable]?.(setOpen, type, data, relatedData) ??
        "Form Not Found")
    ) : (
      "Form Not Found"
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

export default FormModal;
