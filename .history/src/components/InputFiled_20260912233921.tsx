import React from "react";
import { FieldError, Merge, FieldErrorsImpl } from "react-hook-form";

type InputFieldProps = {
  label: string;
  type?: string;
  register: any;
  name: string;
  defaultValue?: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;   // ✅ نوع أوسع يقبل الحالتين
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  hidden?: boolean;
};

const InputFiled = ({
  label,
  type = "text",
  register,
  name,
  defaultValue,
  error,
  inputProps,
  hidden,
}: InputFieldProps) => {
  return (
    <div className={hidden ? "hidden" : "flex flex-col gap-2 w-full md:w-1/4"}>
      <label className="text-xs text-gray-500">{label}</label>
      <input
        type={type}
        {...register(name)}
        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
        {...inputProps}
        defaultValue={defaultValue}
      />
      {error?.message && (
        <p className="text-sm text-red-400">{error.message.toString()}</p>
      )}
    </div>
  );
};

export default InputFiled;
