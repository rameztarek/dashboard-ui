"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, startTransition, useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import InputFiled from "../InputFiled";
import { StudentSchemaInput, studentSchema } from "@/lib/FormValidationSchema";
import { createStudent, updateStudent } from "@/lib/actions";

const StudentForm = ({
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
  const { register, handleSubmit, formState: { errors } } = useForm<StudentSchemaInput>({
    resolver: zodResolver(studentSchema),
    mode: "onChange",
    defaultValues: {
      id: data?.id,
      userName: data?.username ?? "",
      email: data?.email ?? "",
      firstName: data?.name ?? "",
      lastName: data?.surname ?? "",
      phone: data?.phone ?? "",
      address: data?.address ?? "",
      birthDate: data?.birthday?.toISOString().split("T")[0] ?? "",
      sex: data?.sex ?? "",
      bloodType: data?.bloodType ?? "",
      parentId: data?.parentId ?? "",
      classId: data?.classId,
      gradeId: data?.gradeId,
    },
  });

  const [state, formAction] = useActionState(
    type === "create" ? createStudent : updateStudent,
    { success: false, error: false },
  );
  const router = useRouter();

  const onSubmit = handleSubmit((formData) => {
    startTransition(() => formAction(formData));
  });

  useEffect(() => {
    if (state.success) {
      toast(`Student has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [router, setOpen, state.success, type]);

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create A New Student" : "Update The Student"}
      </h1>
      <span className="text-gray-500 font-medium">Authentication Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputFiled label="Username" name="userName" register={register} error={errors.userName} />
        <InputFiled label="Email" name="email" type="email" register={register} error={errors.email} />
        <InputFiled label={type === "update" ? "New Password (optional)" : "Password"} name="password" type="password" inputProps={{ autoComplete: "new-password" }} register={register} error={errors.password} />
      </div>
      <span className="text-gray-500 font-medium">Personal Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputFiled label="First Name" name="firstName" register={register} error={errors.firstName} />
        <InputFiled label="Last Name" name="lastName" register={register} error={errors.lastName} />
        <InputFiled label="Phone Number" name="phone" type="tel" register={register} error={errors.phone} />
        <InputFiled label="Address" name="address" register={register} error={errors.address} />
        <InputFiled label="Birth Date" name="birthDate" type="date" register={register} error={errors.birthDate} />
        <InputFiled label="Blood Type" name="bloodType" register={register} error={errors.bloodType} />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Sex</label>
          <select {...register("sex")} className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full">
            <option value="">Select gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
          {errors.sex?.message && <p className="text-sm text-red-400">{errors.sex.message}</p>}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Parent</label>
          <select {...register("parentId")} className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full">
            <option value="">Select parent</option>
            {(relatedData?.parents ?? []).map((parent: any) => <option value={parent.id} key={parent.id}>{parent.name} {parent.surname}</option>)}
          </select>
          {errors.parentId?.message && <p className="text-sm text-red-400">{errors.parentId.message}</p>}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Class</label>
          <select {...register("classId")} className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full">
            <option value="">Select class</option>
            {(relatedData?.classes ?? []).map((item: any) => <option value={item.id} key={item.id}>{item.name}</option>)}
          </select>
          {errors.classId?.message && <p className="text-sm text-red-400">{errors.classId.message}</p>}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Grade</label>
          <select {...register("gradeId")} className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full">
            <option value="">Select grade</option>
            {(relatedData?.grades ?? []).map((item: any) => <option value={item.id} key={item.id}>{item.level}</option>)}
          </select>
          {errors.gradeId?.message && <p className="text-sm text-red-400">{errors.gradeId.message}</p>}
        </div>
      </div>
      <button className="bg-blue-400 text-white rounded-md p-2">{type === "create" ? "create" : "update"}</button>
      {state.error && <p className="text-center text-sm text-red-500">Could not save this student. Check the fields and try again.</p>}
    </form>
  );
};

export default StudentForm;
