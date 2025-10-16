import { useState } from "react";
import JobNavbar from "../../navbars/jobNavbar";
import { CoolButton } from "../../components/Buttons/button.jsx";
import { useNavigate } from "react-router-dom";
import { MyJobsPage } from "./My job page/myJobsPage.jsx";
import { AllJobsPage } from "./all jobs page/allJobsPage.jsx";

export function JobPage() {
    const [activeTab, setActiveTab] = useState("jobs");

    const navigate = useNavigate();
    return (
        <>
                {/* Navbar */}
                <JobNavbar activeTab={activeTab} setActiveTab={setActiveTab}/>

                {
                    (activeTab == "my-jobs") ? <MyJobsPage /> : <AllJobsPage />
                }

                <div id="postJobButton" className="fixed bottom-0 w-full flex items-center justify-center">
                    <div className="flex-shrink-0">
                        <CoolButton text={"Post Job"} clickHandler={() => navigate("/post-job")}/>
                    </div>
                </div>
        </>
    )
}