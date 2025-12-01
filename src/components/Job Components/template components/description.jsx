import { useState } from "react"
import { Pencil } from "lucide-react";
import { TextArea } from "../../Inputs/textArea.jsx";
import { uploadText } from "./utils/uploadText.js";
import { OnSaveButton } from "../../../components/Buttons/onSaveButton.jsx";
import { OnCancelButton } from "../../../components/Buttons/onCancelButton.jsx";
import { SkeletonBlock } from "../../../components/loaders/skeletonLoaders.jsx";

export function Description({ text, owner, jobId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [jobText, setJobText] = useState(text);
  const [textState, setTextState] = useState(jobText);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!textState.trim()) {
      setError("Description cannot be empty");
      return;
    }

    try {
      setIsLoading(true);
      const res = await uploadText(textState, jobId);

      if (res.status === 200) {
        setError("");
        setJobText(res.text);
        setIsEditing(false);
      } else if (res.status === 400) {
        setError(res.message);
      } else {
        setError("Something went wrong");
      }
    } catch {
      setError("Failed to update description. Try again.");
    }finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setTextState(jobText);
    setIsEditing(false);
    setError("");
  };

  return (
    <>
      {isLoading ? <SkeletonBlock height={"6rem"} /> : 

       <div className="w-full flex flex-col gap-3 p-4 overflow-auto rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300">
      {owner === "YOU" && isEditing ? (
        <div className="flex flex-col gap-3">
          <TextArea
            type="text"
            name="description"
            minLength={50}
            placeholder="Description"
            value={textState}
            set={setTextState}
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
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="text-base sm:text-lg text-gray-800 dark:text-gray-100 leading-relaxed whitespace-pre-wrap">
            <span className="font-semibold">Description:</span> {jobText}
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