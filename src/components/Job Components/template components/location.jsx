import { useState } from "react"
import { Pencil } from "lucide-react";
import { Input } from "../../Inputs/input.jsx";
import { CoolButton } from "../../Buttons/button.jsx";
import { uploadLocation } from "./utils/uploadLocation.js";

export function Location({ location, owner, jobId }) {

    const [isEditing, setIsEditing] = useState(false);
    const [locationState, setLocationState] = useState(location);
    const [error, setError] = useState("");

    const handleSave = async () => {
      if (!locationState.trim()) {
        setError("location cannot be empty");
        return;
      }

      try {
        let res = await uploadLocation(locationState, jobId);
          
        if(res.status == 200) {
            setError("");
            setLocationState(res.locationState);
            setIsEditing(false);
        }else if(res.status == 400) {
            setError(res.message);
        }else {
            setError("Something went wrong");
        }
        
      } catch (err) {
        setError("Failed to update location. Try again.");
      }
    };

    const handleCancel = () => {
        setLocationState(location);
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
                        name={"location"}
                        minLength={1}
                        placeholder={"City, State, Country"}
                        value={locationState}
                        set={setLocationState}
                        autoComplete={"location"}
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
                
                    <div className="text-lg font-semibold text-gray-800">Location : {locationState}</div>

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