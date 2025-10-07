import { useState } from "react"
import { Pencil } from "lucide-react";
import { CoolButton } from "../../Buttons/button.jsx";
import { TextArea } from "../../Inputs/textArea.jsx";
import { uploadText } from "./utils/uploadText.js";

export function Description({ text, owner, jobId }) {

    const [isEditing, setIsEditing] = useState(false);
    const [textState, setTextState] = useState(text);
    const [error, setError] = useState("");

    const handleSave = async () => {
      if (!textState.trim()) {
        setError("Description cannot be empty");
        return;
      }

      try {
        let res = await uploadText(textState, jobId);
          
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
        setError("Failed to update description. Try again.");
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
                        name={"description"}
                        minLength={50}
                        placeholder={"Description"}
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
                
                <div className="flex items-center gap-2">
                
                    <div className="mb-4 text-lg overflow-auto text-gray-600 font-semibold">Description: {textState}</div>

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