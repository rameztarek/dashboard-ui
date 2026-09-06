"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import InputFiled from "../InputFiled";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  className: z.string().min(1, { message: "Class is required" }),
  date: z.string().min(1, { message: "Date is required" }),
  startTime: z.string().min(1, { message: "Start time is required" }),
  endTime: z.string().min(1, { message: "End time is required" }),
});

const ExamForm = ({
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
    setValue("title", "Midterm Examination", { shouldValidate: true });
    setValue("subject", "Mathematics", { shouldValidate: true });
    setValue("className", "4A", { shouldValidate: true });
    setValue("date", "2025-02-10", { shouldValidate: true });
    setValue("startTime", "09:00", { shouldValidate: true });
    setValue("endTime", "10:30", { shouldValidate: true });
  };
  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Create A New Exam</h1>
        <button
          type="button"
          onClick={fillSampleData}
          className="text-xs bg-lama-yellow text-white px-3 py-1.5 rounded-md"
        >
          Fill sample data
        </button>
      </div>
      <span className="text-gray-500 font-medium">Exam Information</span>
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
          label="Date"
          name="date"
          type="date"
          register={register}
          error={errors.date}
        />
        <InputFiled
          label="Start Time"
          name="startTime"
          type="time"
          register={register}
          error={errors.startTime}
        />
        <InputFiled
          label="End Time"
          name="endTime"
          type="time"
          register={register}
          error={errors.endTime}
        />
      </div>
      <button className="bg-blue-400 text-white rounded-md p-2">
        {type === "create" ? "create" : "update"}
      </button>
    </form>
  );
};
export default ExamForm;
