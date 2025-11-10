import { useState } from "react"
import { Pencil } from "lucide-react";
import { Input } from "../../Inputs/input.jsx";
import { uploadLocation } from "./utils/uploadLocation.js";
import { OnSaveButton } from "../../../components/Buttons/onSaveButton.jsx";
import { OnCancelButton } from "../../../components/Buttons/onCancelButton.jsx";

export function Location({ location, owner, jobId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [jobLocation, setJobLocation] = useState(location); 
  const [locationState, setLocationState] = useState(jobLocation);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!locationState.trim()) {
      setError("Location cannot be empty");
      return;
    }

    try {
      const res = await uploadLocation(locationState, jobId);

      if (res.status === 200) {
        setError("");
        setJobLocation(res.locationState);
        setIsEditing(false);
      } else if (res.status === 400) {
        setError(res.message);
      } else {
        setError("Something went wrong");
      }
    } catch {
      setError("Failed to update location. Try again.");
    }
  };

  const handleCancel = () => {
    setLocationState(jobLocation);
    setIsEditing(false);
    setError("");
  };

  return (
    <div className="w-full flex flex-col gap-3 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300">
      {owner === "YOU" && isEditing ? (
        <div className="flex flex-col gap-3">
          <Input
            type="text"
            name="location"
            minLength={1}
            placeholder="City, State, Country"
            value={locationState}
            set={setLocationState}
            autoComplete="location"
            required={true}
          />
          {error && (
            <span className="text-red-500 text-sm font-medium">{error}</span>
          )}

          <div className="flex flex-wrap gap-2">
            <OnSaveButton   text={"Save"} onClick={handleSave} />
            <OnCancelButton text={"Cancel"} onClick={handleCancel} />
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-base sm:text-lg text-gray-800 dark:text-gray-100 font-medium">
            <span className="font-semibold">Location:</span> {jobLocation}
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