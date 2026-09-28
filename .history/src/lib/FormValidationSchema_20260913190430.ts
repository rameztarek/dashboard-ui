import { optional, z } from "zod";

export const subjectSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Subject name is required" }),
  teachers: z.union([z.string(), z.array(z.string())]).optional(),
});

export type SubjectInput = z.infer<typeof subjectSchema>;

export const classSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Subject name is required!" }),
  capacity: z.coerce.number().min(1, { message: "Capacity name is required!" }),
  gradeId: z.coerce.number().min(1, { message: "Grade name is required!" }),
  supervisorId: z.coerce.string().optional(),
});

export type ClassSchemaInput = z.input<typeof classSchema>;

const teacherSchema = z.object({
  id: z.string().optional(),
  userName: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must not exceed 20 characters long" }),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(20, { message: "Password must not exceed 20 characters long" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }).optional(),
  address: z.string().min(1, { message: "Address is required" }).optional(),
  birthDate: z.string().min(1, { message: "Birth date is required" }),
  sex: z.enum(["male", "female"], { message: "Please select a valid gender" }),
  img: z
    .instanceof(File, { message: "Please upload a valid image file" })
    .optional(),
});

export type TeacherSchemaInput = z.input<typeof teacherSchema>;
