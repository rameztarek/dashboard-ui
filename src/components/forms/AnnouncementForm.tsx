"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import InputFiled from "../InputFiled";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  date: z.string().min(1, { message: "Date is required" }),
  audience: z.enum(["students", "teachers", "parents"], {
    message: "Please select a valid audience",
  }),
});

const AnnouncementForm = ({
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

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const fillSampleData = () => {
    setValue("title", "Parent Meeting", { shouldValidate: true });
    setValue(
      "description",
      "The parent meeting will be held in the main hall.",
      { shouldValidate: true },
    );
    setValue("date", "2025-01-15", { shouldValidate: true });
    setValue("audience", "parents", { shouldValidate: true });
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Create A New Announcement</h1>
        <button
          type="button"
          onClick={fillSampleData}
          className="text-xs bg-lama-yellow text-white px-3 py-1.5 rounded-md"
        >
          Fill sample data
        </button>
      </div>
      <span className="text-gray-500 font-medium">
        Announcement Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputFiled
          label="Title"
          name="title"
          register={register}
          error={errors.title}
        />
        <InputFiled
          label="Description"
          name="description"
          register={register}
          error={errors.description}
        />
        <InputFiled
          label="Date"
          name="date"
          type="date"
          register={register}
          error={errors.date}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Audience</label>
          <select
            {...register("audience")}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          >
            <option value="">Select audience</option>
            <option value="students">Students</option>
            <option value="teachers">Teachers</option>
            <option value="parents">Parents</option>
          </select>
          {errors.audience?.message && (
            <p className="text-sm text-red-400">
              {errors.audience.message.toString()}
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

export default AnnouncementForm;
