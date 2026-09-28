import z from "zod";

const subjectschema = z.object({
  name: z.string().min(1, { message: "Subject name is required" }),
  code: z.string().min(1, { message: "Subject code is required" }),
  teacher: z.string().min(1, { message: "Teacher is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

export type SubjectInput = z.infer<typeof subjectchema>;
