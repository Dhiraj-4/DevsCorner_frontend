import { useState } from "react"
import { Pencil } from "lucide-react";
import { uploadRole } from "./utils/uploadRole.js";
import { Input } from "../../Inputs/input.jsx";
import { CoolButton } from "../../Buttons/button.jsx";

export function Role({ role, owner, jobId }) {

    const [isEditing, setIsEditing] = useState(false);
    const [roleState, setRoleState] = useState(role);
    const [error, setError] = useState("");

    const handleSave = async () => {
      if (!roleState.trim()) {
        setError("Role cannot be empty");
        return;
      }

      try {
        let res = await uploadRole(roleState, jobId);
          
        if(res.status == 200) {
            setError("");
            setRoleState(res.roleState);
            setIsEditing(false);
        }else if(res.status == 400) {
            setError(res.message);
        }else {
            setError("Something went wrong");
        }
        
      } catch (err) {
        setError("Failed to update full name. Try again.");
      }
    };

    const handleCancel = () => {
        setRoleState(role);
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
                        name={"role"}
                        minLength={3}
                        placeholder={"Role"}
                        value={roleState}
                        set={setRoleState}
                        autoComplete={"role"}
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
                
                    <div className="text-xl font-bold text-gray-900">Role: {roleState}</div>

                    <div
                        className=" flex cursor-pointer rounded-full w-[30px] h-[30px] bg-black/60 hover:bg-black/80 items-center justify-center shadow-md"
                        onClick={() => { setIsEditing(true) }}
                    >
                        <Pencil size={20} color="white" />
                    </div>
                </div>
            }
        </div>
    )
}