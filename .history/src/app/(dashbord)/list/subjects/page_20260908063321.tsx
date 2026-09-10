import FormModle from "@/components/FormModle";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSerach from "@/components/TableSerach";
import { role, subjectsData } from "@/lib/data";
import prisma from "@/lib/prisma";
import { Prisma, Parent, Student } from "@prisma/client";
import { ITEM_PER_PAGE } from "@/lib/settings";
import Image from "next/image";
import Link from "next/link";

type Subject = {}
const columes = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Teachers Name",
    accessor: "teachers",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const rounderRow = (items: Subject) => (
    <tr
      key={items.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lama-purple-light "
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{items.name}</h3>
        </div>
      </td>
      <td className="hidden md:table-cell">{items.teachers.join(",")}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModle table="subjects" type="update" data={items} />
              <FormModle table="subjects" type="delete" id={items.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
  const SubjectListPage =  async ({
  searchParams,
  }: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
  }) => {
    const params = await searchParams;
    const { page, ...queryParams } = params;
  
    const p = page ? parseInt(page) : 1;
  
    const query: Prisma.ParentWhereInput = {};
  
    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined) {
          switch (key) {
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
      prisma.parent.findMany({
        where: query,
        include: {
          students: true,
        },
        take: ITEM_PER_PAGE,
        skip: ITEM_PER_PAGE * (p - 1),
      }),
      prisma.parent.count({ where: query }),
    ]);
  return (
    <section className="bg-white p-4 rounded-md flex-1 m-4 mt-0 ">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className=" hidden md:block text-lg font-semibold">All Subjects</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSerach />
          <div className="flex gap-4 items-center self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lama-yellow">
              <Image src="/filter.png" alt="filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lama-yellow">
              <Image src="/sort.png" alt="filter" width={14} height={14} />
            </button>
            {role === "admin" && <FormModle table="subjects" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columes={columes} rounderRow={rounderRow} data={subjectsData} />
      {/* PAGINATION */}
      <Pagination />
    </section>
  );
};

export default SubjectListPage;
