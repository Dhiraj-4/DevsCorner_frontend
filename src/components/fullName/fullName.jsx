import { useState } from "react";
import { useUserStore } from "../../store/userStore";
import { Pencil } from "lucide-react";
import { uploadFullname } from "./uploadFullname";
import { useTheme } from "../../theme-provider.jsx";

export function FullName() {
  const { user, setUser } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(user.fullName);
  const [error, setError] = useState("");
  const { activeTheme } = useTheme();

  const handleSave = async () => {
    if (!fullName.trim()) {
      setError("Full name cannot be empty");
      return;
    }

    try {
      let res = await uploadFullname(fullName);

      if (res.status == 200) {
        setError("");
        setIsEditing(false);
      } else if (res.status == 400) {
        setError(res.message);
      } else {
        setError("Something went wrong");
      }
      setUser({ ...user, fullName });
    } catch (err) {
      setError("Failed to update full name. Try again.");
    }
  };

  const handleCancel = () => {
    setFullName(user.fullName);
    setIsEditing(false);
    setError("");
  };

  const inputBg =
    activeTheme === "dark"
      ? "bg-zinc-800 text-white placeholder:text-zinc-500"
      : activeTheme === "light"
      ? "bg-zinc-100 text-zinc-900 placeholder:text-zinc-500"
      : "bg-background text-foreground";

  return (
    <div className="flex flex-wrap items-center gap-3">
      {isEditing ? (
        <div className="flex flex-col gap-2 w-full sm:w-auto">
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={`w-full rounded-xl px-4 py-2 text-sm md:text-base bg-background text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-ring/50 resize-none shadow-sm`}
            placeholder="Enter your full name"
          />
          {error && (
            <span className="text-red-500 text-sm font-medium">{error}</span>
          )}
          <div className="flex gap-2 mt-1">
            <button
              onClick={handleSave}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium px-4 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition`}
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className={`px-4 py-1.5 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition`}
            >
              Cancel
            </button>
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
            {user.fullName}
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
  );
}