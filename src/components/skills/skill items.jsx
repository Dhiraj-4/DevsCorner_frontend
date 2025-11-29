import { useState } from "react";
import { X } from "lucide-react";
import { useTheme } from "../../theme-provider.jsx";
import { OnSaveButton } from "../Buttons/onSaveButton.jsx";
import { OnCancelButton } from "../Buttons/onCancelButton.jsx";
import { UpdateField } from "../Inputs/updateFieldInput.jsx";
import { SkeletonBlock } from "../loaders/skeletonLoaders.jsx";

export function SkillItem({ skillKey, onSave, onDelete }) {
  const [isInput, setIsInput] = useState(false);
  const [error, setError] = useState("");
  const { activeTheme } = useTheme();
  const [ isLoading, setIsLoading ] = useState(false);

  const isDark = activeTheme === "dark";
  const chipBg = isDark ? "bg-zinc-800" : "bg-zinc-200";
  const textColor = isDark ? "text-zinc-100" : "text-zinc-800";

  const handleSave = async () => {
    const input = document
      .getElementById(`skill-input-${skillKey || "new"}`)
      .value.trim();

    if (!input) {
      setError("Skill is required");
      return;
    }
    if (input.length > 50) {
      setError("Skill too long (max 50 chars)");
      return;
    }

    try {
      setIsLoading(true);
      let res = await onSave(input);

      if (res.status === 400 || res.status === 500) {
        setError(res.message);
      } else if (res.status === 200) {
        setError("");
        setIsInput(false);
      }
    } catch (err) {
      setError("Failed to save skill");
      console.error(err);
    }finally {
      setIsLoading(false);
    }
  };

  async function onDeleteHandler() {
    
    setIsLoading(true);
    await onDelete();
    setIsLoading(false);         
  }

  return (
    <>
      {isLoading ? 
        <SkeletonBlock width={100} height={32} className="rounded-full" />
        :
        <div className={`flex items-center gap-2 ${textColor}`}>
      {skillKey ? (
        <div className={`flex justify-center items-center gap-2 ${chipBg} rounded-2xl p-2 shadow-sm`}>
          <span>{skillKey}</span>
          <X
            className="w-4 h-4 hover:text-red-400 cursor-pointer"
            onClick={() => onDeleteHandler()}
          />
        </div>
      ) : (
        <div className="flex flex-col">
          {isInput ? (
            <div className="flex flex-wrap items-center gap-2">
              <UpdateField
                id={`skill-input-${skillKey || "new"}`}
                required
                onChange={() => setError("")}
                placeholder={"Enter skill"}
              />
              <div className="flex gap-2">
                <OnSaveButton text="Save" onClick={handleSave} />
                <OnCancelButton text="Cancel" onClick={() => { setIsInput(false); setError(""); }} />
              </div>
            </div>
          ) : (
            <OnSaveButton text="Add Skill" onClick={() => setIsInput(true)} />
          )}
          {error && (
            <span className="text-red-400 text-base font-bold">{error}</span>
          )}
        </div>
      )}
    </div>
      }
    </>
  );
}