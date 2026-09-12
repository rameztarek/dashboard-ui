import prisma from "@/lib/prisma";

const EventList = async ({ dateParam }: { dateParam: string | undefined }) => {
  const date = dateParam ? new Date(dateParam) : new Date();

  const date = await prisma.event.findMany({
    where: {
      startTime: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lte: new Date(date.setHours(23, 59, 59, 999)),
      }
    }
  });
  return date.map((event) => (
    <div key={event.id} className="p-5 rounded-md border-2 border-gray-200 border-t-4 odd:border-t-lama-sky even:border-t-lama-purple">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-gray-600">{event.title}</h1>
        <span className="text-gray-300 text-xs" >{event.startTime.toLocaleTimeS}</span>
      </div>
      <p className="mt-2 text-gray-400 text-xs">{event.discription}</p>
    </div>
  ));

}

export default EventList