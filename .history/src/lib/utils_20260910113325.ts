import { auth } from "@clerk/nextjs/server";

const { u sessionClaims } = await auth()
export  const role = (sessionClaims?.metadata as { role: string })?.role;