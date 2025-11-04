import { FileText, Trash2  } from "lucide-react";
import { useUserStore } from "../../store/userStore.js"
import { uploadResume } from "./uploadResume.js";
import { deleteResume } from "./deleteResume.js";
import { useState } from "react";

export function Resume() {

    const {
        user
    } = useUserStore();
    const [resume, setResume] = useState(user.resume || null);

    async function handleUpload(file) {
        try {
            const response = await uploadResume(file);
            if(response.res === 200) {
                setResume(response.fileUrl);
            }
        } catch (error) {
            console.error("Error uploading resume:", error);
        }
    }

    async function handleDelete() {
        try {
            const response = await deleteResume();
            if(response.res === 200) {
                setResume(null);
            }
        } catch (error) {
            console.error("Error deleting resume:", error);
        }
    }

    return (
        <>
            {/* Resume */}
          <div className="flex items-center gap-3 text-gray-300">
            <FileText className="w-5 h-5 text-gray-400" />
            {resume ? (
              <div className="flex gap-2 text-xl justify-center items-center">
                <a
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 transition"
              >
                View Resume
              </a>{" "}

              <Trash2 
                className="w-5 h-5 text-gray-400 hover:text-red-400 cursor-pointer" 
                onClick={handleDelete}
              />
              </div>
            ) : (
              <span className="italic text-gray-500 text-xl">
                <button
                type="button"
                onClick={ () => document.getElementById("resumeUploader").click() }
                className="hover:text-blue-500 underline"
                >Upload</button>{" "} your resume
                </span>
            )}
          </div>

          <input 
          id="resumeUploader"
          type="file" 
          accept="application/pdf" 
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file);
            e.target.value = "";
          }}
          />

        
        </>
    )
}