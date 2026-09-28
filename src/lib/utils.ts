import { auth } from "@clerk/nextjs/server";

export const getUserRole = async () => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role: string })?.role;
  return { role, currentUserId: userId };
};

const currentWorkWeek = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - daysFromMonday);
  startOfWeek.setHours(0, 0, 0, 0);

  return { startOfWeek };
};

const dayOffsets: Record<string, number> = {
  MONDAY: 0,
  TUESDAY: 1,
  WEDNESDAY: 2,
  THURSDAY: 3,
  FRIDAY: 4,
};

export const adjustScheduleToCurrentWeek = (
  lessons: {
    title: string;
    day?: string;
    start: Date;
    end: Date;
    className?: string;
    subjectName?: string;
  }[],
) => {
  const { startOfWeek } = currentWorkWeek();

  return lessons.map((lesson) => {
    const daysFromMonday =
      lesson.day && dayOffsets[lesson.day] !== undefined
        ? dayOffsets[lesson.day]
        : ((lesson.start.getDay() + 6) % 7);

    const adjustedStartDate = new Date(startOfWeek);
    adjustedStartDate.setDate(startOfWeek.getDate() + daysFromMonday);
    adjustedStartDate.setHours(
      lesson.start.getHours(),
      lesson.start.getMinutes(),
      lesson.start.getSeconds(),
    );

    const adjustedEndDate = new Date(adjustedStartDate);
    adjustedEndDate.setHours(
      lesson.end.getHours(),
      lesson.end.getMinutes(),
      lesson.end.getSeconds(),
    );

    return {
      title: lesson.title,
      start: adjustedStartDate,
      end: adjustedEndDate,
      className: lesson.className,
      subjectName: lesson.subjectName,
    };
  });
};
