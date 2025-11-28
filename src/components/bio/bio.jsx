import { useState } from "react";
import { useUserStore } from "../../store/userStore.js";
import { uploadBio } from "./uploadBio.js";
import { Pencil } from "lucide-react";
import { OnSaveButton } from "../Buttons/onSaveButton.jsx";
import { OnCancelButton } from "../Buttons/onCancelButton.jsx";
import { UpdateField } from "../Inputs/updateFieldInput.jsx";
import { SkeletonBlock } from "../loaders/skeletonLoaders.jsx";

export function Bio() {
  const userBio = useUserStore((state) => state.user.bio);
  const updateUser = useUserStore((state) => state.updateUser);
  const [isInput, setIsInput] = useState(false);
  const [bio, setBio] = useState(userBio || null);
  const [error, setError] = useState("");
  const [ isLoading, setIsLoading ] = useState(false);

  const handleSave = async () => {
    if (!bio?.trim()) {
      setError("Bio cannot be empty.");
      return;
    }

    setIsLoading(true);
    let res = await uploadBio(bio.trim());
    setIsLoading(false);

    if (res.status === 500) {
      setError("Something went wrong");
    } else if (res.status === 200) {
      setBio(res.bio);
      updateUser({ bio: res.bio });
      setError("");
      setIsInput(false);
    } else if (res.status === 400) {
      setError(res.message);
    } else {
      setError(res.message || "Failed to update bio");
    }
  };

  return (
    <>
    {isLoading ? <SkeletonBlock height="4rem" /> : 
    
      <div className="mt-6 w-full">
      {isInput ? (
        <div className="flex flex-col gap-3">
          <UpdateField
            value={bio}
            onChange={(val) => {
              setBio(val);
              if (error) setError("");
            }}
            rows={4}
            placeholder={"Write something about yourself..."}
            className="w-full"
            />
          {error && (
            <span className="text-destructive text-sm font-medium">{error}</span>
          )}
          <div className="flex gap-2 justify-end">
            <OnSaveButton text={"Save"} onClick={handleSave} />
            <OnCancelButton text={"Cancel"} onClick={() => {
              setBio(userBio || null);
              setIsInput(false);
              setError("");
            }} />
          </div>
        </div>
      ) : bio ? (
        <div className="flex flex-wrap gap-4 items-start">
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-[600px] wrap-break-word">
            {bio}
          </p>
          <div
            className="flex cursor-pointer rounded-full w-9 h-9 bg-muted hover:bg-muted/70 items-center justify-center shadow-sm transition"
            onClick={() => setIsInput(true)}
          >
            <Pencil size={18} className="text-foreground" />
          </div>
        </div>
      ) : (
        <p className="italic text-muted-foreground text-center md:text-left text-lg">
          <button
            className="hover:text-primary underline underline-offset-2"
            onClick={() => setIsInput(true)}
          >
            Add
          </button>{" "}
          a bio to tell people about yourself
        </p>
      )}
    </div>
    }
    </>
  );
}