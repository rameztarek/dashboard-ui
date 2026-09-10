const Pagination = ({ page, count }: { page: number; count: number }) => {
  return (
    <section className="p-4 flex items-center justify-between text-gray-500">
      <button
        disabled
        className="py-2 px-3 rounded-md text-xs font-semibold bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed "
      >
        Prev
      </button>
      <div className="flex items-center gap-2 text-xs">
        {Array.from()}
        <button className="px-2 rounded-sm bg-lama-sky ">1</button>
      </div>
      <button className="py-2 px-3 rounded-md text-xs font-semibold bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed ">
        Next
      </button>
    </section>
  );
};

export default Pagination;
