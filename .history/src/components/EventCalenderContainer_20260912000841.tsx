import Image from "next/image";
import EventCalender from "./EventCalender";
import EventList from "./EventList";

const EventCalenderContainer = async ({ searchParams }: { searchParams: { [key: string]: string | undefind } }) => {
  return (
    <div className=" bg-white p-4 rounded-md ">
      <EventCalender />
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold my-4">Event</h1>
        <Image src="/moreDark.png" alt="moreDark" width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4">
        <EventList />
      </div>
    </div>
  )
}

export default EventCalenderContainer