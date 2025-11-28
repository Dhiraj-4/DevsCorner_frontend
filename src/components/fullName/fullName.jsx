import { useState } from "react";
import { useUserStore } from "../../store/userStore.js";
import { Pencil } from "lucide-react";
import { uploadFullname } from "./uploadFullname.js";
import { useTheme } from "../../theme-provider.jsx";
import { OnSaveButton } from "../Buttons/onSaveButton.jsx";
import { OnCancelButton } from "../Buttons/onCancelButton.jsx";
import { UpdateField } from "../Inputs/updateFieldInput";
import { SkeletonBlock } from "../loaders/skeletonLoaders.jsx";

export function FullName() {
  const fullNameStore = useUserStore((state) => state.user.fullName);
  const { updateUser } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(fullNameStore|| "");
  const [error, setError] = useState("");
  const { activeTheme } = useTheme();
  const [ isLoading, setIsLoading ] = useState(false);

  const handleSave = async () => {
  if (!fullName.trim()) {
    setError("Full name cannot be empty");
    return;
  }

  try {
    setIsLoading(true);
    let res = await uploadFullname(fullName.trim());

    if (res.status == 200) {
      setError("");
      setFullName(res.fullName);
      updateUser({ fullName: res.fullName });
      setIsEditing(false);
    } else if (res.status == 400) {
      setError(res.message);
    } else {
      setError("Something went wrong");
    }
  } catch {
    setError("Failed to update full name. Try again.");
  } finally {
    setIsLoading(false);
  }
};


  const handleCancel = () => {
    setFullName(fullNameStore || "");
    setIsEditing(false);
    setError("");
  };

  return (
    <>
     {isLoading ? <SkeletonBlock width="150px" height="40px" /> :
     
      <div className="flex flex-wrap items-center gap-3">
      {isEditing ? (
        <div className="flex flex-col gap-2 w-full sm:w-auto">
          <UpdateField
            value={fullName}
            onChange={(val) => setFullName(val)}
            placeholder={"Enter your full name"}
          />
          {error && (
            <span className="text-red-500 text-sm font-medium">{error}</span>
          )}
          <div className="flex gap-2 mt-1">
            <OnSaveButton text="Save" onClick={handleSave} />
            <OnCancelButton text="Cancel" onClick={handleCancel} />
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center md:justify-start items-center gap-2">
          <h1
            className={`text-2xl md:text-3xl font-semibold ${
              activeTheme === "dark"
                ? "text-white"
                : activeTheme === "light"
                ? "text-zinc-900"
                : "text-foreground"
            }`}
          >
            {fullNameStore}
          </h1>
          <div
            className="flex cursor-pointer rounded-full w-9 h-9 bg-muted hover:bg-muted/70 items-center justify-center shadow-sm transition"
            onClick={() => setIsEditing(true)}
          >
            <Pencil size={18} className="text-foreground" />
          </div>
        </div>
      )}
    </div>
     }
    </>
  );
}