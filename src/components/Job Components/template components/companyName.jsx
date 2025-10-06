import { useState } from "react"
import { Pencil } from "lucide-react";
import { Input } from "../../Inputs/input.jsx";
import { CoolButton } from "../../Buttons/button.jsx";
import { uploadCompanyName } from "./utils/uploadCompanyName.js";

export function CompanyName({ companyName, owner, jobId }) {

    const [isEditing, setIsEditing] = useState(false);
    const [company, setCompany] = useState(companyName);
    const [error, setError] = useState("");

    const handleSave = async () => {
      if (!company.trim()) {
        setError("Company name cannot be empty");
        return;
      }

      try {
        let res = await uploadCompanyName(company, jobId);
          
        if(res.status == 200) {
            setError("");
            setCompany(res.company);
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
        setCompany(companyName);
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
                        name={"companyName"}
                        minLength={1}
                        placeholder={"Company Name"}
                        value={company}
                        set={setCompany}
                        autoComplete={"companyName"}
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
                
                    <div className="text-lg font-semibold text-gray-800">Company : {company}</div>

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