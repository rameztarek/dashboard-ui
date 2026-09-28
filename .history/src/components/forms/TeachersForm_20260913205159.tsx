"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputFiled from "../InputFiled";
import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import { TeacherSchemaInput, teacherSchema } from "@/lib/FormValidationSchema";
import { updateTeacher, createTeacher } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const TeachersForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(teacherSchema),
    mode: "onChange",
    defaultValues: {
      name: data?.name ?? "",
      teachers: data?.teachers?.[0] ?? "",
    },
  });

  const [state, formAction] = useActionState(
    type === "create" ? createTeacher : updateTeacher,
    {
      success: false,
      error: false,
    },
  );

  const router = useRouter();

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    formData.append("name", data.name);

    if (data.id !== undefined) {
      formData.append("id", String(data.id));
    }

    const teacherIds = Array.isArray(data.teachers)
      ? data.teachers
      : data.teachers
        ? [data.teachers]
        : [];

    teacherIds.forEach((teacherId) => formData.append("teachers", teacherId));

    startTransition(() => {
      formAction(formData);
    });
  });

  useEffect(() => {
    if (state.success) {
      toast(`Teacher has been ${type === "create" ? "created" : "updated"}!`);
      setOpen?.(false);
      router.refresh();
    }
  }, [router, setOpen, state.success, type]);

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{type === "create" ? "Create A New Teacher " : "Update A New Teacher`"}</h1>
      </div>

      <span className="text-gray-500 font-medium">
        Authentication Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputFiled
          label="First Name"
          name="name"
          defaultValue = {data?.name}
          register={register}
          error={errors.userName}
        />
        <InputFiled
          label="First Name"
          name="email"
          type="email"
          register={register}
          error={errors.email}
        />
        <InputFiled
          label="Password"
          name="password"
          type="password"
          register={register}
          error={errors.password}
        />
      </div>

      <span className="text-gray-500 font-medium">Personal Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputFiled
          label="First Name"
          name="firstName"
          register={register}
          error={errors.firstName}
        />
        <InputFiled
          label="Last Name"
          name="lastName"
          register={register}
          error={errors.lastName}
        />
        <InputFiled
          label="Phone Number"
          name="phone"
          type="tel"
          register={register}
          error={errors.phone}
        />
        <InputFiled
          label="Address"
          name="address"
          register={register}
          error={errors.address}
        />
        <InputFiled
          label="Birth Date"
          name="birthDate"
          type="date"
          register={register}
          error={errors.birthDate}
        />

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Sex</label>
          <select
            {...register("sex")}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.sex?.message && (
            <p className="text-sm text-red-400">
              {errors.sex.message.toString()}
            </p>
          )}
        </div>

        {/* Image — can't be set via setValue for security reasons; pick manually
        <InputFiled
          label="Image"
          name="img"
          type="file"
          register={register}
          error={errors.img}
          inputProps={{ accept: "image/*" }}
        /> */}
      </div>

      <button className="bg-blue-400 text-white rounded-md p-2">
        {type === "create" ? "create" : "update"}
      </button>
    </form>
  );
};

export default TeachersForm;
