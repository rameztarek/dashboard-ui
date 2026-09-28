import { auth } from "@clerk/nextjs/server";


export const GetUserRoleAuth = async () => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role: string })?.role;
};
