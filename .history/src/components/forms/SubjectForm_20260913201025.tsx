"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { startTransition, useActionState } from "react";
import { Teacher } from "@prisma/client"; 

import InputFiled from "../InputFiled";
import { subjectSchema } from "@/lib/FormValidationSchema";
import { creatSubject, updateSubject } from "@/lib/actions";
import { FormModleProps } from "../FormContainer";

const SubjectForm = ({
  type,
  data,
  setOpen,
  relatedData = {},
}: FormModleProps) => {
  const teachers = relatedData?.teachers || [];
  

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(subjectSchema),
    mode: "onChange",
    defaultValues: {
      name: data?.name ?? "",
      teachers: data?.teachers?.[0] ?? "",
    },
  });

  const [state, formAction] = useActionState(
    type === "create" ? creatSubject : updateSubject,
    {
      success: false,
      error: false,
    },
  );


  const onSubmit = handleSubmit((formValues) => {
    const formData = new FormData();
    formData.append("name", formValues.name);

    if (formValues.id !== undefined) {
      formData.append("id", String(formValues.id));
    }

    const teacherIds = Array.isArray(formValues.teachers)
      ? formValues.teachers
      : formValues.teachers
        ? [formValues.teachers]
        : [];

    teacherIds.forEach((teacherId) => formData.append("teachers", teacherId));

    startTransition(() => {
      formAction(formData);
    });
  });


  useEffect(() => {
    if (state.success) {
      toast(`Subject has been ${type === "create" ? "created" : "updated"}!`);
      setOpen?.(false);
      router.refresh();
    }
  }, [router, setOpen, state.success, type]);

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold">
          {type === "create" ? "Create A New Subject" : "Update The Subject"}
        </h1>
      </div>

      <div className="flex justify-between flex-wrap gap-4">
        <InputFiled
          label="Subject Name"
          name="name"
          register={register}
          error={errors?.name}
        />

        {data && (
          <InputFiled
            label="id"
            name="id"
            defaultValue={data?.id !== undefined ? String(data.id) : undefined}
            register={register}
            error={errors?.id}
            hidden
          />
        )}

        <div className="flex flex-col gap-2 w-full md:w-[48%]">
          <label className="text-xs text-gray-500">Teachers</label>
          <select
          multiple
            {...register("teachers")}
            defaultValue={data?.teachers?.[0] ?? ""}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          >
            <option value="">Select a teacher</option>
            {teachers.map((teacher: Teacher) => (
              <option value={teacher.id} key={teacher.id}>
                {teacher.name} {teacher.surname}
              </option>
            ))}
          </select>
          {errors.teachers?.message && (
            <p className="text-sm text-red-400">
              {errors.teachers.message.toString()}
            </p>
          )}
        </div>
      </div>

      {state.error && <span className="text-red-500">Somting Went Wrong</span>}

      <button className="bg-blue-400 text-white rounded-md p-2">
        {type === "create" ? "create" : "update"}
      </button>
    </form>
  );
};

export default SubjectForm;
