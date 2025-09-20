import { useState } from "react";
import { MapPin, X } from "lucide-react";
import { useUserStore } from "../../store/userStore";
import { CoolButton } from "../Buttons/button";
import { deleteLocation } from "./deleteLocation";

export function Location({ onSave }) {
  const [isInput, setIsInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const { user } = useUserStore();

  const handleSave = async () => {
    if (!inputValue.trim()) {
      setError("Location is required");
      return;
    }
    if (inputValue.length > 100) {
      setError("Location too long (max 100 chars)");
      return;
    }

    try {
      const res = await onSave(inputValue.trim());
      if (res.status === 200) {
        setIsInput(false);
        setError("");
    } else {
        setError(res.message || "Failed to save");
    }
    } catch (err) {
      setError("Error saving location");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center gap-3 text-gray-300">
      <MapPin className="w-5 h-5 text-gray-400" />

      {user.location && !isInput ? (
        <div className="flex items-center gap-2 bg-black rounded-2xl px-3 py-1">
          <span className="text-gray-400">{user.location}</span>
          <X
            className="w-4 h-4 hover:text-red-400 cursor-pointer"
            onClick={deleteLocation}
          />
        </div>
      ) : isInput ? (
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 flex-wrap items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setError("");
              }}
              placeholder="Enter location"
              className="px-2 py-1 rounded bg-gray-900 text-white text-sm border border-gray-700 focus:outline-none"
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
          {error && <span className="text-red-400 text-base font-bold">{error}</span>}
        </div>
      ) : (
        <span className="italic text-gray-500">
          <button
            className="hover:text-blue-500 underline"
            onClick={() => setIsInput(true)}
          >
            Add
          </button>{" "}
          location
        </span>
      )}
    </div>
  );
}