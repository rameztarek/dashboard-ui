"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { startTransition, useActionState } from "react";
import { Teacher } from "@prisma/client";

import InputFiled from "../InputFiled";
import {
  ClassSchema,
  classSchema,
  subjectSchema,
} from "@/lib/FormValidationSchema";
import {
  createClass,
  creatSubject,
  updateClass,
  updateSubject,
} from "@/lib/actions";
import { FormModleProps } from "../FormContainer";
import { Grade } from '../../generated/prisma/browser';

const ClassForm = ({
  type,
  data,
  setOpen,
  relatedData = {},
}: FormModleProps) => {
  const teachers = relatedData?.teachers || [];

  const [state, formAction] = useActionState(
    type === "create" ? createClass : updateClass,
    {
      success: false,
      error: false,
    },
  );

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ClassSchema>({
    resolver: zodResolver(classSchema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    formAction(data);
  });

  const fillSampleData = () => {
    setValue("name", "Mathematics", { shouldValidate: true });
    if (teachers.length > 0) {
      setValue("supervisorId", teachers[0].id, { shouldValidate: true });
    }
  };

  useEffect(() => {
    if (state.success) {
      toast(`Subject has been ${type === "create" ? "created" : "updated"}!`);
      setOpen?.(false);
      router.refresh();
    }
  }, [router, setOpen, state.success, type]);

  const { teacher, grades } = relatedData;

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold">
          {type === "create" ? "Create A New Class" : "Update The Class"}
        </h1>
        <button
          type="button"
          onClick={fillSampleData}
          className="text-xs bg-lama-yellow text-white px-3 py-1.5 rounded-md"
        >
          Fill sample data
        </button>
      </div>

      <div className="flex justify-between flex-wrap gap-4">
        <InputFiled
          label="Class Name"
          name="name"
          register={register}
          error={errors?.name}
        />

        <InputFiled
          label="Capacity"
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
          <label className="text-xs text-gray-500">Supervisor</label>
          <select
            {...register("supervisorId")}
            defaultValue={data?.teachers?.[0] ?? ""}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          >
            <option value="">Select a Supervisor</option>
            {teachers.map((teacher: Teacher) => (
              <option value={teacher.id} key={teacher.id}>
                {teacher.name} {teacher.surname}
              </option>
            ))}
          </select>
          {errors.supervisorId?.message && (
            <p className="text-sm text-red-400">
              {errors.supervisorId.message.toString()}
            </p>
          )}
        </div>
      </div>

        <div className="flex flex-col gap-2 w-full md:w-[48%]">
          <label className="text-xs text-gray-500">Grade</label>
          <select
            {...register("supervisorId")}
            defaultValue={data?.teachers?.[0] ?? ""}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          >
            <option value="">Select a Grade</option>
            {grades.map((teacher: Teacher) => (
              <option value={teacher.id} key={teacher.id}>
                {teacher.name} {teacher.surname}
              </option>
            ))}
          </select>
          {errors.supervisorId?.message && (
            <p className="text-sm text-red-400">
              {errors.supervisorId.message.toString()}
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

export default ClassForm;
