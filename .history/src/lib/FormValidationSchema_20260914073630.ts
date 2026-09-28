import { z } from "zod";

export const subjectSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().trim().min(1, { message: "Enter a subject name." }),
  teachers: z.union([z.string(), z.array(z.string())]).optional(),
});

export type SubjectInput = z.infer<typeof subjectSchema>;

export const classSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().trim().min(1, { message: "Enter a class name." }),
  capacity: z.coerce.number({ message: "Enter the class capacity." }).int({ message: "Capacity must be a whole number." }).min(1, { message: "Capacity must be at least 1 student." }),
  gradeId: z.coerce.number({ message: "Select a grade." }).int({ message: "Select a valid grade." }).min(1, { message: "Select a grade." }),
  supervisorId: z.coerce.string().optional(),
});

export type ClassSchemaInput = z.infer<typeof classSchema>;

export const teacherSchema = z.object({
  id: z.string().optional(),
  userName: z
    .string({ message: "Enter a username." })
    .trim()
    .min(3, { message: "Username must contain at least 3 characters." })
    .max(20, { message: "Username cannot contain more than 20 characters." }),
  email: z.string().email({ message: "Enter a valid email address." }).optional().or(z.literal("")),
  password: z
    .string()
    .min(15, { message: "A new password must contain at least 15 characters." })
    .max(20, { message: "Password cannot contain more than 20 characters." }).optional().or(z.literal("")),
  firstName: z.string().trim().min(1, { message: "Enter the teacher's first name." }),
  lastName: z.string().trim().min(1, { message: "Enter the teacher's last name." }),
  phone: z.string().trim().min(1, { message: "Enter a phone number." }).optional().or(z.literal("")),
  address: z.string().trim().min(1, { message: "Enter the teacher's address." }),
  birthDate: z.string().min(1, { message: "Select the teacher's birth date." }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Select Male or Female." }),
  img: z.string().optional(),
  subject: z.array(z.string().optional()),
  bloodType: z.string().trim().min(1, { message: "Enter the teacher's blood type." }).max(2, { message: "Blood type must be no more than 2 characters." }),
});

export type TeacherSchemaInput = z.infer<typeof teacherSchema>;


export const studentSchema = z.object({
  id: z.string().optional(),
  userName: z
    .string({ message: "Enter a username." })
    .trim()
    .min(3, { message: "Username must contain at least 3 characters." })
    .max(20, { message: "Username cannot contain more than 20 characters." }),
  email: z.string().email({ message: "Enter a valid email address." }).optional().or(z.literal("")),
  password: z
    .string()
    .min(15, { message: "A new password must contain at least 15 characters." })
    .max(20, { message: "Password cannot contain more than 20 characters." }).optional().or(z.literal("")),
  firstName: z.string().trim().min(1, { message: "Enter the teacher's first name." }),
  lastName: z.string().trim().min(1, { message: "Enter the teacher's last name." }),
  phone: z.string().trim().min(1, { message: "Enter a phone number." }).optional().or(z.literal("")),
  address: z.string().trim().min(1, { message: "Enter the teacher's address." }),
  birthDate: z.string().min(1, { message: "Select the teacher's birth date." }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Select Male or Female." }),
  img: z.string().optional(),
  subject: z.array(z.string().optional()),
  bloodType: z.string().trim().min(1, { message: "Enter the teacher's blood type." }).max(2, { message: "Blood type must be no more than 2 characters." }),
  
});

export type StudentSchemaInput = z.infer<typeof teacherSchema>;
