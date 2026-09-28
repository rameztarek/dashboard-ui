"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputFiled from "../InputFiled";
import { subjectSchema, SubjectInput } from "@/lib/FormValidationSchema";
import { creatSubject, updateSubject } from "@/lib/actions";
import { startTransition, useActionState } from "react"; // Uses the React 19 action state API supported by this project.
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SubjectForm = ({
  type,
  data,
  setOpen,
  relatedData = {},
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData: any;
}) => {
  const teachers = relatedData?.teachers || [];

  const [state, formAction] = useActionState(
    async (
      currentState: { success: boolean; error: boolean },
      formData: FormData,
    ) => {
      if (type === "create") {
        return creatSubject(currentState, formData);
      }

      return updateSubject(currentState, {
        id: Number(formData.get("id")),
        name: String(formData.get("name") || ""),
        teachers: formData.getAll("teachers").map(String),
      });
    },
    {
      success: false,
      error: false,
    },
  );

  const router = useRouter();

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
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.id !== undefined) formData.append("id", String(data.id));
    data.teachers?.forEach((teachers) => formData.append("teachers", teachers));
    startTransition(() => {
      formAction(formData); // Sends the validated form data to the server action.
    });
  });
  const fillSampleData = () => {
    setValue("name", "Mathematics", { shouldValidate: true });
    {
    }
  };

  useEffect(() => {
    if (state.success) {
      toast(`Subject has been ${type === "create" ? "created" : "Updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state]);

  const {teacher} - relatedDate
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
        {data && (
          <InputFiled
            label="id"
            name="id"
            defaultValue={data?.id}
            register={register}
            error={errors?.id}
            hidden
          />
        )}
        
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Teachers</label>
          <select
            {...register("teachers")}
            className="ring-[1  .5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          >
            {teachers.map()())}
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.teachers?.message && (
            <p className="text-sm text-red-400">
              {errors.teachers.message.toString()}
            </p>
          )}
        </div>
      </div>
      {state.error && <span className="text-red-500">Somting Went Wrong</span>}
      <button className="bg-blue-400 text-white rounded-md p-2">
        {type === "create" ? "create" : "update"}
      </button>
    </form>
  );
};
export default SubjectForm;
