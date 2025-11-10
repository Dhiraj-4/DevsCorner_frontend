import { useState } from "react";
import { Pencil } from "lucide-react";
import { Input } from "../../Inputs/input.jsx";
import { uploadCompanyName } from "./utils/uploadCompanyName.js";
import { useTheme } from "../../../theme-provider.jsx";
import { OnSaveButton } from "../../../components/Buttons/onSaveButton.jsx";
import { OnCancelButton } from "../../../components/Buttons/onCancelButton.jsx";

export function CompanyName({ companyName, owner, jobId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [jobCompany, setJobCompany] = useState(companyName);
  const [company, setCompany] = useState(jobCompany);
  const [error, setError] = useState("");

  const { activeTheme } = useTheme();
  const isDark = activeTheme === "dark";

  const textPrimary = isDark ? "text-zinc-100" : "text-zinc-900";
  const labelColor = isDark ? "text-zinc-300" : "text-zinc-700";
  const errorColor = isDark ? "text-red-400" : "text-red-600";
  const editBg = isDark
    ? "bg-zinc-800 hover:bg-zinc-700"
    : "bg-zinc-200 hover:bg-zinc-300";

  async function handleSave() {
    if (!company.trim()) {
      setError("Company name cannot be empty");
      return;
    }

    try {
      const res = await uploadCompanyName(company, jobId);

      if (res.status === 200) {
        setError("");
        setJobCompany(res.company);
        setIsEditing(false);
      } else if (res.status === 400) {
        setError(res.message);
      } else {
        setError("Something went wrong");
      }
    } catch (err) {
      setError("Failed to update company name. Try again.");
    }
  }

  function handleCancel() {
    setCompany(jobCompany);
    setIsEditing(false);
    setError("");
  }

  return (
    <div className="flex flex-col gap-2 transition-colors duration-300">
      {owner === "YOU" && isEditing ? (
        <div className="flex flex-col gap-3">
          <Input
            type="text"
            name="companyName"
            minLength={1}
            placeholder="Company Name"
            value={company}
            set={setCompany}
            autoComplete="companyName"
            required
          />
          {error && (
            <span className={`text-sm font-semibold ${errorColor}`}>{error}</span>
          )}
          <div className="flex gap-2">
            <OnSaveButton text={"Save"} onClick={handleSave} />
            <OnCancelButton text={"Cancel"} onClick={handleCancel} />
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-3">
          <div className={`text-lg font-semibold ${labelColor}`}>
            Company: <span className={textPrimary}>{jobCompany}</span>
          </div>

          {owner === "YOU" && (
            <div
              className={`flex cursor-pointer rounded-full w-[30px] h-[30px] ${editBg} items-center justify-center shadow-md transition-all duration-200`}
              onClick={() => setIsEditing(true)}
            >
              <Pencil size={18} className={isDark ? "text-zinc-100" : "text-zinc-700"} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}