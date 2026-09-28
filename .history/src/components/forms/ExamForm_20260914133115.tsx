"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useActionState, startTransition } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import InputFiled from "../InputFiled";
import { examSchema } from "@/lib/FormValidationSchema";
import { createExam, updateExam } from "@/lib/actions";
import { FormModleProps } from "../FormContainer";

const formatDateTime = (value?: string | Date | null) => {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
};

const ExamForm = ({
  type,
  data,
  setOpen,
  relatedData = {},
}: FormModleProps) => {
  const lessons = relatedData?.lessons ?? [];

  const [state, formAction] = useActionState(
    type === "create" ? createExam : updateExam,
    {
      success: false,
      error: false,
    },
  );

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(examSchema),
    mode: "onChange",
    defaultValues: {
      id: data?.id,
      title: data?.title ?? "",
      startTime: formatDateTime(data?.startTime),
      endTime: formatDateTime(data?.endTime),
      lessonId: data?.lessonId ? String(data.lessonId) : "",
    },
  });

  const onSubmit = handleSubmit((values) => {
    const formData = new FormData();

    if (values.id !== undefined) {
      formData.append("id", String(values.id));
    }

    formData.append("title", values.title);
    formData.append("startTime", String(values.startTime));
    formData.append("endTime", tringvalues.endTime);
    formData.append("lessonId", String(values.lessonId));

    startTransition(() => {
      formAction(formData);
    });
  });

  useEffect(() => {
    if (state.success) {
      toast.success(`Exam ${type === "create" ? "created" : "updated"} successfully`);
      setOpen?.(false);
      router.refresh();
    }
  }, [state.success, type, setOpen, router]);

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create A New Exam" : "Update The Exam"}
      </h1>

      <InputFiled
        label="Exam Title"
        name="title"
        register={register}
        error={errors.title}
      />

      <InputFiled
        label="Start Date"
        name="startTime"
        type="datetime-local"
        register={register}
        error={errors.startTime}
      />

      <InputFiled
        label="End Date"
        name="endTime"
        type="datetime-local"
        register={register}
        error={errors.endTime}
      />

      <div className="flex flex-col gap-2">
        <label className="text-xs text-gray-500">Lesson</label>

        <select
          {...register("lessonId")}
          className="rounded-md p-2 text-sm ring-[1.5px] ring-gray-300"
        >
          <option value="">Select a lesson</option>

          {lessons.map((lesson: { id: number; name: string }) => (
            <option key={lesson.id} value={lesson.id}>
              {lesson.name}
            </option>
          ))}
        </select>

        {errors.lessonId?.message && (
          <p className="text-sm text-red-400">
            {String(errors.lessonId.message)}
          </p>
        )}
      </div>

      {state.error && (
        <p className="text-red-500">Something went wrong.</p>
      )}

      <button
        type="submit"
        className="rounded-md bg-blue-400 p-2 text-white"
      >
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default ExamForm;