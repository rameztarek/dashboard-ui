import Image from "next/image";

const TableSerach = () => {
  return (
    <div className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
        {/* SEARCH BAR */}
        <Image src="/search.png" alt="search" width={14} height={14} />
        <input
          type="text"
          placeholder="Search..."
          className="w-50 p-2 bg-transparent outline-none "
        />
      </div>
  );
};

export default TableSerach;
