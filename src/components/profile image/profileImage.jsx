import { Pencil, User } from "lucide-react";
import { useUserStore } from "../../store/userStore"
import { uploadProfileImage } from "./uploadProfileImage";

export function ProfileImage() {
    const { user } = useUserStore();
    return (
        <>
        {/* Profile Image */}
          <div className="w-32 h-32 relative md:w-40 md:h-40 rounded-full bg-zinc-800 overflow-hidden flex items-center justify-center shadow-md">
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt="profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <User className="w-16 h-16 text-gray-500" />
            )}

            <div 
            className="absolute flex bottom-[10%] right-[10%] cursor-pointer rounded-full w-[35px] h-[35px] bg-black/60 hover:bg-black/80 items-center justify-center"

            onClick={() => {document.getElementById("profileFileInput")?.click();}}
            >
              <Pencil size={20} color="white" />
            </div>
          </div>

          <input
            id="profileFileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) uploadProfileImage(file);
              e.target.value = "";
            }}
            />
        </>
    )
}