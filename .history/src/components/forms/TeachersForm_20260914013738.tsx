"use client";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputFiled from "../InputFiled";
import {
  Dispatch,
  SetStateAction,
  startTransition,
  useActionState,
  useEffect,
} from "react";
import { TeacherSchemaInput, teacherSchema } from "@/lib/FormValidationSchema";
import { updateTeacher, createTeacher } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CldUploadWidget } from "next-cloudinary";

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
  const subjects = relatedData?.subjects || [];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TeacherSchemaInput>({
    resolver: zodResolver(teacherSchema),
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
      subject: data?.subjects?.map((s: any) => String(s.id)) ?? [],
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

  const onSubmit = handleSubmit((formValues) => {
    const formData = new FormData();

    Object.entries(formValues).forEach(([key, value]) => {
      if (key === "subject" && Array.isArray(value)) {
        value.forEach((subjectId) => {
          if (subjectId !== undefined) {
            formData.append("subject", subjectId);
          }
        });
      } else if (value !== undefined) {
        formData.append(key, String(value));
      }
    });

    startTransition(() => {
      formAction(formValues);
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
        <h1 className="text-xl font-semibold">
          {type === "create" ? "Create A New Teacher" : "Update The Teacher"}
        </h1>
      </div>

      <span className="text-gray-500 font-medium">
        Authentication Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputFiled
          label="Username"
          name="userName"
          register={register}
          error={errors.userName}
        />
        <InputFiled
          label="Email"
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
          <label className="text-xs text-gray-500">Subjects</label>
          <select
            multiple
            {...register("subject")}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          >
            {subjects.map((subject: { id: number; name: string }) => (
              <option value={subject.id} key={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
          {errors.subject?.message && (
            <p className="text-sm text-red-400">
              {errors.subject.message.toString()}
            </p>
          )}
        </div>
      </div>

<CldUploadWidget uploadPreset="<school>" onSurccess={(result , {wi})}>
  {({ open }) => {
    return (
      <div
        className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
        onClick={()=>open()}
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
    </form>
  );
};

export default TeachersForm;
