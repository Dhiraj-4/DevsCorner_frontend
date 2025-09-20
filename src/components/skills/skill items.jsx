import { useState } from "react";
import { CoolButton } from "../Buttons/button";
import { X } from "lucide-react";

export function SkillItem({ skillKey, onSave, onDelete }) {
  const [isInput, setIsInput] = useState(false);
  const [error, setError] = useState("");

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
    }
  };

  return (
    <div className="flex items-center gap-2 text-white">
      {skillKey ? (
        <div className="flex justify-center items-center gap-2 bg-black rounded-2xl p-2">
          <span>{skillKey}</span>
          <X
            className="w-4 h-4 hover:text-red-400 cursor-pointer"
            onClick={() => onDelete(skillKey)}
          />
        </div>
      ) : (
        <div className="flex flex-col">
          {isInput ? (
            <div className="flex flex-wrap items-center gap-2">
              <input
                id={`skill-input-${skillKey || "new"}`}
                required
                className="px-2 py-1 rounded bg-gray-900 text-white text-sm border border-gray-700 focus:outline-none"
                placeholder="Enter skill"
                onChange={() => setError("")}
              />
              <div className="flex gap-2">
                <CoolButton text="save" clickHandler={handleSave} />
              <CoolButton
                text="cancel"
                clickHandler={() => {
                  setIsInput(false);
                  setError("");
                }}
              />
              </div>
            </div>
          ) : (
            <CoolButton text="Add Skill" clickHandler={() => setIsInput(true)} />
          )}
          {error && <span className="text-red-400 text-base font-bold">{error}</span>}
        </div>
      )}
    </div>
  );
}