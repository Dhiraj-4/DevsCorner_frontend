import { useEffect } from "react"
import { getMyJobsHandler } from "../../utils/getMyJobsHandler.js";
import { useJobStore } from "../../store/jobPostStore.js";
import { useUserStore } from "../../store/userStore.js";
import { JobTemplate } from "../../components/Job Components/jobTemplate.jsx";

export function MyJobsPage() {
    const {
        pageNumber,
        setPageNumber,
<<<<<<< HEAD
        jobsArray
=======
        jobsArray,
        reset_jobStore
>>>>>>> d724ff7 (whole basic job's CRUD flow is done, today added udpate to applyLink and description and delete button to delete job)
    } = useJobStore();

    const {
        user
    } = useUserStore();

    
    async function handler() {
<<<<<<< HEAD
        await getMyJobsHandler();
        setPageNumber(pageNumber+1);
=======
        reset_jobStore();
        await getMyJobsHandler();
        // setPageNumber(pageNumber+1);
>>>>>>> d724ff7 (whole basic job's CRUD flow is done, today added udpate to applyLink and description and delete button to delete job)
    }

    useEffect( () => {
        handler();
    },[]);
    
    return (
<<<<<<< HEAD
        <div className="flex justify-center items-center h-full mt-20 pt-20 bg-black">
            <div className="max-w-4xl w-full m-auto p-8 rounded-2xl bg-zinc-900 shadow-xl">
                {
                    jobsArray.map( (job) => {
                        return <JobTemplate
=======
        <div className="flex justify-center items-center h-full min-h-screen mt-20 pt-20 bg-black">
            {
                (jobsArray.length != 0) ?

                <div className="fixed top-40 left-1/2 -translate-x-1/2 max-w-4xl w-full h-[calc(100vh-13rem)] overflow-y-auto 
             p-8 rounded-2xl bg-zinc-900 shadow-xl">
                {
                    jobsArray.map( (job) => {
                        return <JobTemplate
                            refresh={getMyJobsHandler}
>>>>>>> d724ff7 (whole basic job's CRUD flow is done, today added udpate to applyLink and description and delete button to delete job)
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
<<<<<<< HEAD
=======

            :

            <div className="text-white font-bold text-3xl"
            >You have not created yet :(</div>
            }
>>>>>>> d724ff7 (whole basic job's CRUD flow is done, today added udpate to applyLink and description and delete button to delete job)
        </div>
    )
}