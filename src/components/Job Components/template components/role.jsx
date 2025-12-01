import { useState } from "react"
import { Pencil } from "lucide-react";
import { uploadRole } from "./utils/uploadRole.js";
import { Input } from "../../Inputs/input.jsx";
import { OnCancelButton } from "../../../components/Buttons/onCancelButton.jsx";
import { OnSaveButton } from "../../../components/Buttons/onSaveButton.jsx";
import { SkeletonBlock } from "../../../components/loaders/skeletonLoaders.jsx";

export function Role({ role, owner, jobId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [jobRole, setJobRole] = useState(role);
  const [roleState, setRoleState] = useState(jobRole);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!roleState.trim()) {
      setError("Role cannot be empty");
      return;
    }

    try {
      setIsLoading(true);
      const res = await uploadRole(roleState, jobId);
      if (res.status === 200) {
        setError("");
        setJobRole(res.roleState);
        setIsEditing(false);
      } else if (res.status === 400) {
        setError(res.message);
      } else {
        setError("Something went wrong");
      }
    } catch {
      setError("Failed to update role. Try again.");
    }finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setRoleState(jobRole);
    setIsEditing(false);
    setError("");
  };

  return (
    <>
      {isLoading ? <SkeletonBlock height={"2rem"} width={"60%"}/> :

      <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300">
      {owner === "YOU" && isEditing ? (
        <div className="flex flex-col gap-3 w-full">
          <Input
            type="text"
            name="role"
            minLength={3}
            placeholder="Role"
            value={roleState}
            set={setRoleState}
            autoComplete="role"
            required={true}
          />
          {error && (
            <span className="text-red-500 text-sm font-medium">{error}</span>
          )}
          <div className="flex gap-2">
            <OnSaveButton text={"Save"} onClick={handleSave} />
            <OnCancelButton text={"Cancel"} onClick={handleCancel} />
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-3">
          <div className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
            Role: <span className="font-normal">{jobRole}</span>
          </div>

          {owner === "YOU" && (
            <div
              onClick={() => setIsEditing(true)}
              className="flex cursor-pointer rounded-full w-8 h-8 border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 items-center justify-center transition-colors duration-300"
            >
              <Pencil size={18} className="text-gray-800 dark:text-gray-100" />
            </div>
          )}
        </div>
      )}
    </div>
    }
    </>
  );
}