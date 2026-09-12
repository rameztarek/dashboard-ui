import FormModle from "@/components/FormModle";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSerach from "@/components/TableSerach";
import { role } from "@/lib/data";
import prisma from "@/lib/prisma";
import {
  Prisma,
  Assignment,
  Lesson,
  Subject,
  Class,
  Teacher,
} from "@prisma/client";
import { ITEM_PER_PAGE } from "@/lib/settings";
import Image from "next/image";
import { currentUserId } from "@/lib/utils";

type AssignmentList = Assignment & {
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
    header: "Due Date",
    accessor: "dueTime",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const rounderRow = (items: AssignmentList) => (
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
    <td className="hidden md:table-cell">{items.lessons.teacher.name + " " + items.lessons.teacher.surname}</td>
    <td className="hidden md:table-cell">
      {new Intl.DateTimeFormat("en-GB").format(items.dueTime)}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" || role === "teacher"&&  (
          <>
            <FormModle table="assignments" type="update" data={items} />
            <FormModle table="assignments" type="delete" id={items.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const AssignmentListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const params = await searchParams;
  const { page, ...queryParams } = params;

  const p = page ? parseInt(page) : 1;

  
  const query: Prisma.AssignmentWhereInput = {};
  const lessonFilter: Prisma.LessonWhereInput = {};
  query.lessons = {}

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.lessons.classId = parseInt(value);
            break;

          case "teacherId":
            query.lessons.teacherId = value;
            break;

          case "search":
            query.lessons.subject = {
              name: { contains: value, mode: "insensitive" },
            };
            break;
          default:
            break;
        }
      }
    }
  }

  if (Object.keys(lessonFilter).length > 0) {
    query.lessons = lessonFilter;
  }


  // ROLE CONDITIONS


  switch (role) {
    case "admin":
    break;  
    case "teacherId":
    query.lessons.teacherId = currentUserId?;
    default:
    break;

  }

  const [data, count] = await prisma.$transaction([
    prisma.assignment.findMany({
      where: query,
      include: {
        lessons: {
          include: {
            subject: true,
            class: true,
            teacher: true,
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.assignment.count({ where: query }),
  ]);

  return (
    <section className="bg-white p-4 rounded-md flex-1 m-4 mt-0 ">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          All Assignments
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSerach />
          <div className="flex gap-4 items-center self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lama-yellow">
              <Image src="/filter.png" alt="filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lama-yellow">
              <Image src="/sort.png" alt="filter" width={14} height={14} />
            </button>
            {role === "admin" && (
              <FormModle table="assignments" type="create" />
            )}
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

export default AssignmentListPage;