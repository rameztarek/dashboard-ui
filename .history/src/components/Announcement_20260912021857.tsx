import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import type { Prisma } from "@prisma/client";

const Announcement = async () => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string } | undefined)?.role;

  const roleCondition: Prisma.ClassWhereInput | undefined =
    role === "teacher" && userId
      ? { lessons: { some: { teacherId: userId } } }
      : role === "student" && userId
        ? { students: { some: { id: userId } } }
        : role === "parent" && userId
          ? { students: { some: { parentId: userId } } }
          : undefined;

  const announcements = await prisma.announcement.findMany({
    where: roleCondition
      ? { OR: [{ classId: null }, { class: roleCondition }] }
      : { classId: null },
    orderBy: { date: "desc" },
    take: 3,
  });


  return (
    <section className="bg-white p-4 rounded-md w ">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-xl">Announcement</h1>
        <span className="text-xs text-gray-400">View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {announcements.map((announcement, index) => (
          <div
            key={announcement.id}
            className={`${
              index % 3 === 0
                ? "bg-lama-sky-light"
                : index % 3 === 1
                  ? "bg-lama-purple-light"
                  : "bg-lama-yellow-light"
            } rounded-md p-4`}
          >
            <div className="flex justify-between items-center gap-2">
              <h2>{announcement.title}</h2>
              <span className="text-xs text-gray-400 bg-white rounded-md p-1 whitespace-nowrap">
                {announcement.date.toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-400 text-xs mt-1">
              {announcement.description}
            </p>
          </div>
        ))}
        {announcements.length === 0 && (
          <p className="text-sm text-gray-400">No announcements available.</p>
        )}
      </div>
    </section>
  );
};

export default Announcement;
