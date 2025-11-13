// src/pages/jobs/all jobs page/AllJobsPage.jsx
import { useEffect, useRef } from "react";
import { getAllJobsHandler } from "./getAllJobsHandler.js";
import { useJobStore } from "../../../store/jobPostStore.js";
import { useUserStore } from "../../../store/userStore.js";
import { JobTemplate } from "../../../components/Job Components/jobTemplate.jsx";
import { useTheme } from "../../../theme-provider.jsx";
import { IsLoadingSvg } from "../../../components/loaders/isLoadingSvg.jsx";

export function AllJobsPage() {
  const {
    setPageNumber,
    allJobsArray,
    reset_jobStore,
    hasMore,
    isLoading,
  } = useJobStore();

  const { user } = useUserStore();
  const { activeTheme } = useTheme();
  const isDark = activeTheme === "dark";

  const targetRef = useRef(null);
  const isLoadingRef = useRef(false);

  async function loadMore(entries) {
    if (isLoadingRef.current || !hasMore) return;

    for (let entry of entries) {
      if (entry.isIntersecting) {
        console.log("loaded more");
        isLoadingRef.current = true;
        await getAllJobsHandler();
        setPageNumber();
        isLoadingRef.current = false;
      }
    }
  }

  async function handler() {
    reset_jobStore();
    await getAllJobsHandler();
    setPageNumber();
  }

  useEffect(() => {
    handler();
  }, []);

  useEffect(() => {
    if (!targetRef.current) return;

    const options = {
      root: document.querySelector("scrollArea"),
      rootMargin: "0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(loadMore, options);
    observer.observe(targetRef.current);

    return () => observer.disconnect();
  }, [allJobsArray, hasMore]);

  const bg = isDark ? "bg-zinc-950 text-zinc-100" : "bg-zinc-50 text-zinc-900";
  const cardBg = isDark ? "bg-zinc-900" : "bg-white";
  const emptyText = isDark ? "text-zinc-400" : "text-zinc-600";

  if (isLoading || (allJobsArray.length === 0 && hasMore) )
    return (
      <div className="min-h-screen flex items-center justify-center">
        <IsLoadingSvg />
      </div>
    );

  return (
    <div
      className={`flex justify-center items-center h-full min-h-screen pt-20 transition-colors duration-500 ${bg}`}
      data-theme={activeTheme}
    >
      {allJobsArray.length !== 0 ? (
        <div
          id="scrollArea"
          className={`fixed top-40 left-1/2 -translate-x-1/2 max-w-4xl w-full h-[calc(100vh-13rem)] overflow-y-auto p-8 rounded-2xl shadow-xl border ${
            isDark ? "border-zinc-800" : "border-zinc-200"
          } ${cardBg} transition-all duration-500`}
        >
          {allJobsArray.map((job) => (
            <JobTemplate
              isFollowing={user.following.some(
                (id) => id.toString() === job.owner._id.toString()
              )}
              key={job.jobId + "1"}
              text={job.text}
              companyName={job.companyName}
              owner={user.userName === job.owner.userName ? "YOU" : job.owner}
              applyLink={job.applyLink}
              role={job.role}
              jobId={job.jobId}
              salary={job.salary}
              location={job.location}
              locationType={job.locationType}
              experience={job.experience}
              brandImage={job.brandImage}
            />
          ))}

          <div
            id="target"
            ref={targetRef}
            className={`flex justify-center font-semibold text-lg mt-4 ${
              isDark ? "text-zinc-400" : "text-zinc-700"
            }`}
          >
            {hasMore ? <IsLoadingSvg /> : "No more jobs"}
          </div>
        </div>
      ) : (
        <div
          className={`font-bold text-3xl text-center transition-colors duration-500 ${emptyText}`}
        >
          No jobs available 🙁
        </div>
      )}
    </div>
  );
}