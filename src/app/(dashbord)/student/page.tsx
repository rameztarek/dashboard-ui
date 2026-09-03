import Announcement from "@/components/Announcement";
import BigCalender from "@/components/BigCalender";
import EventCalender from "@/components/EventCalender";

const StudentPage = () => {
  return (
    <section className="p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3 ">
      <div className="h-full bg-white p-4 rounded-md">
        <h1 className="text-xl font-semibold">Schedule (4A)</h1>
        <BigCalender/>
      </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalender />
        <Announcement />
      </div>
    </section>
  );
};

export default StudentPage;
