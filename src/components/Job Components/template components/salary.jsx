// import { useState } from "react"
// import { Pencil } from "lucide-react";
// import { Input } from "../../Inputs/input.jsx";
// import { uploadSalary } from "./utils/uploadSalary.js";
// import { OnSaveButton } from "../../../components/Buttons/onSaveButton.jsx";
// import { OnCancelButton } from "../../../components/Buttons/onCancelButton.jsx";

// export function Salary({ salary, owner, jobId }) {

//     const [isEditing, setIsEditing] = useState(false);
//     const [jobSalary, setJobSalary] = useState(salary);
//     const [salaryState, setSalaryState] = useState(jobSalary);
//     const [error, setError] = useState("");

//     const handleSave = async () => {
//       if (!salaryState.trim()) {
//         setError("salary cannot be empty");
//         return;
//       }

//       try {
//         let res = await uploadSalary(salaryState, jobId);
          
//         if(res.status == 200) {
//             setError("");
//             setJobSalary(res.salaryState);
//             setIsEditing(false);
//         }else if(res.status == 400) {
//             setError(res.message);
//         }else {
//             setError("Something went wrong");
//         }
        
//       } catch (err) {
//         setError("Failed to update salary. Try again.");
//       }
//     };

//     const handleCancel = () => {
//         setSalaryState(jobSalary);
//         setIsEditing(false);
//         setError("");
//     };
//     return (
//         <div className="flex gap-2">
//             {
//                 (owner == "YOU" && isEditing) ?
                
//                 <div>
//                     <Input 
//                         type={"text"}
//                         name={"salary"}
//                         minLength={1}
//                         placeholder={"Salary"}
//                         value={salaryState}
//                         set={setSalaryState}
//                         autoComplete={"salary"}
//                         required={false}
//                     />
//                     {error && <span className="text-red-400 text-base font-bold">{error}</span>}

//                     <div className="flex gap-2">
//                         <OnSaveButton text={"Save"} onClick={handleSave} />
//                         <OnCancelButton text={"Cancel"} onClick={handleCancel} />
//                     </div>
//                 </div>
                
//                 :
                
//                 <div className="flex flex-wrap items-center gap-3">
                
//                     <div className="text-lg font-semibold text-gray-800">salary : {jobSalary}</div>

//                     {
//                         (owner == "YOU") &&

//                         <div
//                         className=" flex cursor-pointer rounded-full w-[30px] h-[30px] bg-black/60 hover:bg-black/80 items-center justify-center shadow-md"
//                         onClick={() => { setIsEditing(true) }}
//                         >
//                             <Pencil size={20} color="white" />
//                         </div>
//                     }
//                 </div>
//             }
//         </div>
//     )
// }


import { useState } from "react";
import { Pencil } from "lucide-react";
import { Input } from "../../Inputs/input.jsx";
import { uploadSalary } from "./utils/uploadSalary.js";
import { OnSaveButton } from "../../../components/Buttons/onSaveButton.jsx";
import { OnCancelButton } from "../../../components/Buttons/onCancelButton.jsx";

export function Salary({ salary, owner, jobId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [jobSalary, setJobSalary] = useState(salary);
  const [salaryState, setSalaryState] = useState(jobSalary);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!salaryState.trim()) {
      setError("salary cannot be empty");
      return;
    }

    try {
      let res = await uploadSalary(salaryState, jobId);

      if (res.status == 200) {
        setError("");
        setJobSalary(res.salaryState);
        setIsEditing(false);
      } else if (res.status == 400) {
        setError(res.message);
      } else {
        setError("Something went wrong");
      }
    } catch (err) {
      setError("Failed to update salary. Try again.");
    }
  };

  const handleCancel = () => {
    setSalaryState(jobSalary);
    setIsEditing(false);
    setError("");
  };

  return (
    <div className="flex flex-col gap-2">
      {owner === "YOU" && isEditing ? (
        <div className="flex flex-col gap-3">
          <Input
            type="text"
            name="salary"
            minLength={1}
            placeholder="Salary"
            value={salaryState}
            set={setSalaryState}
            autoComplete="salary"
            required={false}
          />
          {error && (
            <span className="text-red-500 text-sm font-medium">{error}</span>
          )}

          <div className="flex gap-2">
            <OnSaveButton text="Save" onClick={handleSave} />
            <OnCancelButton text="Cancel" onClick={handleCancel} />
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-3">
          <div className="text-base sm:text-lg font-medium text-neutral-700 dark:text-neutral-200">
            Salary: <span className="font-semibold">{jobSalary}</span>
          </div>

          {owner === "YOU" && (
            <div
              onClick={() => setIsEditing(true)}
              className="flex cursor-pointer w-[32px] h-[32px] rounded-full 
                         bg-neutral-200 dark:bg-neutral-700 
                         hover:bg-neutral-300 dark:hover:bg-neutral-600 
                         items-center justify-center transition-all duration-200 shadow-sm"
            >
              <Pencil size={18} className="text-gray-800 dark:text-gray-100" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}