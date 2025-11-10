import { useState } from "react";
import { Pencil } from "lucide-react";
import { Input } from "../../Inputs/input.jsx";
import { uploadLocationType } from "./utils/uploadLocationType.js";
import { OnSaveButton } from "../../../components/Buttons/onSaveButton.jsx";
import { OnCancelButton } from "../../../components/Buttons/onCancelButton.jsx";

export function LocationType({ locationType, owner, jobId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [jobLocationType, setJobLocationType] = useState(locationType); 
  const [locationTypeState, setLocationTypeState] = useState(jobLocationType);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!locationTypeState.trim()) {
      setError("Location type cannot be empty");
      return;
    }

    try {
      const res = await uploadLocationType(locationTypeState, jobId);

      if (res.status === 200) {
        setError("");
        setJobLocationType(res.locationTypeState);
        setIsEditing(false);
      } else if (res.status === 400) {
        setError(res.message);
      } else {
        setError("Something went wrong");
      }
    } catch {
      setError("Failed to update location type. Try again.");
    }
  };

  const handleCancel = () => {
    setLocationTypeState(jobLocationType);
    setIsEditing(false);
    setError("");
  };

  return (
    <div className="w-full flex flex-col gap-3 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300">
      {owner === "YOU" && isEditing ? (
        <div className="flex flex-col gap-3">
          <Input
            type="text"
            name="locationType"
            minLength={3}
            placeholder="Remote / Hybrid / On-site"
            value={locationTypeState}
            set={setLocationTypeState}
            autoComplete="locationType"
            required={true}
          />

          {error && (
            <span className="text-red-500 text-sm font-medium">{error}</span>
          )}

          <div className="flex flex-wrap gap-2">
            <OnSaveButton text={"Save"} onClick={handleSave} />
            <OnCancelButton text={"Cancel"} onClick={handleCancel} />
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-base sm:text-lg text-gray-800 dark:text-gray-100 font-medium">
            <span className="font-semibold">Location Type:</span>{" "}
            {jobLocationType}
          </div>

          {owner === "YOU" && (
            <div
              onClick={() => setIsEditing(true)}
              className="flex cursor-pointer rounded-full w-[32px] h-[32px] border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 items-center justify-center transition-colors duration-300"
            >
              <Pencil size={18} className="text-gray-800 dark:text-gray-100" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}