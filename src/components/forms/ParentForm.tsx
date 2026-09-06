"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import InputFiled from "../InputFiled";

const schema = z.object({
  userName: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  relationship: z.enum(["father", "mother", "guardian"], {
    message: "Please select a valid relationship",
  }),
});

const ParentForm = ({
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
  } = useForm({ resolver: zodResolver(schema), mode: "onChange" });
  const onSubmit = handleSubmit((data) => console.log(data));
  const fillSampleData = () => {
    setValue("userName", "janedoe", { shouldValidate: true });
    setValue("email", "jane@doe.com", { shouldValidate: true });
    setValue("password", "123456", { shouldValidate: true });
    setValue("firstName", "Jane", { shouldValidate: true });
    setValue("lastName", "Doe", { shouldValidate: true });
    setValue("phone", "+1 234 567 890", { shouldValidate: true });
    setValue("address", "123 Main St, Anytown, USA", { shouldValidate: true });
    setValue("relationship", "mother", { shouldValidate: true });
  };
  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Create A New Parent</h1>
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
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Relationship</label>
          <select
            {...register("relationship")}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          >
            <option value="">Select relationship</option>
            <option value="father">Father</option>
            <option value="mother">Mother</option>
            <option value="guardian">Guardian</option>
          </select>
          {errors.relationship?.message && (
            <p className="text-sm text-red-400">
              {errors.relationship.message.toString()}
            </p>
          )}
        </div>
      </div>
      <button className="bg-blue-400 text-white rounded-md p-2">
        {type === "create" ? "create" : "update"}
      </button>
    </form>
  );
};
export default ParentForm;
