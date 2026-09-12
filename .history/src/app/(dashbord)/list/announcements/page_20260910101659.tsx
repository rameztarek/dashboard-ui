import FormModle from "@/components/FormModle";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSerach from "@/components/TableSerach";
import prisma from "@/lib/prisma";
import { Class, Announcement, Prisma } from "@prisma/client";
import { ITEM_PER_PAGE } from "@/lib/settings";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { metadata } from '../../../../../.history/src/app/layout_20260910050838';
import { string } from 'zod';

const {sessionClaims} = auth()
const role = {sessionClaims?.metadata as {role:string}}

type AnnouncementList = Announcement & { class: Class | null };

const columes = [
  { header: "Title", accessor: "title" },
  { header: "Class", accessor: "class" },
  { header: "Date", accessor: "date", className: "hidden md:table-cell" },
  { header: "Actions", accessor: "action" },
];

const rounderRow = (items: AnnouncementList) => (
  <tr
    key={items.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lama-purple-light "
  >
    <td className="flex items-center gap-4 p-4">
      <div className="flex flex-col">
        <h3 className="font-semibold">{items.title}</h3>
      </div>
    </td>
    <td>{items.class?.name || "-"}</td>
    <td className="hidden md:table-cell">
      {new Intl.DateTimeFormat("en-GB").format(items.date)}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModle table="announcements" type="update" data={items} />
            <FormModle table="announcements" type="delete" id={items.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const AnnouncementListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const params = await searchParams;
  const { page, ...queryParams } = params;

  const p = page ? parseInt(page) : 1;

  const query: Prisma.AnnouncementWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.classId = parseInt(value);
            break;

          case "search":
            query.title = {
              contains: value,
              mode: "insensitive",
            };
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.announcement.findMany({
      where: query,
      include: {
        class: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.announcement.count({ where: query }),
  ]);

  return (
    <section className="bg-white p-4 rounded-md flex-1 m-4 mt-0 ">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          All Announcements
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
              <FormModle table="announcements" type="create" />
            )}
          </div>
        </div>
      </div>
      <Table columes={columes} rounderRow={rounderRow} data={data} />
      <Pagination page={p} count={count} />
    </section>
  );
};

export default AnnouncementListPage;