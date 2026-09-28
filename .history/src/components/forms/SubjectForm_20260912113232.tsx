"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputFiled from "../InputFiled";
import { subjectSchema, SubjectInput } from "@/lib/FormValidationSchema";
import { creatSubject } from "@/lib/actions";
import {
  startTransition,
  useActionState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SubjectForm = ({
  type,
  data,
  setOpen,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  // اختيار الـ Server Action المناسبة حسب العملية (Create أو Update)
  const action = type === "create" ? creatSubject : updateSubjec;

  const [state, formAction] = useActionState(action, {
    success: false,
    error: false,
  });

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SubjectInput>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      id: data?.id,
      name: data?.name || "",
    },
  });

  const onSubmit = handleSubmit((formDataInput) => {
    const formData = new FormData();
    formData.append("name", formDataInput.name);

    // إضافة الـ ID في حالة التعديل فقط
    if (type === "update" && data?.id) {
      formData.append("id", data.id.toString());
    }

    startTransition(() => {
      formAction(formData);
    });
  });

  const fillSampleData = () => {
    setValue("name", "Mathematics", { shouldValidate: true });
  };

  useEffect(() => {
    if (state.success) {
      toast(`Subject has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, setOpen, type]);

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

      {state.error && (
        <span className="text-red-500">Something Went Wrong!</span>
      )}

      <button className="bg-blue-400 text-white rounded-md p-2">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default SubjectForm;
