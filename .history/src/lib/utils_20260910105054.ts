import { auth } from "@clerk/nextjs/server";

const { sessionClaims } = await auth()
export default  const role = (sessionClaims?.metadata as { role: string })?.role;