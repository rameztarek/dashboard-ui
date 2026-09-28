"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputFiled from "../InputFiled";
import {
  Dispatch,
  SetStateAction,
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
import { StudentSchemaInput, studentSchema } from "@/lib/FormValidationSchema";
import { updateStudent, createStudent } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

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
  const [img, setImg] = useState<{ secure_url: string } | undefined>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<z.input<typeof studentSchema>, any, StudentSchemaInput>({
    resolver: zodResolver(studentSchema),
    mode: "onChange",
    defaultValues: {
      userName: data?.username ?? "",
      firstName: data?.name ?? "",
      lastName: data?.surname ?? "",
      email: data?.email ?? "",
      phone: data?.phone ?? "",
      address: data?.address ?? "",
      birthDate: data?.birthday ?? "",
      sex: data?.sex ?? "",
      gradeId: data?.gradeId ?? undefined,
      classId: data?.classId ?? undefined,
      subject: data?.subjects?.map((s: any) => String(s.id)) ?? [],
    },
  });

  const [state, formAction] = useActionState(
    type === "create" ? createStudent : updateStudent,
    {
      success: false,
      error: false,
    },
  );

  const router = useRouter();

  const onSubmit = handleSubmit((formValues) => {
    startTransition(() => {
      formAction({ ...formValues, img: img?.secure_url });
    });
  });
  useEffect(() => {
    if (state.success) {
      toast(`Student has been ${type === "create" ? "created" : "updated"}!`);
      setOpen?.(false);
      router.refresh();
    }
  }, [router, setOpen, state.success, type]);


  

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">
          {type === "create" ? "Create A New Student" : "Update The Student"}
        </h1>
      </div>

      <span className="text-gray-500 font-medium">
        Authentication Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputFiled
          label="Username"
          name="userName"
          defaultValue={data?.userName}

          register={register}
          error={errors.userName}
        />
        <InputFiled
          label="Email"
          name="email"
          defaultValue={data?.email}

          type="email"
          register={register}
          error={errors.email}
        />
        <InputFiled
          label={type === "update" ? "New Password (optional)" : "Password"}
          name="password"
          type="password"
          inputProps={{ autoComplete: "new-password" }}
          register={register}
          error={errors.password}
        />
      </div>

      <span className="text-gray-500 font-medium">Personal Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputFiled
          label="First Name"
          name="firstName"
          defaultValue={data?.firstName}

          register={register}
          error={errors.firstName}
        />
        <InputFiled
          label="Last Name"
          name="lastName"
          defaultValue={data?.lastName}

          register={register}
          error={errors.lastName}
        />
        <InputFiled
          label="Phone Number"
          name="phone"
          defaultValue={data?.phone}

          type="tel"
          register={register}
          error={errors.phone}
        />
        <InputFiled
          label="Address"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors.address}
        />
        <InputFiled
          label="Birth Date"
<input
  type="date"
  name="birthDate"
  defaultValue={student.birthday.toISOString().split("T")[0]}
/>?.toISOString().split("T")[0] ?? ""}
          register={register}
          error={errors.birthDate}
        />

        <InputFiled
          label="Parent Id"
          name="parentId"
          defaultValue={data?.parentId}
          register={register}
          error={errors.parentId}
        />


        <InputFiled
          label="Blood Type"
          name="bloodType"
          defaultValue={data?.bloodType}
          type="name"
          register={register}
          error={errors.bloodType}
        />

        {data && (
          <InputFiled
            label="ID"
            name="id"
            defaultValue={data?.id}
            register={register}
            error={errors.id}
            hidden
          />
        )}


        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Sex</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("sex")}
          >
            <option value="">Select sex</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
          {errors.sex?.message && (
            <p className="text-sm text-red-400">
              {errors.sex.message.toString()}
            </p>
          )}
        </div>

        

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Grade</label>
          <select
            {...register("gradeId")}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          >
            <option value="">Select grade</option>
            {(relatedData?.grades ?? []).map(
              (grade: { id: number; level: number }) => (
                <option value={grade.id} key={grade.id}>
                  {grade.level}
                </option>
              ),
            )}
          </select>
          {errors.gradeId?.message && (
            <p className="text-sm text-red-400">
              {errors.gradeId.message.toString()}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Class</label>
          <select
            {...register("classId")}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          >
            <option value="">Select class</option>
            {(relatedData?.classes ?? []).map(
              (studentClass: {
                id: number;
                name: string;
                capacity: number;
                _count: { students: number };
              }) => (
                <option value={studentClass.id} key={studentClass.id}>
                  {studentClass.name} - {studentClass._count.students}/
                  {studentClass.capacity} Capacity
                </option>
              ),
            )}
          </select>
          {errors.classId?.message && (
            <p className="text-sm text-red-400">
              {errors.classId.message.toString()}
            </p>
          )}
        </div>
      </div>

      <CldUploadWidget
        uploadPreset="<school>"
        onSuccess={(result, { widget }) => {
          if (typeof result.info !== "string" && result.info?.secure_url) {
            setImg({ secure_url: result.info.secure_url });
          }
          widget.close;
        }}
      >
        {({ open }) => {
          return (
            <div
              className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
              onClick={() => open()}
            >
              <Image src="/upload.png" alt="" width={28} height={28} />
              <span>Upload a photo</span>
            </div>
          );
        }}
      </CldUploadWidget>

      <button className="bg-blue-400 text-white rounded-md p-2">
        {type === "create" ? "create" : "update"}
      </button>
      {state.error && (
        <p className="text-center text-sm text-red-500">
          Could not {type === "create" ? "create" : "update"} this Student.
          Use a password with at least 15 characters and make sure the
          username, email, and phone number are not already in use.
        </p>
      )}
    </form>
  );
};

export default StudentForm;
