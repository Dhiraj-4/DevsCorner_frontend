import { useEffect, useRef } from "react"
import { JobTemplate } from "../../../components/Job Components/jobTemplate.jsx";
import { useUserStore } from "../../../store/userStore.js";
import { useJobStore } from "../../../store/jobPostStore.js";
import { getMyJobsHandler } from "./getMyJobsHandler.js";

export function MyJobsPage() {
    const {
        setPageNumber,
        reset_jobStore,
        hasMore,
        myJobsArray
    } = useJobStore();

    const {
        user
    } = useUserStore();

    const targetRef = useRef(null);
    const isLoadingRef = useRef(false);

    async function loadMore(entries, observer) {
        if(isLoadingRef.current || !hasMore) return;

        for(let entry of entries) {
            if(entry.isIntersecting) {
                console.log("loaded more");
                isLoadingRef.current = true;
                await getMyJobsHandler();
                setPageNumber();
                isLoadingRef.current = false;
            }
        }
    } 

    async function handler() {
        reset_jobStore();
        await getMyJobsHandler();
        setPageNumber();
    }

    useEffect( () => {
        handler();
    },[]);

    useEffect( () => {
        if(!targetRef.current) return;

        const options = {
            root: document.querySelector("scrollArea"),
            rootMargin: "0px",
            threshold: 0,
        }

        const observer = new IntersectionObserver(loadMore, options);
        observer.observe(targetRef.current);

        return () => observer.disconnect();
    },[myJobsArray, hasMore])
    
    return (
        <div className="flex justify-center items-center h-full min-h-screen mt-20 pt-20 bg-black">
            {
                (myJobsArray.length != 0) ?

                <div className="fixed top-40 left-1/2 -translate-x-1/2 max-w-4xl w-full h-[calc(100vh-13rem)] overflow-y-auto 
             p-8 rounded-2xl bg-zinc-900 shadow-xl">
                {
                    myJobsArray.map( (job) => {
                        return <JobTemplate
                            refresh={getMyJobsHandler}
                            key={job.jobId}
                            text={job.text}
                            companyName={job.companyName}
                            owner={ (user.userName === job.owner.userName) ? "YOU" : job.owner }
                            applyLink={job.applyLink}
                            role={job.role}
                            jobId={job.jobId}
                            salary={job.salary}
                            location={job.location}
                            locationType={job.locationType}
                            experience={job.experience}
                        />
                    })
                }

                <div
                  id="target"
                  ref={targetRef}
                  className="flex justify-center text-white font-bold text-xl"
                >
                  {hasMore ? "Loading..." : "No more jobs"}
                </div>
        
            </div>

            :

            <div className="text-white font-bold text-3xl"
            >You have not created yet :(</div>
            }
        </div>
    )
}