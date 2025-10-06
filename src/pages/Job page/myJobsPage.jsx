import { useEffect } from "react"
import { getMyJobsHandler } from "../../utils/getMyJobsHandler.js";
import { useJobStore } from "../../store/jobPostStore.js";
import { useUserStore } from "../../store/userStore.js";
import { JobTemplate } from "../../components/Job Components/jobTemplate.jsx";

export function MyJobsPage() {
    const {
        pageNumber,
        setPageNumber,
        jobsArray
    } = useJobStore();

    const {
        user
    } = useUserStore();

    
    async function handler() {
        await getMyJobsHandler();
        setPageNumber(pageNumber+1);
    }

    useEffect( () => {
        handler();
    },[]);
    
    return (
        <div className="flex justify-center items-center h-full mt-20 pt-20 bg-black">
            <div className="max-w-4xl w-full m-auto p-8 rounded-2xl bg-zinc-900 shadow-xl">
                {
                    jobsArray.map( (job) => {
                        return <JobTemplate
                            key={job.jobId}
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
        </div>
    )
}