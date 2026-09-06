"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import InputFiled from "../InputFiled";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  date: z.string().min(1, { message: "Date is required" }),
  startTime: z.string().min(1, { message: "Start time is required" }),
  endTime: z.string().min(1, { message: "End time is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

const EventForm = ({
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
    setValue("title", "Science Fair", { shouldValidate: true });
    setValue("date", "2025-01-25", { shouldValidate: true });
    setValue("startTime", "10:00", { shouldValidate: true });
    setValue("endTime", "12:00", { shouldValidate: true });
    setValue("description", "Annual science fair for all students.", {
      shouldValidate: true,
    });
  };
  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Create A New Event</h1>
        <button
          type="button"
          onClick={fillSampleData}
          className="text-xs bg-lama-yellow text-white px-3 py-1.5 rounded-md"
        >
          Fill sample data
        </button>
      </div>
      <span className="text-gray-500 font-medium">Event Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputFiled
          label="Title"
          name="title"
          register={register}
          error={errors.title}
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
export default EventForm;
