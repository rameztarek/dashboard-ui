import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSerach from "@/components/TableSerach";
import { lessonsData, role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

type Lesson = {
  id: number;
  class:string;
  subject: string;
  name: string;
  teacher: string;

};

const columes = [
  {
    header: " Seubject Name",
    accessor: "name",
  },
  {
    header: "Class",
    accessor: "class",
    className: "hidden lg:table-cell",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const LessonsListPage = () => {
  const rounderRow = (items: Lesson) => (
    <tr
      key={items.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lama-purple-light "
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{items.subject}</h3>
        </div>
      </td>
      <td>{items.class}</td>
      <td className="hidden md:table-cell">{items.teacher}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${items.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lama-sky">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lama-purple">
              <Image src="/delete.png" alt="" width={16} height={16} />
            </button>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <section className="bg-white p-4 rounded-md flex-1 m-4 mt-0 ">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className=" hidden md:block text-lg font-semibold">All Lessons</h1>
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
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lama-yellow">
                <Image src="/plus.png" alt="filter" width={14} height={14} />
              </button>
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columes={columes} rounderRow={rounderRow} data={lessonsData} />
      {/* PAGINATION */}
      <Pagination />
    </section>
  );
};

export default LessonsListPage;
