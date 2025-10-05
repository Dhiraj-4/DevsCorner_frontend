import { CoolButton } from "../../components/Buttons/button";

export function JobTemplate({ jobId, applyLink = "", companyName = "Indie", text, role, owner }) {
  return (
    <div className="max-w-md mx-auto p-6 mb-4 bg-white shadow-md rounded-2xl border border-gray-200">
      <div className="flex items-center justify-between gap-2 mb-4">
        {owner ? (
            <Owner owner={owner} />
        ) : (
            <span className="px-3 py-1 text-xs font-bold text-white bg-blue-600 rounded-full">
            YOU
          </span>
        )}
      </div>
      
        <div className="text-lg font-semibold text-gray-800">Company : {companyName}</div>

      <div className="mb-2 text-xl font-bold text-gray-900">Role: {role}</div>

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