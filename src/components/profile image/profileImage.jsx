import { Pencil, User, Trash2 } from "lucide-react";
import { useUserStore } from "../../store/userStore";
import { uploadProfileImage } from "./uploadProfileImage";
import { deleteProfileImage } from "./deleteProfileImage";
import { useTheme } from "../../theme-provider.jsx";

export function ProfileImage() {
  const { user } = useUserStore();
  const { activeTheme } = useTheme();

  const borderColor =
    activeTheme === "dark"
      ? "border-zinc-700"
      : activeTheme === "light"
      ? "border-zinc-300"
      : "border-border";

  const bgColor =
    activeTheme === "dark"
      ? "bg-zinc-800"
      : activeTheme === "light"
      ? "bg-zinc-200"
      : "bg-background";

  return (
    <>
      {/* Profile Image */}
      <div
        className={`relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden flex items-center justify-center shadow-lg border-5 ${borderColor} ${bgColor} transition-all duration-300`}
      >
        {user?.profileImage ? (
          <img
            src={user.profileImage}
            alt="profile"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <User
            className={`w-16 h-16 ${
              activeTheme === "dark"
                ? "text-zinc-500"
                : activeTheme === "light"
                ? "text-zinc-400"
                : "text-muted-foreground"
            }`}
          />
        )}

        {/* Edit Button */}
        <div
          className="absolute top-3 right-3 flex cursor-pointer rounded-full w-[34px] h-[34px] bg-black/60 hover:bg-black/80 items-center justify-center shadow-md transition-colors"
          onClick={() =>
            document.getElementById("profileFileInput")?.click()
          }
        >
          <Pencil size={18} className="text-white" />
        </div>

        {/* Delete Button */}
        {user?.profileImage && (
          <div
            className="absolute bottom-3 right-3 flex cursor-pointer rounded-full w-[34px] h-[34px] bg-red-600/70 hover:bg-red-600/90 items-center justify-center shadow-md transition-colors"
            onClick={deleteProfileImage}
          >
            <Trash2 size={18} className="text-white" />
          </div>
        )}
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
  );
}