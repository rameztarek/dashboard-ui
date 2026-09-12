import { auth } from "@clerk/nextjs/server";

export const getUserRole = async () => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role: string })?.role;
  return { role, currentUserId: userId };
};


const currentWorkWeek = () =>{
  const today = new Date();
  const dayOfWeek = today.getDay();

  const startOfWeek = new Date(today)

  if(dayOfWeek === 0 ){
    startOfWeek.setDay(today.getDate())
  }
}