import { useState } from "react";
import { MapPin, X } from "lucide-react";
import { useUserStore } from "../../store/userStore.js";
import { deleteLocation } from "./deleteLocation.js";
import { useTheme } from "../../theme-provider.jsx";
import { OnSaveButton } from "../Buttons/onSaveButton.jsx";
import { OnCancelButton } from "../Buttons/onCancelButton.jsx";
import { UpdateField } from "../Inputs/updateFieldInput.jsx";

export function Location({ onSave }) {
  const [isInput, setIsInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const userLocation = useUserStore((state) => state.user.location);
  const updateUser = useUserStore((state) => state.updateUser);
  const [location, setLocation] = useState(userLocation || "");
  const { activeTheme } = useTheme();

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
        setLocation(res.location);
        updateUser({ location: res.location });
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

  const handleDelete = async () => {  
    try {
      const res = await deleteLocation();
      if (res.status === 200) {
        setLocation("");
        updateUser({ location: "" });
        setError("");
      } else {
        setError(res.message || "Failed to delete");
      }
    } catch (err) {
      setError("Error deleting location");
      console.error(err);
    }
  };

  // ────────────────────────────────
  // 🎨 Theme-based styling
  // ────────────────────────────────
  const textColor =
    activeTheme === "dark" ? "text-gray-300" : "text-gray-700";
  const iconColor =
    activeTheme === "dark" ? "text-gray-400" : "text-gray-500";
  const bgPill =
    activeTheme === "dark"
      ? "bg-zinc-900 border-zinc-700"
      : "bg-gray-100 border-gray-300";
  const inputBg =
    activeTheme === "dark"
      ? "bg-zinc-800 border-zinc-700 text-gray-200"
      : "bg-white border-gray-300 text-gray-800";

  return (
    <div className={`flex items-center gap-3 ${textColor}`}>
      <MapPin className={`w-5 h-5 ${iconColor}`} />

      {location && !isInput ? (
        <div
          className={`flex items-center gap-2 px-3 py-1 border rounded-2xl ${bgPill}`}
        >
          <span className="max-w-[160px] sm:max-w-[220px]">
            {location}
          </span>
          <X
            className="w-4 h-4 hover:text-red-400 cursor-pointer transition-colors"
            onClick={handleDelete}
          />
        </div>
      ) : isInput ? (
        <div className="flex flex-col gap-1 w-full sm:w-auto">
          <div className="flex flex-wrap items-center gap-2">
            <UpdateField 
              value={inputValue} 
              onChange={(val) => { setInputValue(val); if (error) setError(""); }} 
              placeholder={"Enter location (e.g., City, State, Country)"}
              rows={2}
            />
            <div className="flex gap-2">
              <OnSaveButton text="Save" onClick={handleSave} />
              <OnCancelButton text="Cancel" onClick={() => { setIsInput(false); setError(""); }} />
            </div>
          </div>
          {error && (
            <span className="text-red-400 text-sm font-medium">{error}</span>
          )}
        </div>
      ) : (
        <span
          className={`italic ${
            activeTheme === "dark" ? "text-gray-500" : "text-gray-600"
          }`}
        >
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