import FormModle from "@/components/FormModle";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSerach from "@/components/TableSerach";
import prisma from "@/lib/prisma";
import { Prisma, Exam, Lesson, Subject, Class, Teacher } from "@prisma/client";
import { ITEM_PER_PAGE } from "@/lib/settings";
import Image from "next/image";
import Link from "next/link";
import { getUserRole } from "@/lib/utils";





const { role, currentUserId } = await getUserRole();

type ExamList = Exam & {
  lessons: Lesson & { subject: Subject; class: Class; teacher: Teacher };
};

const columes = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  ...(role === "admin" || role === "teacher" ? [{
    header: "Actions",
    accessor: "action",
  }] : []),
];

const rounderRow = (items: ExamList) => (
  <tr
    key={items.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lama-purple-light "
  >
    <td className="flex items-center gap-4 p-4">
      <div className="flex flex-col">
        <h3 className="font-semibold">{items.lessons.subject.name}</h3>
      </div>
    </td>
    <td>{items.lessons.class.name}</td>
    <td className="hidden md:table-cell">
      {items.lessons.teacher.name + " " + items.lessons.teacher.surname}
    </td>
    <td className="hidden md:table-cell">
      {new Intl.DateTimeFormat("en-GB").format(items.startTime)}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" ||  && (
          <>
            <FormModle table="exams" type="update" data={items} />
            <FormModle table="exams" type="delete" id={items.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const ExamsListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const params = await searchParams;
  const { page, ...queryParams } = params;

  const p = page ? parseInt(page) : 1;

  //URL PARAMS CONDITION

  const query: Prisma.ExamWhereInput = {};
  const lessonQuery: Prisma.LessonWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            lessonQuery.classId = parseInt(value);
            break;

          case "teacherId":
            lessonQuery.teacherId = value;
            break;

          case "search":
            lessonQuery.subject = {
              name: { contains: value, mode: "insensitive" },
            };
            break;
          default:
            break;
        }
      }
    }
  }

  query.lessons = lessonQuery;

  const [data, count] = await prisma.$transaction([
    prisma.exam.findMany({
      where: query,
      include: {
        lessons: {
          select: {
            subject: { select: { name: true } },
            class: { select: { name: true } },
            teacher: { select: { name: true } },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.exam.count({ where: query }),
  ]);

  return (
    <section className="bg-white p-4 rounded-md flex-1 m-4 mt-0 ">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Exams</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSerach />
          <div className="flex gap-4 items-center self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lama-yellow">
              <Image src="/filter.png" alt="filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lama-yellow">
              <Image src="/sort.png" alt="filter" width={14} height={14} />
            </button>
            {role === "admin" && <FormModle table="exams" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columes={columes} rounderRow={rounderRow} data={data} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </section>
  );
};

export default ExamsListPage;
