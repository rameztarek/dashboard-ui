import Image from "next/image";
import BigCalenderContainer from "@/components/BigCalenderContainer";
import Announcement from "@/components/Announcement";
import Link from "next/link";
import Preformance from "@/components/Preformance";
import FormContainer from "@/components/FormContainer";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

const SingleStudentPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role: string })?.role;
  const student = await prisma.teacher.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          subjects: true,
          lessons: true,
          classes: true,
        },
      },
      classes: {
        select: {
          _count: { select: { students: true } },
        },
      },
    },
  });

  if (!teacher) {
    return <div>Teacher not found</div>;
  }

  const studentCount = teacher.classes.reduce(
    (total, classItem) => total + classItem._count.students,
    0,
  );

  const attendanceTotal = student.attendances.length;
  const attendancePresent = student.attendances.filter(
    (attendance) => attendance.present,
  ).length;
  const attendancePercentage = attendanceTotal
    ? Math.round((attendancePresent / attendanceTotal) * 100)
    : 0;
  return (
    <section className="flex flex-1 p-4 flex-col xl:flex-row gap-4">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-lama-sky py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                src={student.img || "/avatar.png"}
                alt=""
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover bg-white"
              />
            </div>
            <div className="w-2/3 flex flex-col gap-4 justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">
                  {student.name} {student.surname}
                </h1>
                {role === "admin" && (
                  <FormContainer table="student" type="update" data={student} />
                )}
              </div>
              <p className="text-sm text-gray-500">{student.address}</p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 flex items-center gap-2">
                  <Image src="/blood.png" alt="" width={14} height={14} />
                  <span>{student.bloodType}</span>
                </div>
                <div className="w-full md:w-1/3 flex items-center gap-2">
                  <Image src="/date.png" alt="" width={14} height={14} />
                  <span>
                    {new Intl.DateTimeFormat("en-GB").format(student.birthday)}
                  </span>
                </div>
                <div className="w-full md:w-1/3 flex items-center gap-2">
                  <Image src="/mail.png" alt="" width={14} height={14} />
                  <span>{student.email || "-"}</span>
                </div>
                <div className="w-full md:w-1/3 flex items-center gap-2">
                  <Image src="/phone.png" alt="" width={14} height={14} />
                  <span>{student.phone || "-"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* SMALL CARDS — 2x2 grid */}
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-md flex gap-4 items-center">
              <Image
                src="/singleAttendance.png"
                alt=""
                height={24}
                width={24}
                className="w-6 h-6"
              />
              <div>
                <h1 className="text-xl font-semibold">{attendancePercentage}%</h1>
                <span className="text-sm text-gray-500">Attendance</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-md flex gap-4 items-center">
              <Image
                src="/singleBranch.png"
                alt=""
                height={24}
                width={24}
                className="w-6 h-6"
              />
              <div>
                <h1 className="text-xl font-semibold">1</h1>
                <span className="text-sm text-gray-500">Branches</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-md flex gap-4 items-center">
              <Image
                src="/singleLesson.png"
                alt=""
                height={24}
                width={24}
                className="w-6 h-6"
              />
              <div>
                <h1 className="text-xl font-semibold">{student.class._count.lessons}</h1>
                <span className="text-sm text-gray-500">Lessons</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-md flex gap-4 items-center">
              <Image
                src="/singleClass.png"
                alt=""
                height={24}
                width={24}
                className="w-6 h-6"
              />
              <div>
                <h1 className="text-xl font-semibold">1</h1>
                <span className="text-sm text-gray-500">Classes</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM — Schedule */}
        <div className="mt-4 bg-white rounded-md p-4 h-200">
          <h1>Student&apos;s Schedule</h1>
          <BigCalenderContainer type="classId" id={student.classId} />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 font-semibold">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link className="p-3 rounded-md bg-lama-sky-light" href={`/list/lessons?classId=${student.classId}`}>Student&apos;s Lessons</Link>
            <Link className="p-3 rounded-md bg-lama-purple-light" href={`/list/teachers?classId=${student.classId}`}>Student&apos;s Teachers</Link>
            <Link className="p-3 rounded-md bg-lama-pink-50" href={`/list/exams?classId=${student.classId}`}>Student&apos;s Exams</Link>
            <Link className="p-3 rounded-md bg-lama-yellow-light" href={`/list/assignments?classId=${student.classId}`}>Student&apos;s Assignments</Link>
            <Link className="p-3 rounded-md bg-lama-sky-light" href={`/list/results?studentId=${student.id}`}>Student&apos;s Results</Link>
          </div>
        </div>
        <Preformance />
        <Announcement />
      </div>
    </section>
  );
};

export default SingleStudentPage;
