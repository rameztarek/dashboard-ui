import prisma from "@/lib/prisma";
import BigCalender from "./BigCalender";
import { adjustScheduleToCurrentWeek } from "@/lib/utils";

const BigCalenderContainer = async ({
  type,
  id,
}: {
  type: "teacherId" | "classId";
  id: string | number;
}) => {
  const dataRes = await prisma.lesson.findMany({
    where: {
      ...(type === "teacherId"
        ? { teacherId: id as string }
        : { classId: id as number }),
    },
    include: {
      subject: { select: { name: true } },
      class: { select: { name: true } },
    },
  });

  console.log(
    `[BigCalenderContainer] ${type}=${id}:`,
    dataRes.map((lesson) => ({
      id: lesson.id,
      day: lesson.day,
      classId: lesson.classId,
      startTime: lesson.startTime,
      endTime: lesson.endTime,
    })),
  );

  const data = dataRes.map((lesson) => ({
    title: lesson.name,
    day: lesson.day,
    start: lesson.startTime,
    end: lesson.endTime,
    className: lesson.class.name,
    subjectName: lesson.subject.name,
  }));

  const schedule = adjustScheduleToCurrentWeek(data);

  return (
    <div className="min-h-[600px]">
      <BigCalender data={schedule} />
    </div>
  );
};

export default BigCalenderContainer;
