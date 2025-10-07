import { Briefcase } from "lucide-react";

export default function JobNavbar({ activeTab, setActiveTab }) {

  const baseBtn =
<<<<<<< HEAD
    "flex justify-center items-center gap-2 py-3 rounded-xl font-semibold transition-all duration-300 ease-in-out flex-1";
=======
    "flex justify-center items-center gap-2 border py-3 rounded-xl font-semibold transition-all duration-300 ease-in-out flex-1";
>>>>>>> d724ff7 (whole basic job's CRUD flow is done, today added udpate to applyLink and description and delete button to delete job)
  const activeBtn = "bg-white text-black shadow-lg scale-105";
  const inactiveBtn = "text-white hover:bg-white/20 hover:scale-105";

  return (
<<<<<<< HEAD
    <nav className="fixed top-20 left-0 w-full z-5 backdrop-blur-md text-white shadow-md">
=======
    <nav className="fixed top-20 left-0 w-full bg-black z-5 backdrop-blur-md text-white shadow-md">
>>>>>>> d724ff7 (whole basic job's CRUD flow is done, today added udpate to applyLink and description and delete button to delete job)
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* 👇 Added gap-6 here so buttons never touch */}
        <div className="flex justify-between items-center gap-6 font-bold h-16">
          {/* My Jobs */}
          <button
            onClick={() => setActiveTab("my-jobs")}
            className={`${baseBtn} ${
              activeTab === "my-jobs" ? activeBtn : inactiveBtn
            }`}
          >
            <Briefcase className="w-5 h-5" />
            <span>My Jobs</span>
          </button>

          {/* Jobs */}
          <button
            onClick={() => setActiveTab("jobs")}
            className={`${baseBtn} ${
              activeTab === "jobs" ? activeBtn : inactiveBtn
            }`}
          >
            <Briefcase className="w-5 h-5" />
            <span>Jobs</span>
          </button>
        </div>
      </div>
    </nav>
  );
}