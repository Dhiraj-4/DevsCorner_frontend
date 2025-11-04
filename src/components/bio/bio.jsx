// import { useState } from "react";
// import { useUserStore } from "../../store/userStore";
// import { uploadBio } from "./uploadBio";
// import { Pencil } from "lucide-react";

// export function Bio() {
//   const { user } = useUserStore();
//   const [isInput, setIsInput] = useState(false);
//   const [bio, setBio] = useState(user.bio || "");
//   const [error, setError] = useState("");

//   const handleSave = async() => {
//     if (!bio.trim()) {
//       setError("Bio cannot be empty.");
//       return;
//     }

//     let res = await uploadBio(bio.trim());

//     if(res.status == 500) {
//         setError("something went wrong");
//     }else if(res.status == 200) {
//         setError
//         setIsInput(false);
//     }else if(res.status == 400) {
//         setError(res.message);
//     }else {
//       setError( res.message || "Failed to updated bio");
//     }
//   };

//   return (
//     <div className="mt-6">
//       {isInput ? (
//         <div className="flex flex-col gap-3">
//           <textarea
//             value={bio}
//             onChange={(e) => {
//               setBio(e.target.value);
//               if (error) setError("");
//             }}
//             rows={4}
//             className="w-full px-3 py-2 rounded-lg bg-gray-800 text-gray-200 border border-gray-600 focus:border-indigo-400 focus:ring focus:ring-indigo-400/50 outline-none resize-none"
//             placeholder="Write something about yourself..."
//           />
//           {error && <span className="text-red-400 text-base font-bold">{error}</span>}
//           <div className="flex gap-2 justify-end">
//             <button
//               onClick={handleSave}
//               className="px-3 py-1 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white transition"
//             >
//               Save
//             </button>
//             <button
//               onClick={() => {
//                 setIsInput(false);
//                 setError("");
//               }}
//               className="px-3 py-1 rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       ) : user.bio ? (
//         <div
//           className="flex flex-wrap gap-5"
//         >
//         <p className="text-gray-200 text-lg leading-relaxed text-center md:text-left">
//           {user.bio}
//         </p>
        
//         <div
//           className=" flex cursor-pointer rounded-full w-[35px] h-[35px] bg-black/60 hover:bg-black/80 items-center justify-center shadow-md"
//           onClick={() => { setIsInput(true) }}
//         >
//           <Pencil size={20} color="white" />
//         </div>
//         </div>

//       ) : (
//         <p className="italic text-gray-500 text-center md:text-left text-xl">
//           <button
//             className="hover:text-blue-400 underline"
//             onClick={() => setIsInput(true)}
//           >
//             Add
//           </button>{" "}
//           a bio to tell people about yourself
//         </p>
//       )}
//     </div>
//   );
// }


import { useState } from "react";
import { useUserStore } from "../../store/userStore";
import { uploadBio } from "./uploadBio";
import { Pencil } from "lucide-react";

export function Bio() {
  const { user } = useUserStore();
  const [isInput, setIsInput] = useState(false);
  const [bio, setBio] = useState(user.bio || "");
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!bio.trim()) {
      setError("Bio cannot be empty.");
      return;
    }

    let res = await uploadBio(bio.trim());

    if (res.status === 500) {
      setError("Something went wrong");
    } else if (res.status === 200) {
      setError("");
      setIsInput(false);
    } else if (res.status === 400) {
      setError(res.message);
    } else {
      setError(res.message || "Failed to update bio");
    }
  };

  return (
    <div className="mt-6 w-full">
      {isInput ? (
        <div className="flex flex-col gap-3">
          <textarea
            value={bio}
            onChange={(e) => {
              setBio(e.target.value);
              if (error) setError("");
            }}
            rows={4}
            placeholder="Write something about yourself..."
            className="w-full rounded-xl px-4 py-2 text-sm md:text-base bg-background text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-ring/50 resize-none shadow-sm"
          />
          {error && (
            <span className="text-destructive text-sm font-medium">{error}</span>
          )}
          <div className="flex gap-2 justify-end">
            <button
              onClick={handleSave}
              className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsInput(false);
                setError("");
              }}
              className="px-4 py-1.5 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : user.bio ? (
        <div className="flex flex-wrap gap-4 items-start">
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-[600px] break-words">
            {user.bio}
          </p>
          <div
            className="flex cursor-pointer rounded-full w-9 h-9 bg-muted hover:bg-muted/70 items-center justify-center shadow-sm transition"
            onClick={() => setIsInput(true)}
          >
            <Pencil size={18} className="text-foreground" />
          </div>
        </div>
      ) : (
        <p className="italic text-muted-foreground text-center md:text-left text-lg">
          <button
            className="hover:text-primary underline underline-offset-2"
            onClick={() => setIsInput(true)}
          >
            Add
          </button>{" "}
          a bio to tell people about yourself
        </p>
      )}
    </div>
  );
}