"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import InputFiled from "../InputFiled";

const schema = z.object({
  subject: z.string().min(1, { message: "Subject is required" }),
  className: z.string().min(1, { message: "Class is required" }),
  day: z.enum(["monday", "tuesday", "wednesday", "thursday", "friday"], {
    message: "Please select a valid day",
  }),
  startTime: z.string().min(1, { message: "Start time is required" }),
  endTime: z.string().min(1, { message: "End time is required" }),
  room: z.string().min(1, { message: "Room is required" }),
});

const LessonForm = ({
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
    setValue("subject", "Mathematics", { shouldValidate: true });
    setValue("className", "4A", { shouldValidate: true });
    setValue("day", "monday", { shouldValidate: true });
    setValue("startTime", "08:00", { shouldValidate: true });
    setValue("endTime", "08:45", { shouldValidate: true });
    setValue("room", "Room 101", { shouldValidate: true });
  };
  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Create A New Lesson</h1>
        <button
          type="button"
          onClick={fillSampleData}
          className="text-xs bg-lama-yellow text-white px-3 py-1.5 rounded-md"
        >
          Fill sample data
        </button>
      </div>
      <span className="text-gray-500 font-medium">Lesson Information</span>
      <div className="flex justify-between flex-wrap gap-4">
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
          label="Room"
          name="room"
          register={register}
          error={errors.room}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Day</label>
          <select
            {...register("day")}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          >
            <option value="">Select day</option>
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
          </select>
          {errors.day?.message && (
            <p className="text-sm text-red-400">
              {errors.day.message.toString()}
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
export default LessonForm;
