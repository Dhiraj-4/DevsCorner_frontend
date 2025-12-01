import { useState } from "react";
import { Pencil } from "lucide-react";
import { Input } from "../../Inputs/input.jsx";
import { uploadExperience } from "./utils/uploadExperience.js";
import { OnSaveButton } from "../../../components/Buttons/onSaveButton.jsx";
import { OnCancelButton } from "../../../components/Buttons/onCancelButton.jsx";
import { SkeletonBlock } from "../../../components/loaders/skeletonLoaders.jsx";

export function Experience({ experience, owner, jobId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [jobExperience, setJobExperience] = useState(experience);
  const [experienceState, setExperienceState] = useState(jobExperience);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!experienceState.trim()) {
      setError("experience cannot be empty");
      return;
    }

    try {
      setIsLoading(true);
      let res = await uploadExperience(experienceState, jobId);

      if (res.status == 200) {
        setError("");
        setJobExperience(res.experienceState);
        setIsEditing(false);
      } else if (res.status == 400) {
        setError(res.message);
      } else {
        setError("Something went wrong");
      }
    } catch (err) {
      setError("Failed to update experience. Try again.");
    }finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setExperienceState(jobExperience);
    setIsEditing(false);
    setError("");
  };

  return (
    <>
       { isLoading ? <SkeletonBlock height="2rem" width="35%" /> : 
         
         <div className="flex flex-col gap-2">
      {owner === "YOU" && isEditing ? (
        <div className="flex flex-col gap-3">
          <Input
            type="number"
            name="experience"
            minLength={1}
            placeholder="Experience"
            value={experienceState}
            set={setExperienceState}
            autoComplete="experience"
            required={false}
          />

          {error && (
            <span className="text-red-500 text-sm font-medium">{error}</span>
          )}

          <div className="flex gap-2">
            <OnSaveButton text="Save" onClick={handleSave} />
            <OnCancelButton text="Cancel" onClick={handleCancel} />
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-3">
          <div className="text-base sm:text-lg font-medium text-neutral-700 dark:text-neutral-200">
            Experience: <span className="font-semibold">{jobExperience} year</span>
          </div>

          {owner === "YOU" && (
            <div
              onClick={() => setIsEditing(true)}
              className="flex cursor-pointer w-8 h-8 rounded-full 
                         bg-neutral-200 dark:bg-neutral-700 
                         hover:bg-neutral-300 dark:hover:bg-neutral-600 
                         items-center justify-center transition-all duration-200 shadow-sm"
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