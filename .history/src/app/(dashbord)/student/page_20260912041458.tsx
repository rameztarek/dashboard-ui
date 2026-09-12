import Announcement from "@/components/Announcement";
import BigCalenderContainer from "@/components/BigCalenderContainer";
import EventCalender from "@/components/EventCalender";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const StudentPage = async () => {
  const { userId } = await auth();

  const classItem = await prisma.class.findUnique({
    where:{
      
    }
  });
  return (
    <section className="p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3 ">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule (4A)</h1>
          <BigCalenderContainer />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalender />
        <Announcement />
      </div>
    </section>
  );
};

export default StudentPage;
