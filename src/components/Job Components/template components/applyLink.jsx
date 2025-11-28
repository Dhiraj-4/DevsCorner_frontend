import { useState } from "react"
import { Pencil } from "lucide-react";
import { CoolButton } from "../../Buttons/button.jsx";
import { Input } from "../../Inputs/input.jsx";
import { uploadApplyLink } from "./utils/uploadApplyLink.js";
import { OnSaveButton } from "../../../components/Buttons/onSaveButton.jsx";
import { OnCancelButton } from "../../../components/Buttons/onCancelButton.jsx";

export function ApplyLink({ applyLink, owner, jobId }) {

    const [isEditing, setIsEditing] = useState(false);
    const [applyLinkState, setApplyLinkState] = useState(applyLink);
    const [error, setError] = useState("");

    const handleSave = async () => {
      if (!applyLinkState.trim()) {
        setError("Apply Link cannot be empty");
        return;
      }

      try {
        let res = await uploadApplyLink(applyLinkState, jobId);
          
        if(res.status == 200) {
            setError("");
            setApplyLinkState(res.applyLinkState);
            setIsEditing(false);
        }else if(res.status == 400) {
            setError(res.message);
        }else {
            setError("Something went wrong");
        }
        
      } catch (err) {
        setError("Failed to update apply link. Try again.");
      }
    };

    const handleCancel = () => {
        setApplyLinkState(applyLink);
        setIsEditing(false);
        setError("");
    };
    return (
        <div className="flex items-center gap-2">
            {
                (owner == "YOU" && isEditing) ?
                
                <div>
                    <Input 
                        type={"text"}
                        name={"applyLink"}
                        minLength={0}
                        placeholder={"Apply Link"}
                        value={applyLinkState}
                        set={setApplyLinkState}
                        required={true}
                    />
                    {error && <span className="text-red-400 text-base font-bold">{error}</span>}

                    <div className="flex flex-wrap gap-2">
                        <OnSaveButton text={"Save"} onClick={handleSave}/>
                        <OnCancelButton text={"Cancel"} onClick={handleCancel}/>
                    </div>
                </div>
                
                :
                
                <>
                {applyLinkState  ?
                
                    <div className="flex items-center gap-2">
                      <a
                        href={applyLinkState}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg shadow hover:bg-green-700 transition"
                        >
                        Apply Now
                      </a>
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

                    :
                    <>
                    {
                        (owner == "YOU") &&

                        <CoolButton text={"Add Apply Link"} clickHandler={()=> setIsEditing(true)}/>
                    }
                    </>

                }
                </>
            }
        </div>
    )
}