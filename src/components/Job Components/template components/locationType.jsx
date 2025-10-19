import { useState } from "react"
import { Pencil } from "lucide-react";
import { Input } from "../../Inputs/input.jsx";
import { CoolButton } from "../../Buttons/button.jsx";
import { uploadLocationType } from "./utils/uploadLocationType.js";

export function LocationType({ locationType, owner, jobId }) {

    const [isEditing, setIsEditing] = useState(false);
    const [locationTypeState, setLocationTypeState] = useState(locationType);
    const [error, setError] = useState("");

    const handleSave = async () => {
      if (!locationTypeState.trim()) {
        setError("location type cannot be empty");
        return;
      }

      try {
        let res = await uploadLocationType(locationTypeState, jobId);
          
        if(res.status == 200) {
            setError("");
            setLocationTypeState(res.locationTypeState);
            setIsEditing(false);
        }else if(res.status == 400) {
            setError(res.message);
        }else {
            setError("Something went wrong");
        }
        
      } catch (err) {
        setError("Failed to update location type. Try again.");
      }
    };

    const handleCancel = () => {
        setLocationTypeState(locationType);
        setIsEditing(false);
        setError("");
    };
    return (
        <div className="flex gap-2">
            {
                (owner == "YOU" && isEditing) ?
                
                <div>
                    <Input 
                        type={"text"}
                        name={"location type"}
                        minLength={6}
                        placeholder={"fulltime / remote / hybrid"}
                        value={locationTypeState}
                        set={setLocationTypeState}
                        autoComplete={"location type"}
                        required={true}
                    />
                    {error && <span className="text-red-400 text-base font-bold">{error}</span>}

                    <div className="flex gap-2">
                        <CoolButton text={"Save"} clickHandler={handleSave}/>
                        <CoolButton text={"Cancel"} clickHandler={handleCancel}/>
                    </div>
                </div>
                
                :
                
                <div className="flex flex-wrap items-center gap-3">
                
                    <div className="text-lg font-semibold text-gray-800">Location type : {locationTypeState}</div>

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