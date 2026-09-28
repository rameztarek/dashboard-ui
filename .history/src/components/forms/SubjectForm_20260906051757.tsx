"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import InputFiled from "../InputFiled";

const schema = z.object({
  name: z.string().min(1, { message: "Subject name is required" }),
  code: z.string().min(1, { message: "Subject code is required" }),
  teacher: z.string().min(1, { message: "Teacher is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

const SubjectForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema), mode: "onChange" });
  const onSubmit = handleSubmit((data) => console.log(data));
  const fillSampleData = () => {
    setValue("name", "Mathematics", { shouldValidate: true });
    setValue("code", "MATH101", { shouldValidate: true });
    setValue("teacher", "John Doe", { shouldValidate: true });
    setValue("description", "Foundations of mathematics and problem solving.", {
      shouldValidate: true,
    });
  };
  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Create A New Subject</h1>
        <button
          type="button"
          onClick={fillSampleData}
          className="text-xs bg-lama-yellow text-white px-3 py-1.5 rounded-md"
        >
          Fill sample data
        </button>
      </div>
      <span className="text-gray-500 font-medium">Subject Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputFiled
          label="Subject Name"
          name="name"
          register={register}
          error={errors.name}
        />
        <InputFiled
          label="Subject Code"
          name="code"
          register={register}
          error={errors.code}
        />
        <InputFiled
          label="Teacher"
          name="teacher"
          register={register}
          error={errors.teacher}
        />
        <InputFiled
          label="Description"
          name="description"
          register={register}
          error={errors.description}
        />
      </div>
      <button className="bg-blue-400 text-white rounded-md p-2">
        {type === "create" ? "create" : "update"}
      </button>
    </form>
  );
};
export default SubjectForm;
