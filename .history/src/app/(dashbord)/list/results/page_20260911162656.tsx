import FormModle from "@/components/FormModle";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSerach from "@/components/TableSerach";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { getUserRole } from "@/lib/utils";

const { role, currentUserId } = await getUserRole();


type ResultsList = {
  id: number;
  title: string;
  studentName: string;
  studentSurname: string;
  teacherName: string;
  teacherSurname: string;
  score: number;
  className: string;
  startTime: Date;
};

const columes = [
  {
    header: "Title",
    accessor: "title",
  },
  {
    header: "Student",
    accessor: "student",
  },
  {
    header: "Score",
    accessor: "score",
    className: "hidden md:table-cell",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Class",
    accessor: "class",
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

const rounderRow = (items: ResultsList) => (
  <tr
    key={items.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lama-purple-light "
  >
    <td className="flex items-center gap-4 p-4">
      <div className="flex flex-col">
        <h3 className="font-semibold">{items.title}</h3>
      </div>
    </td>
    <td>{items.studentName}</td>
    <td className="hidden md:table-cell">{items.score}</td>
    <td className="hidden md:table-cell">
      {items.teacherName + " " + items.teacherSurname}
    </td>
    <td className="hidden md:table-cell">{items.className}</td>
    <td className="hidden md:table-cell">
      {new Intl.DateTimeFormat("en-GB").format(items.startTime)}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {(role === "admin" || role === "teacher") && (
          <>
            <FormModle table="results" type="update" data={items} />
            <FormModle table="results" type="delete" id={items.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);
const ResultsListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const params = await searchParams;
  const { page, ...queryParams } = params;

  const p = page ? parseInt(page) : 1;

  //URL PARAMS CONDITION

  const query: Prisma.ResultWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "studentId":
            query.studentId = value;
            break;

          case "search":
            query.OR = [
              { exam: { title: { contains: value, mode: "insensitive" } } },
              {
                assignment: { title: { contains: value, mode: "insensitive" } },
              },
              { students: { name: { contains: value, mode: "insensitive" } } },
            ];
            break;
          default:
            break;
        }
      }
    }
  }

  switch (role) {
    case "admin":
      break;
    case "teacher":
      query.OR = [
        { exam: { lessons: { teacherId: currentUserId! } } },
        { assignment: { lessons: { teacherId: currentUserId! } } }
      ];
      break;
      case "student":
          query.studentId =currentUserId!;
          break;
          case "parent"
                    query.parentId =currentUserId!;

      break; 
  }

  const [dataRes, count] = await prisma.$transaction([
    prisma.result.findMany({
      where: query,
      include: {
        students: { select: { name: true, surname: true } },
        exam: {
          include: {
            lessons: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true, surname: true } },
              },
            },
          },
        },
        assignment: {
          include: {
            lessons: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true, surname: true } },
              },
            },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.result.count({ where: query }),
  ]);

  const data = dataRes.map((item) => {
    const assessment = item.exam || item.assignment;

    if (!assessment) return null;

    const isExam = "startTime" in assessment;

    return {
      id: item.id,
      title: assessment.title,
      studentName: item.students.name,
      studentSurname: item.students.surname,
      teacherName: assessment.lessons.teacher.name,
      teacherSurname: assessment.lessons.teacher.surname,
      score: item.score,
      className: assessment.lessons.class.name,
      startTime: assessment.startTime,
    };
  });

  return (
    <section className="bg-white p-4 rounded-md flex-1 m-4 mt-0 ">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className=" hidden md:block text-lg font-semibold">All Results</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSerach />
          <div className="flex gap-4 items-center self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lama-yellow">
              <Image src="/filter.png" alt="filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lama-yellow">
              <Image src="/sort.png" alt="filter" width={14} height={14} />
            </button>
            {role === "admin" && <FormModle table="results" type="create" />}
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

export default ResultsListPage;
