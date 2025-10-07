import { useEffect } from "react"
import { getAllJobsHandler } from "./getAllJobsHandler.js";
import { useJobStore } from "../../../store/jobPostStore.js";
import { useUserStore } from "../../../store/userStore.js";
import { JobTemplate } from "../../../components/Job Components/jobTemplate.jsx";

export function AllJobsPage() {
    const {
        pageNumber,
        setPageNumber,
        jobsArray,
        reset_jobStore
    } = useJobStore();

    const {
        user
    } = useUserStore();

    
    async function handler() {
        reset_jobStore();
        await getAllJobsHandler();
        // setPageNumber(pageNumber+1);
    }

    useEffect( () => {
        handler();
    },[]);
    
    return (
        <div className="flex justify-center items-center h-full mt-20 pt-20 bg-black">
            {
                (jobsArray.length != 0) ?

                <div className="fixed top-40 left-1/2 -translate-x-1/2 max-w-4xl w-full h-[calc(100vh-13rem)] overflow-y-auto 
                                p-8 rounded-2xl bg-zinc-900 shadow-xl">
                {
                    jobsArray.map( (job) => {
                        return <JobTemplate
                            refresh={getAllJobsHandler}
                            key={job.jobId + "1"}
                            text={job.text}
                            companyName={job.companyName}
                            owner={ (user.userName === job.owner.userName) ? "YOU" : job.owner }
                            applyLink={job.applyLink}
                            role={job.role}
                            jobId={job.jobId}
                        />
                    })
                }
            </div>

            :

            <div className="text-white font-bold text-3xl">
                No jobs available :(
            </div>
            }
        </div>
    )
}