import { useState } from "react"
import { Pencil } from "lucide-react";
import { Input } from "../../Inputs/input.jsx";
import { CoolButton } from "../../Buttons/button.jsx";
import { uploadSalary } from "./utils/uploadSalary.js";

export function Salary({ salary, owner, jobId }) {

    const [isEditing, setIsEditing] = useState(false);
    const [salaryState, setSalaryState] = useState(salary);
    const [error, setError] = useState("");

    const handleSave = async () => {
      if (!salaryState.trim()) {
        setError("salary cannot be empty");
        return;
      }

      try {
        let res = await uploadSalary(salaryState, jobId);
          
        if(res.status == 200) {
            setError("");
            setSalaryState(res.salaryState);
            setIsEditing(false);
        }else if(res.status == 400) {
            setError(res.message);
        }else {
            setError("Something went wrong");
        }
        
      } catch (err) {
        setError("Failed to update salary. Try again.");
      }
    };

    const handleCancel = () => {
        setSalaryState(salary);
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
                        name={"salary"}
                        minLength={1}
                        placeholder={"Salary"}
                        value={salaryState}
                        set={setSalaryState}
                        autoComplete={"salary"}
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
                
                    <div className="text-lg font-semibold text-gray-800">salary : {salaryState}</div>

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