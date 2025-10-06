import { CoolButton } from "../../components/Buttons/button.jsx";
import { CompanyName } from "./template components/companyName.jsx";
import { Owner } from "./template components/owner.jsx";
import { Role } from "./template components/role.jsx";

export function JobTemplate({ applyLink = "", companyName = "Indie", text, role, owner, jobId }) {


  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto p-6 mb-4 bg-white shadow-md rounded-2xl border border-gray-200">
      
        {(owner != "YOU") ? (
            <Owner owner={owner} />
        ) : (
            <div className="flex justify-between items-center gap-2 mb-2">
            <span className="px-3 py-2 text-xs font-bold text-white bg-blue-600 rounded-full">
              YOU
            </span>
            </div>
        )}

      
      
      <CompanyName companyName={companyName} owner={owner} jobId={jobId}/>

      <Role role={role} owner={owner} jobId={jobId}/>

      <div className="mb-4 text-sm text-gray-600">Description: {text}</div>

      <div className="flex items-center justify-between gap-2">
        {applyLink && (
        <a
          href={applyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg shadow hover:bg-green-700 transition"
        >
          Apply Now
        </a>
      )}

      <CoolButton text={"Message"}/>
      </div>
    </div>
  );
}