"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputFiled from "../InputFiled";
import { subjectSchema, SubjectInput } from "@/lib/FormValidationSchema";
import { creatSubject } from "@/lib/actions";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SubjectForm = ({
  type,
  data,
  setOpen,
}: {
  type: "create" | "update";
  data?: any;
  setOpen:
}) => {
  const [state, formAction] = useFormState(creatSubject, {
    success: false,
    error: false,
  });

  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SubjectInput>({
    resolver: zodResolver(subjectSchema),
    mode: "onChange",
  });

  const onSubmit = handleSubmit((data) => {
    console.log("Form submitted:", data);
    formAction(data);
  });
  const fillSampleData = () => {
    setValue("name", "Mathematics", { shouldValidate: true });
    {
    }
  };

  useEffect(() => {
    if (state.success) {
      toast(`Subject has been ${type === "create" ? "created" : "Updated"}!`);
    }
  }, [state]);

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">
          {type === "create" ? "Create A New Subject" : "Update The Subject"}
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
          label="Subject Name"
          name="name"
          register={register}
          error={errors?.name}
        />
      </div>
      {state.error && <span className="text-red-500">Somting Went Wrong</span>}
      <button className="bg-blue-400 text-white rounded-md p-2">
        {type === "create" ? "create" : "update"}
      </button>
    </form>
  );
};
export default SubjectForm;
