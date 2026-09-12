const Announcement = () => {
  return (
    <section className="bg-white p-4 rounded-md w ">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-xl">Announcement</h1>
        <span className="text-xs text-gray-400">View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="bg-lama-sky-light rounded-md p-4">
          <div className="flex justify-between items-center">
            <h2>Lorem ipsum dolor sit.</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md p-1">
              2003/13
            </span>
          </div>
          <p className="text-gray-400 text-xs mt-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit,
            veritatis!
          </p>
        </div>
        <div className="bg-lama-purple-light rounded-md p-4">
          <div className="flex justify-between items-center">
            <h2>Lorem ipsum dolor sit.</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md p-1">
              2003/13
            </span>
          </div>
          <p className="text-gray-400 text-xs mt-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit,
            veritatis!
          </p>
        </div>
        <div className="bg-lama-yellow-light rounded-md p-4">
          <div className="flex justify-between items-center">
            <h2>Lorem ipsum dolor sit.</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md p-1">
              2003/13
            </span>
          </div>
          <p className="text-gray-400 text-xs mt-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit,
            veritatis!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Announcement;
