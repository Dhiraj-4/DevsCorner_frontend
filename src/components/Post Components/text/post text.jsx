import { useState } from "react";
import { Pencil } from "lucide-react";
import { uploadText } from "./uploadPostText.js";
import { TextArea } from "../../Inputs/textArea.jsx";
import { useTheme } from "../../../theme-provider.jsx";
import { OnSaveButton } from "../../../components/Buttons/onSaveButton.jsx";
import { OnCancelButton } from "../../../components/Buttons/onCancelButton.jsx";

export function PostText({ text, owner, postId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [textState, setTextState] = useState(text);
  const [error, setError] = useState("");
  const { activeTheme } = useTheme();

  const handleSave = async () => {
    if (!textState.trim()) {
      setError("Post text cannot be empty");
      return;
    }

    try {
      let res = await uploadText(textState, postId);

      if (res.status == 200) {
        setError("");
        setTextState(res.text);
        setIsEditing(false);
      } else if (res.status == 400) {
        setError(res.message);
      } else {
        setError("Something went wrong");
      }
    } catch (err) {
      setError("Failed to update post text. Try again.");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError("");
  };

  const textColor =
    activeTheme === "dark" ? "text-neutral-300" : "text-neutral-700";
  const editButtonBg =
    activeTheme === "dark"
      ? "bg-neutral-800 hover:bg-neutral-700"
      : "bg-neutral-200 hover:bg-neutral-300";
  const editIconColor = activeTheme === "dark" ? "white" : "black";

  return (
    <div className="flex flex-col gap-2 overflow-auto">
      {owner === "YOU" && isEditing ? (
        <div className="flex flex-col gap-2 w-full">
          <TextArea
            type="text"
            name="postText"
            minLength={50}
            placeholder="Post Text"
            value={textState}
            set={setTextState}
            required={true}
          />

          {error && (
            <span className="text-red-400 text-sm font-semibold">{error}</span>
          )}

          <div className="flex flex-wrap gap-2 mt-2">
            <OnSaveButton onClick={handleSave} text={"Save"} />
            <OnCancelButton onClick={handleCancel} text={"Cancel"} />
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p
            className={` mb-2 text-base md:text-lg font-medium leading-relaxed ${textColor}`}
          >
            {textState}
          </p>

          {owner === "YOU" && (
            <div
              className={`flex cursor-pointer rounded-full min-w-8 min-h-8 items-center justify-center shadow-md transition-colors duration-200 ${editButtonBg}`}
              onClick={() => setIsEditing(true)}
            >
              <Pencil size={18} color={editIconColor} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}