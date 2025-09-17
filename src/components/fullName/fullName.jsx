import { useState } from "react";
import { useUserStore } from "../../store/userStore";
import { Pencil } from "lucide-react";
import { uploadFullname } from "./uploadFullname";

export function FullName() {
  const { user, setUser } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(user.fullName);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!fullName.trim()) {
      setError("Full name cannot be empty");
      return;
    }

    try {
        let res = await uploadFullname(fullName);
        
        if(res.status == 200) {
            setError("");
            setIsEditing(false);
        }else if(res.status == 400) {
            setError(res.message);
        }else {
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

  return (
    <div className="flex flex-wrap items-center gap-3">
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="px-3 py-1 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-3 py-1 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center items-center gap-2">
          <h1 className="text-2xl md:text-3xl font-semibold text-white">
            {user.fullName}
          </h1>
          <div
          className=" flex cursor-pointer rounded-full w-[35px] h-[35px] bg-black/60 hover:bg-black/80 items-center justify-center shadow-md"
          onClick={() => { setIsEditing(true) }}
        >
          <Pencil size={20} color="white" />
        </div>
        </div>
      )}
    </div>
  );
}