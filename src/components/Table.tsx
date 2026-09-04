import { EncryptedBoundArgsCacheStore } from "next/dist/server/resume-data-cache/cache-store";
import { ReactNode } from "react";

const Table = ({
  columes,
  rounderRow,
  data,
}: {
  columes: { header: string; accessor: string; className?: string }[];
  rounderRow: (item: any) => React.ReactNode;
  data: any[];
}) => {
  return (
    <table className="w-full mt-4">
      <thead>
        <tr className="text-left text-gray-500 text-sm">
          {columes.map((col) => (
            <th key={col.accessor} className={col.className} >{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map(item=> rounderRow (item))}</tbody>
    </table>
  );
};

export default Table;
