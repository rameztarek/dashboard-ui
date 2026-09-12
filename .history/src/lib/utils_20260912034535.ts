import { auth } from "@clerk/nextjs/server";

export const getUserRole = async () => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role: string })?.role;
  return { role, currentUserId: userId };
};


const curr