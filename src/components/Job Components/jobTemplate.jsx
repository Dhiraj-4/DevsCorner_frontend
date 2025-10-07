import { Trash2 } from "lucide-react";
import { CoolButton } from "../../components/Buttons/button.jsx";
import { ApplyLink } from "./template components/applyLink.jsx";
import { CompanyName } from "./template components/companyName.jsx";
import { Description } from "./template components/description.jsx";
import { Owner } from "./template components/owner.jsx";
import { Role } from "./template components/role.jsx";
import { deleteJob } from "./template components/utils/deleteJob.js";

export function JobTemplate({ applyLink = "", companyName = "Indie", text, role, owner, jobId, refresh}) {


  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto p-6 mb-4 bg-white shadow-md rounded-2xl border border-gray-200">
      
        {(owner != "YOU") ? (
            <Owner owner={owner} />
        ) : (
            <div className="flex justify-between items-center gap-2 mb-2">
            <span className="px-3 py-2 text-xs font-bold text-white bg-blue-600 rounded-full">
              YOU
            </span>

            <Trash2 
                className="w-7 h-7 text-gray-400 hover:text-red-400 cursor-pointer" 
                onClick={async() => deleteJob(jobId, refresh)}
            />
            </div>
        )}

      
      
      <CompanyName companyName={companyName} owner={owner} jobId={jobId}/>

      <Role role={role} owner={owner} jobId={jobId}/>

      <Description text={text} owner={owner} jobId={jobId}/>

      
      <ApplyLink applyLink={applyLink} owner={owner} jobId={jobId}/>

      <div className="flex items-center justify-between gap-2">
      <CoolButton text={"Message"}/>
      </div>
    </div>
  );
}