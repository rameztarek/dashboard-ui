"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputFiled from "../InputFiled";
import { subjectSchema, SubjectInput } from "@/lib/FormValidationSchema";
import { creatSubject } from "@/lib/actions";
import { startTransition, useActionState } from "react"; // Uses the React 19 action state API supported by this project.
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { UpdateSubject } from "../../../.history/src/lib/actions_20260912110643";

const SubjectForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData: any;
}) => {
  const [state, formAction] = useActionState(
    type === "create" ? creatSubject : UpdateSubject,
    {
      // Connects the subject action to React's pending/result state.
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
    const formData = new FormData(); // Creates the payload expected by the ser
    // er action.
    formData.append("name", data.name); // Adds the validated subject name to the action payload.
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

  const { teachers } = relatedData;

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
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("teachers")}
            defaultValue={data?.teachers}
          >
            {teachers.map(
              (teacher: { id: string; name: string; surname: string }) => {
                <option value="male">{}teacher,name}</option>;
              },
            )}
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
