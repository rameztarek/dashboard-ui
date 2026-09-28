"use server"

import { subjectSchema, SubjectInput  } from '@/lib/FormValidationSchema';

export const creatSubject = async (data:subjectSchema)=>{
  console.log(data + "in the server action")
}