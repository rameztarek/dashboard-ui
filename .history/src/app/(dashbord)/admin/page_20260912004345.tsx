import Announcement from "@/components/Announcement";
import AttendanceChartContainer from "@/components/AttendanceChartContainer";
import CountChartContainer from "@/components/CountChartContainer";
import EventCalenderContainer from "@/components/EventCalenderContainer";
import FinaenceChart from "@/components/FinaenceChart";
import UserCard from "@/components/UserCard";

const AdminPage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
  return (
    <section className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        <div className="flex justify-between gap-4">
          <UserCard type="admin" />
          <UserCard type="teacher" />
          <UserCard type="student" />
          <UserCard type="parent" />
        </div>
        <div className="">
          {/* MIDDLE CHART */}
          <div className="flex flex-col gap-4 lg:flex-row">
            {/* COUNT CHART */}
            <div className="w-full lg:w-1/3 h-112.5">
              <CountChartContainer />
            </div>
            {/* ATENDANCE CHART */}
            <div className="w-full lg:w-2/3 h-112.5">
              <AttendanceChartContainer />
            </div>
          </div>
          {/* BOTTOM CHART */}
          <div className="">
            <FinaenceChart />
          </div>
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalenderContainer searchParams={searchParams}/>
        <Announcement />
      </div>
    </section>
  );
};

export default AdminPage;
