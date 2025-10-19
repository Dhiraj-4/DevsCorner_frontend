import { useState } from "react"
import { Pencil } from "lucide-react";
import { Input } from "../../Inputs/input.jsx";
import { CoolButton } from "../../Buttons/button.jsx";
import { uploadExperience } from "./utils/uploadExperience.js";

export function Experience({ experience, owner, jobId }) {

    const [isEditing, setIsEditing] = useState(false);
    const [experienceState, setExperienceState] = useState(experience);
    const [error, setError] = useState("");

    const handleSave = async () => {
      if (!experienceState.trim()) {
        setError("experience cannot be empty");
        return;
      }

      try {
        let res = await uploadExperience(experienceState, jobId);
          
        if(res.status == 200) {
            setError("");
            setExperienceState(res.experienceState);
            setIsEditing(false);
        }else if(res.status == 400) {
            setError(res.message);
        }else {
            setError("Something went wrong");
        }
        
      } catch (err) {
        setError("Failed to update experience. Try again.");
      }
    };

    const handleCancel = () => {
        setExperienceState(experience);
        setIsEditing(false);
        setError("");
    };
    return (
        <div className="flex gap-2">
            {
                (owner == "YOU" && isEditing) ?
                
                <div>
                    <Input 
                        type={"number"}
                        name={"experience"}
                        minLength={1}
                        placeholder={"Experience"}
                        value={experienceState}
                        set={setExperienceState}
                        autoComplete={"experience"}
                        required={false}
                    />
                    {error && <span className="text-red-400 text-base font-bold">{error}</span>}

                    <div className="flex gap-2">
                        <CoolButton text={"Save"} clickHandler={handleSave}/>
                        <CoolButton text={"Cancel"} clickHandler={handleCancel}/>
                    </div>
                </div>
                
                :
                
                <div className="flex flex-wrap items-center gap-3">
                
                    <div className="text-lg font-semibold text-gray-800">experience : {experienceState} year</div>

                    {
                        (owner == "YOU") &&

                        <div
                        className=" flex cursor-pointer rounded-full w-[30px] h-[30px] bg-black/60 hover:bg-black/80 items-center justify-center shadow-md"
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