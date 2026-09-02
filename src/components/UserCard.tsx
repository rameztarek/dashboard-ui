import Image from "next/image";

const UserCard = ({ type }: { type: string }) => {
  return (
    <section className="rounded-2xl odd:bg-lama-purple even:bg-lama-yellow p-4 flex-1 min-w-32.5 ">
      <div className="flex justify-between items-center">
        <span className="text-[10px] px-2 py-1 bg-white rounded-full text-green-600">
          2024/43
        </span>
        <Image src="/more.png" alt="more" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold my-4">1,234</h1>
      <h2 className="capitalize text-sm font-medium [text-gray-500]">{type}</h2>
    </section>
  );
};

export default UserCard;
