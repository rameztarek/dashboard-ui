import prisma from "@/lib/prisma";
import BigCalender from "./BigCalender";

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
  });

  const data = dataRes.map((lesson) => ({
    title: lesson.name,
    start: lesson.startTime,
    end: lesson.endTime,
  }));

  return (
    <div className="">
      <BigCalender data={data as never} />
    </div>
  );
};

export default BigCalenderContainer;
