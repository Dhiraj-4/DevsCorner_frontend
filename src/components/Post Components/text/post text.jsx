import { useState } from "react"
import { Pencil } from "lucide-react";
import { uploadText } from "./uploadPostText.js";
import { TextArea } from "../../Inputs/textArea.jsx";
import { CoolButton } from "../../Buttons/button.jsx";

export function PostText({ text, owner, postId }) {

    const [isEditing, setIsEditing] = useState(false);
    const [textState, setTextState] = useState(text);
    const [error, setError] = useState("");

    const handleSave = async () => {
      if (!textState.trim()) {
        setError("post text cannot be empty");
        return;
      }

      try {
        let res = await uploadText(textState, postId);
          
        if(res.status == 200) {
            setError("");
            setTextState(res.text);
            setIsEditing(false);
        }else if(res.status == 400) {
            setError(res.message);
        }else {
            setError("Something went wrong");
        }
        
      } catch (err) {
        setError("Failed to update post text. Try again.");
      }
    };

    const handleCancel = () => {
        setTextState(textState);
        setIsEditing(false);
        setError("");
    };
    return (
        <div className="flex flex-wrap items-center gap-2">
            {
                (owner == "YOU" && isEditing) ?
                
                <div>
                    <TextArea 
                        type={"text"}
                        name={"postText"}
                        minLength={50}
                        placeholder={"Post Text"}
                        value={textState}
                        set={setTextState}
                        required={true}
                    />
                    {error && <span className="text-red-400 text-base font-bold">{error}</span>}

                    <div className="flex flex-wrap gap-2">
                        <CoolButton text={"Save"} clickHandler={handleSave}/>
                        <CoolButton text={"Cancel"} clickHandler={handleCancel}/>
                    </div>
                </div>
                
                :
                
                <div className="flex flex-wrap items-center gap-3">
                
                    <div className="mb-4 text-lg text-gray-600 font-semibold">{textState}</div>

                    {
                        (owner == "YOU") &&

                        <div
                        className=" flex cursor-pointer rounded-full min-w-[30px] min-h-[30px] bg-black/60 hover:bg-black/80 items-center justify-center shadow-md"
                        onClick={() => { setIsEditing(true) }}
                        >
                            <Pencil size={20} color="white" />
                        </div>
                    }
                </div>
            }
        </div>
    )
}