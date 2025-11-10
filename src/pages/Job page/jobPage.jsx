// // src/pages/jobs/JobPage.jsx
// import { useState } from "react";
// import JobNavbar from "../../navbars/jobNavbar";
// import { CoolButton } from "../../components/Buttons/button.jsx";
// import { useNavigate } from "react-router-dom";
// import { MyJobsPage } from "./My job page/myJobsPage.jsx";
// import { AllJobsPage } from "./all jobs page/allJobsPage.jsx";
// import { useTheme } from "../../theme-provider.jsx";

// export function JobPage() {
//   const [activeTab, setActiveTab] = useState("jobs");
//   const navigate = useNavigate();
//   const { activeTheme } = useTheme();
//   const isDark = activeTheme === "dark";

//   const pageBg = isDark ? "bg-zinc-950 text-zinc-100" : "bg-zinc-50 text-zinc-900";
//   const fixedBarBg = isDark ? "bg-zinc-900/70 border-zinc-800" : "bg-white/80 border-zinc-200";
//   const fixedBarBorder = isDark ? "border-t border-zinc-800" : "border-t border-zinc-200";

//   return (
//     <div className={`${pageBg} min-h-screen transition-colors duration-500`} data-theme={activeTheme}>
//       {/* Navbar */}
//       <JobNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

//       {/* Pages */}
//       <main className="w-full">
//         {activeTab === "my-jobs" ? <MyJobsPage /> : <AllJobsPage />}
//       </main>

//       {/* Post Job Floating Bar */}
//       <div
//         id="postJobButton"
//         className={`fixed bottom-4 left-0 right-0 flex items-center justify-center pointer-events-none`}
//       >
//         <div
//           className={`pointer-events-auto px-4 py-3 rounded-full shadow-lg flex items-center justify-center ${fixedBarBg} ${fixedBarBorder} transition-all duration-300`}
//           style={{ maxWidth: 420, marginLeft: "auto", marginRight: "auto" }}
//         >
//           <CoolButton
//             text={"Post Job"}
//             clickHandler={() => navigate("/post-job")}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import JobNavbar from "../../navbars/jobNavbar";
import { CoolButton } from "../../components/Buttons/button.jsx";
import { useNavigate } from "react-router-dom";
import { MyJobsPage } from "./My job page/myJobsPage.jsx";
import { AllJobsPage } from "./all jobs page/allJobsPage.jsx";
import { useTheme } from "../../theme-provider.jsx";

export function JobPage() {
  const [activeTab, setActiveTab] = useState("jobs");
  const navigate = useNavigate();
  const { activeTheme } = useTheme();
  const isDark = activeTheme === "dark";

  const pageBg = isDark
    ? "bg-zinc-950 text-zinc-100"
    : "bg-zinc-50 text-zinc-900";

  // 🟢 Truly neutral, soft translucent gray tone that looks good in both themes
  const fixedBarBg =
    "bg-neutral-300/60 dark:bg-neutral-800/60 backdrop-blur-md border border-neutral-400/40 dark:border-neutral-700/40";

  return (
    <div
      className={`${pageBg} min-h-screen transition-colors duration-500`}
      data-theme={activeTheme}
    >
      {/* Navbar */}
      <JobNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Pages */}
      <main className="w-full">
        {activeTab === "my-jobs" ? <MyJobsPage /> : <AllJobsPage />}
      </main>

      {/* Floating Post Job Button */}
      <div
        id="postJobButton"
        className="fixed bottom-4 left-0 right-0 flex items-center justify-center pointer-events-none"
      >
        <div
          className={`pointer-events-auto px-4 py-3 rounded-full shadow-lg flex items-center justify-center 
          ${fixedBarBg} transition-all duration-300`}
          style={{ maxWidth: 420, marginLeft: "auto", marginRight: "auto" }}
        >
          <CoolButton
            text="Post Job"
            clickHandler={() => navigate("/post-job")}
          />
        </div>
      </div>
    </div>
  );
}
