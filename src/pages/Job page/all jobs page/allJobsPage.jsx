import { useEffect, useRef } from "react";
import { getAllJobsHandler } from "./getAllJobsHandler.js";
import { useJobStore } from "../../../store/jobPostStore.js";
import { useUserStore } from "../../../store/userStore.js";
import { JobTemplate } from "../../../components/Job Components/jobTemplate.jsx";

export function AllJobsPage() {
  const {
    setPageNumber,
    allJobsArray,
    reset_jobStore,
    hasMore
  } = useJobStore();

  const { user } = useUserStore();
  const targetRef = useRef(null);
  const isLoadingRef = useRef(false);

  async function handler() {
    reset_jobStore();
    await getAllJobsHandler();
    setPageNumber();
  }

  const loadMore = async (entries, observer) => {
    if (isLoadingRef.current || !hasMore) return;

    for (const entry of entries) {
      if (entry.isIntersecting) {
        console.log("loadMore called");
        isLoadingRef.current = true;
        await getAllJobsHandler();
        setPageNumber();
        isLoadingRef.current = false;
      }
    }
  };

  useEffect(() => {
    handler();
  }, []);

  useEffect(() => {
    if (!targetRef.current) return;

    const options = {
      root: document.querySelector("#scrollArea"),
      rootMargin: "0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(loadMore, options);
    observer.observe(targetRef.current);

    return () => observer.disconnect();
  }, [allJobsArray, hasMore]);

  return (
    <div className="flex justify-center items-center h-full min-h-screen mt-20 pt-20 bg-black">
      {allJobsArray.length !== 0 ? (
        <div
          id="scrollArea"
          className="fixed top-40 left-1/2 -translate-x-1/2 max-w-4xl w-full h-[calc(100vh-13rem)] overflow-y-auto 
          p-8 rounded-2xl bg-zinc-900 shadow-xl"
        >
          {allJobsArray.map((job) => (
            <JobTemplate
              isFollowing={user.following.some( (id) => id.toString() === job.owner._id.toString())}
              key={job.jobId + "1"}
              text={job.text}
              companyName={job.companyName}
              owner={user.userName === job.owner.userName ? "YOU" : job.owner}
              applyLink={job.applyLink}
              role={job.role}
              jobId={job.jobId}
            />
          ))}

          <div
            id="target"
            ref={targetRef}
            className="flex justify-center text-white font-bold text-xl"
          >
            {hasMore ? "Loading..." : "No more jobs"}
          </div>
        </div>
      ) : (
        <div className="text-white font-bold text-3xl">
          No jobs available :(
        </div>
      )}
    </div>
  );
}