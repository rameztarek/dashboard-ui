import FormModle from "@/components/FormModle";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSerach from "@/components/TableSerach";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { Prisma, Teacher, Class, Grade } from "@prisma/client";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { role } from "@/lib/utils";

type ClassList = Class & { supervisor: Teacher | null } & { grade: Grade };

const columes = [
  { header: "Class Name", accessor: "name" },
  { header: "Capacity", accessor: "capacity", className: "hidden md:table-cell" },
  { header: "Grade", accessor: "grade", className: "hidden md:table-cell" },
  { header: "Supervisor", accessor: "supervisor", className: "hidden md:table-cell" },
  { header: "Actions", accessor: "action" },
];

const rounderRow = (items: ClassList) => (
  <tr
    key={items.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lama-purple-light "
  >
    <td className="flex items-center gap-4 p-4">
      <div className="flex flex-col">
        <h3 className="font-semibold">{items.name}</h3>
      </div>
    </td>
    <td className="hidden md:table-cell">{items.capacity}</td>
    <td className="hidden md:table-cell">{items.grade.level}</td>
    <td className="hidden md:table-cell">{items.supervisor?.name || "-"}</td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModle table="classes" type="update" data={items} />
            <FormModle table="classes" type="delete" id={items.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const ClassListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const params = await searchParams;
  const { page, ...queryParams } = params;

  const p = page ? parseInt(page) : 1;

  const query: Prisma.ClassWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "supervisorId":
            query.supervisorId = value;
            break;

          case "search":
            query.name = {
              contains: value,
              mode: "insensitive",
            };
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.class.findMany({
      where: query,
      include: {
        supervisor: true,
        grade: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.class.count({ where: query }),
  ]);

  return (
    <section className="bg-white p-4 rounded-md flex-1 m-4 mt-0 ">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Class</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSerach />
          <div className="flex gap-4 items-center self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lama-yellow">
              <Image src="/filter.png" alt="filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lama-yellow">
              <Image src="/sort.png" alt="filter" width={14} height={14} />
            </button>
            {role === "admin" && <FormModle table="classes" type="create" />}
          </div>
        </div>
      </div>
      <Table columes={columes} rounderRow={rounderRow} data={data} />
      <Pagination page={p} count={count} />
    </section>
  );
};

export default ClassListPage;