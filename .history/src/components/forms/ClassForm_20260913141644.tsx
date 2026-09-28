"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import InputFiled from "../InputFiled";

const schema = z.object({
  name: z.string().min(1, { message: "Class name is required" }),
  capacity: z.string().min(1, { message: "Capacity is required" }),
  grade: z.enum(["1", "2", "3", "4", "5"], {
    message: "Please select a valid grade",
  }),
  supervisor: z.string().min(1, { message: "Supervisor is required" }),
});

const ClassForm = ({
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
    setValue("name", "4A", { shouldValidate: true });
    setValue("capacity", "30", { shouldValidate: true });
    setValue("grade", "4", { shouldValidate: true });
    setValue("supervisor", "John Doe", { shouldValidate: true });
  };
  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Create A New Class</h1>
        <button
          type="button"
          onClick={fillSampleData}
          className="text-xs bg-lama-yellow text-white px-3 py-1.5 rounded-md"
        >
          Fill sample data
        </button>
      </div>
      <span className="text-gray-500 font-medium">Class Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputFiled
          label="Class Name"
          name="name"
          register={register}
          error={errors.name}
        />
        <InputFiled
          label="Capacity"
          name="capacity"
          type="number"
          register={register}
          error={errors.capacity}
        />
        <InputFiled
          label="Supervisor"
          name="supervisor"
          register={register}
          error={errors.supervisor}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Grade</label>
          <select
            {...register("grade")}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          >
            <option value="">Select grade</option>
            <option value="1">Grade 1</option>
            <option value="2">Grade 2</option>
            <option value="3">Grade 3</option>
            <option value="4">Grade 4</option>
            <option value="5">Grade 5</option>
          </select>
          {errors.grade?.message && (
            <p className="text-sm text-red-400">
              {errors.grade.message.toString()}
            </p>
          )}
        </div>
      </div>
      <button className="bg-blue-400 text-white rounded-md p-2">
        {type === "create" ? "create" : "update"}
      </button>
    </form>
  );
};
export default ClassForm;
