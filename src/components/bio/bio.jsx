import { useState } from "react";
import { useUserStore } from "../../store/userStore";
import { uploadBio } from "./uploadBio";
import { Pencil } from "lucide-react";

export function Bio() {
  const { user } = useUserStore();
  const [isInput, setIsInput] = useState(false);
  const [bio, setBio] = useState(user.bio || "");
  const [error, setError] = useState("");

  const handleSave = async() => {
    if (!bio.trim()) {
      setError("Bio cannot be empty.");
      return;
    }

    let res = await uploadBio(bio.trim());

    if(res.status == 500) {
        setError("something went wrong");
    }else if(res.status == 200) {
        setError
        setIsInput(false);
    }else if(res.status == 400) {
        setError(res.message);
    }
  };

  return (
    <div className="mt-6">
      {isInput ? (
        <div className="flex flex-col gap-3">
          <textarea
            value={bio}
            onChange={(e) => {
              setBio(e.target.value);
              if (error) setError("");
            }}
            rows={4}
            className="w-full px-3 py-2 rounded-lg bg-gray-800 text-gray-200 border border-gray-600 focus:border-indigo-400 focus:ring focus:ring-indigo-400/50 outline-none resize-none"
            placeholder="Write something about yourself..."
          />
          {error && (
            <p className="text-red-500 text-xl">{error}</p>
          )}
          <div className="flex gap-2 justify-end">
            <button
              onClick={handleSave}
              className="px-3 py-1 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white transition"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsInput(false);
                setError("");
              }}
              className="px-3 py-1 rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : user.bio ? (
        <div
          className="flex flex-wrap gap-5"
        >
        <p className="text-gray-200 text-lg leading-relaxed text-center md:text-left">
          {user.bio}
        </p>
        
        <div
          className=" flex cursor-pointer rounded-full w-[35px] h-[35px] bg-black/60 hover:bg-black/80 items-center justify-center shadow-md"
          onClick={() => { setIsInput(true) }}
        >
          <Pencil size={20} color="white" />
        </div>
        </div>

      ) : (
        <p className="italic text-gray-500 text-center md:text-left text-xl">
          <button
            className="hover:text-blue-400 underline"
            onClick={() => setIsInput(true)}
          >
            Add
          </button>{" "}
          a bio to tell people about yourself
        </p>
      )}
    </div>
  );
}