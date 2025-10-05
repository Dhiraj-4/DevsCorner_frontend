import { useEffect } from "react"
import { getMyJobsHandler } from "../../utils/getMyJobsHandler.js";
import { JobTemplate } from "./jobTemplate.jsx";
import { useJobStore } from "../../store/jobPostStore.js";

export function MyJobsPage() {
    const {
        pageNumber,
        setPageNumber,
        jobsArray
    } = useJobStore();

    
    async function handler() {
        await getMyJobsHandler();
        setPageNumber(pageNumber+1);
    }

    useEffect( () => {
        handler();
    },[]);
    
    return (
        <div className="flex justify-center items-center h-screen mt-20 pt-20 bg-black">
            <div className="max-w-4xl w-full m-auto p-8 rounded-2xl bg-zinc-900 shadow-xl">
                {
                    jobsArray.map( (job) => {
                        return <JobTemplate 
                            text={job.text}
                            companyName={job.companyName}
                            // owner={job.owner}
                            applyLink={job.applyLink}
                            role={job.role}
                            jobId={job.jobId}
                        />
                    })
                }
            </div>
        </div>
    )
}