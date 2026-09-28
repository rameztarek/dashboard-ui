import z from "zod";

export const subjectSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Subject name is required" }),
  teach

});

export type SubjectInput = z.infer<typeof subjectSchema>;