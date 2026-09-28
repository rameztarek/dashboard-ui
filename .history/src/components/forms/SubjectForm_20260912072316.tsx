"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputFiled from "../InputFiled";
import { subjectSchema, SubjectInput  } from '@/lib/FormValidationSchema';



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
  } = useForm <SubjectInput> ({ resolver: zodResolver(subjectSchema), mode: "onChange" });
  const onSubmit = handleSubmit((data) =>{
    console.log(data)
    creatSubject(data)
});
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
        <h1 className="text-xl font-semibold">{type === "create" ? "Create A New Subject" : "Update The Subject"}</h1>
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
          label="Subject Name"
          name="name"
          register={register}
          error={errors?.name}
        />
      </div>
      <button className="bg-blue-400 text-white rounded-md p-2">
        {type === "create" ? "create" : "update"}
      </button>
    </form>
  );
};
export default SubjectForm;
