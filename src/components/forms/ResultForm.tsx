"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import InputFiled from "../InputFiled";

const schema = z.object({
  student: z.string().min(1, { message: "Student is required" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  exam: z.string().min(1, { message: "Exam is required" }),
  score: z.string().min(1, { message: "Score is required" }),
  grade: z.enum(["A", "B", "C", "D", "F"], {
    message: "Please select a valid grade",
  }),
  date: z.string().min(1, { message: "Date is required" }),
});

const ResultForm = ({
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
    setValue("student", "John Doe", { shouldValidate: true });
    setValue("subject", "Mathematics", { shouldValidate: true });
    setValue("exam", "Midterm Examination", { shouldValidate: true });
    setValue("score", "92", { shouldValidate: true });
    setValue("grade", "A", { shouldValidate: true });
    setValue("date", "2025-02-15", { shouldValidate: true });
  };
  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Create A New Result</h1>
        <button
          type="button"
          onClick={fillSampleData}
          className="text-xs bg-lama-yellow text-white px-3 py-1.5 rounded-md"
        >
          Fill sample data
        </button>
      </div>
      <span className="text-gray-500 font-medium">Result Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputFiled
          label="Student"
          name="student"
          register={register}
          error={errors.student}
        />
        <InputFiled
          label="Subject"
          name="subject"
          register={register}
          error={errors.subject}
        />
        <InputFiled
          label="Exam"
          name="exam"
          register={register}
          error={errors.exam}
        />
        <InputFiled
          label="Score"
          name="score"
          type="number"
          register={register}
          error={errors.score}
        />
        <InputFiled
          label="Date"
          name="date"
          type="date"
          register={register}
          error={errors.date}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Grade</label>
          <select
            {...register("grade")}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          >
            <option value="">Select grade</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="F">F</option>
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
export default ResultForm;
