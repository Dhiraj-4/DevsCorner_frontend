import { Briefcase } from "lucide-react";
import { useTheme } from "../theme-provider.jsx";

export default function JobNavbar({ activeTab, setActiveTab }) {
  const { activeTheme } = useTheme();
  const isDark = activeTheme === "dark";

  const baseBtn =
    "flex justify-center items-center gap-2 border py-3 rounded-xl font-semibold transition-all duration-300 ease-in-out flex-1";
  const activeBtn = isDark
    ? "bg-neutral-100 text-neutral-900 shadow-lg scale-105"
    : "bg-neutral-900 text-neutral-100 shadow-lg scale-105";
  const inactiveBtn = isDark
    ? "text-neutral-100 border-neutral-700 hover:bg-neutral-800/40 hover:scale-105"
    : "text-neutral-900 border-neutral-300 hover:bg-neutral-200/60 hover:scale-105";

  const navBg = isDark
    ? "bg-neutral-950/70 border-b border-neutral-800"
    : "bg-white/70 border-b border-neutral-200";

  return (
    <nav
      className={`fixed top-20 left-0 w-full z-10 backdrop-blur-md shadow-md transition-colors duration-500 ${navBg}`}
      data-theme={activeTheme}
    >
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center gap-6 font-bold h-16">
          <button
            onClick={() => setActiveTab("my-jobs")}
            className={`${baseBtn} ${
              activeTab === "my-jobs" ? activeBtn : inactiveBtn
            }`}
          >
            <Briefcase className="w-5 h-5" />
            <span>My Jobs</span>
          </button>

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