"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputFiled from "../InputFiled";



export default TeachersForm;

const TeachersForm = ({
  type,
  data,
  relatedData,
  setOpen,
}: {
  type: "create" | "update";
  data?: any;
  relatedData?:any;
  setOpen: Dispatch<
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const fillSampleData = () => {
    setValue("userName", "johndoe", { shouldValidate: true });
    setValue("email", "john@doe.com", { shouldValidate: true });
    setValue("password", "123456", { shouldValidate: true });
    setValue("firstName", "John", { shouldValidate: true });
    setValue("lastName", "Doe", { shouldValidate: true });
    setValue("phone", "+1 234 567 890", { shouldValidate: true });
    setValue("address", "123 Main St, Anytown, USA", { shouldValidate: true });
    setValue("birthDate", "2000-01-01", { shouldValidate: true });
    setValue("sex", "male", { shouldValidate: true });
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Create A New Teacher</h1>
        <button
          type="button"
          onClick={fillSampleData}
          className="text-xs bg-lama-yellow text-white px-3 py-1.5 rounded-md"
        >
          Fill sample data
        </button>
      </div>

      <span className="text-gray-500 font-medium">
        Authentication Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputFiled
          label="UserName"
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
