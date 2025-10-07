import { useState } from "react";
import JobNavbar from "../../navbars/jobNavbar";
import { MyJobsPage } from "./myJobsPage";
import { CoolButton } from "../../components/Buttons/button.jsx";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD

export function JobPage() {
    const [activeTab, setActiveTab] = useState("my-jobs");
=======
import { AllJobsPage } from "./all jobs page/allJobsPage.jsx";
import { useJobStore } from "../../store/jobPostStore.js";

export function JobPage() {
    const [activeTab, setActiveTab] = useState("jobs");

    const {
        reset_jobStore
    } = useJobStore();
>>>>>>> d724ff7 (whole basic job's CRUD flow is done, today added udpate to applyLink and description and delete button to delete job)

    const navigate = useNavigate();
    return (
        <>
                {/* Navbar */}
                <JobNavbar activeTab={activeTab} setActiveTab={setActiveTab}/>

                {
<<<<<<< HEAD
                    (activeTab == "my-jobs") ? <MyJobsPage /> : ""
=======
                    (activeTab == "my-jobs") ? <MyJobsPage /> : <AllJobsPage />
>>>>>>> d724ff7 (whole basic job's CRUD flow is done, today added udpate to applyLink and description and delete button to delete job)
                }

                <div id="postJobButton" className="fixed bottom-0 w-full flex items-center justify-center">
                    <div className="flex-shrink-0">
                        <CoolButton text={"Post Job"} clickHandler={() => navigate("/post-job")}/>
                    </div>
                </div>
        </>
    )
}