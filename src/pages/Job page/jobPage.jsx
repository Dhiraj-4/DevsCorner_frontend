import JobNavbar from "../../navbars/jobNavbar";

export function JobPage() {
    return (
        <div className="flex justify-center items-center h-screen pt-20 bg-black">
            <div className="max-w-4xl w-full m-auto p-8 rounded-2xl bg-zinc-900 shadow-xl">
                
                {/* Navbar */}
                <JobNavbar />
            </div>
        </div>
    )
}