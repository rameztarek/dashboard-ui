import z from "zod";

export const subjectSchema = z.object({
  name: z.string().min(1, { message: "Subject name is required" }),
  code: z.string().optional(),
  teacher: z.string().optional(),
  description: z.string().optional(),
});

export type SubjectInput = z.infer<typeof subjectSchema>;