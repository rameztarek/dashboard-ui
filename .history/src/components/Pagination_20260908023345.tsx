"use client"
import { ITEM_PER_PAGE } from "@/lib/settings";
import { useRouter } from "next/router";

const Pagination = ({ page, count }: { page: number; count: number }) => {
  const rounter = useRouter()
  const changePage = ()=>
  return (
    <section className="p-4 flex items-center justify-between text-gray-500">
      <button
        disabled
        className="py-2 px-3 rounded-md text-xs font-semibold bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed "
      >
        Prev
      </button>
      <div className="flex items-center gap-2 text-sm">
        {Array.from(
          { length: Math.ceil(count / ITEM_PER_PAGE) },
          (_, index) => {
            const pageIndex = index + 1;
            return <button key={pageIndex} className={`px-2 rounded-sm ${page === pageIndex? "bg-lama-sky" :""}` }>{pageIndex}</button>;
          },
        )}
      </div>
      <button className="py-2 px-3 rounded-md text-xs font-semibold bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed ">
        Next
      </button>
    </section>
  );
};

export default Pagination;
