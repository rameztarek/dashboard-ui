"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import InputFiled from "../InputFiled";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  className: z.string().min(1, { message: "Class is required" }),
  dueDate: z.string().min(1, { message: "Due date is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  status: z.enum(["pending", "completed"], {
    message: "Please select a valid status",
  }),
});

const AssignmentForm = ({
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
    setValue("title", "Algebra Exercises", { shouldValidate: true });
    setValue("subject", "Mathematics", { shouldValidate: true });
    setValue("className", "4A", { shouldValidate: true });
    setValue("dueDate", "2025-01-20", { shouldValidate: true });
    setValue("description", "Complete exercises one through ten.", {
      shouldValidate: true,
    });
    setValue("status", "pending", { shouldValidate: true });
  };
  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Create A New Assignment</h1>
        <button
          type="button"
          onClick={fillSampleData}
          className="text-xs bg-lama-yellow text-white px-3 py-1.5 rounded-md"
        >
          Fill sample data
        </button>
      </div>
      <span className="text-gray-500 font-medium">Assignment Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputFiled
          label="Title"
          name="title"
          register={register}
          error={errors.title}
        />
        <InputFiled
          label="Subject"
          name="subject"
          register={register}
          error={errors.subject}
        />
        <InputFiled
          label="Class"
          name="className"
          register={register}
          error={errors.className}
        />
        <InputFiled
          label="Due Date"
          name="dueDate"
          type="date"
          register={register}
          error={errors.dueDate}
        />
        <InputFiled
          label="Description"
          name="description"
          register={register}
          error={errors.description}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Status</label>
          <select
            {...register("status")}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          >
            <option value="">Select status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          {errors.status?.message && (
            <p className="text-sm text-red-400">
              {errors.status.message.toString()}
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
export default AssignmentForm;
