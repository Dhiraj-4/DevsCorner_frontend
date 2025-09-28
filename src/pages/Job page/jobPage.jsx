import { useState } from "react";
import JobNavbar from "../../navbars/jobNavbar";
import { MyJobsPage } from "./myJobsPage";

export function JobPage() {
    const [activeTab, setActiveTab] = useState("my-jobs");

    return (
        <>
                {/* Navbar */}
                <JobNavbar activeTab={activeTab} setActiveTab={setActiveTab}/>

                {
                    (activeTab == "my-jobs") ? <MyJobsPage /> : ""
                }
        </>
    )
}