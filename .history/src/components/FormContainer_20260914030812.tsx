import FormModle from "@/components/FormModle";
import { subjectSchema } from "@/lib/FormValidationSchema";
import prisma from "@/lib/prisma";
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
      case "s"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputFiled from "../InputFiled";
import {
  Dispatch,
  SetStateAction,
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
import { TeacherSchemaInput, teacherSchema } from "@/lib/FormValidationSchema";
import { updateTeacher, createTeacher } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const TeachersForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const [img, setImg] = useState<{ secure_url: string } | undefined>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TeacherSchemaInput>({
    resolver: zodResolver(teacherSchema),
    mode: "onChange",
    defaultValues: {
      userName: data?.username ?? "",
      firstName: data?.name ?? "",
      lastName: data?.surname ?? "",
      email: data?.email ?? "",
      phone: data?.phone ?? "",
      address: data?.address ?? "",
      birthDate: data?.birthday ?? "",
      sex: data?.sex ?? "",
      subject: data?.subjects?.map((s: any) => String(s.id)) ?? [],
    },
  });

  const [state, formAction] = useActionState(
    type === "create" ? createTeacher : updateTeacher,
    {
      success: false,
      error: false,
    },
  );

  const router = useRouter();

  const onSubmit = handleSubmit((formValues) => {
    startTransition(() => {
      formAction({ ...formValues, img: img?.secure_url });
    });
  });

  useEffect(() => {
    if (state.success) {
      toast(`Teacher has been ${type === "create" ? "created" : "updated"}!`);
      setOpen?.(false);
      router.refresh();
    }
  }, [router, setOpen, state.success, type]);bjects":
        const subjectTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { teachers: subjectTeachers };

        break;

      case "classes":
        const classGrades = await prisma.grade.findMany({
          select: { id: true, level: true },
        });
        const classTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { teachers: classTeachers, grades: classGrades };

        break;

      case "teacher":
        const teacherSubject = await prisma.subject.findMany({
          select: { id: true, name: true },
        });
        relatedData = { subjects: teacherSubject };

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
