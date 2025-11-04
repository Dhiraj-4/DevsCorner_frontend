import { User } from "lucide-react";
import { useTheme } from "../../theme-provider.jsx";

export function NavbarProfileImage({ profileImage }) {
  const { activeTheme } = useTheme();
  const isDark = activeTheme === "dark";

  const borderColor = isDark ? "border-zinc-700" : "border-zinc-300";
  const bgColor = isDark ? "bg-zinc-800" : "bg-zinc-100";
  const iconColor = isDark ? "text-zinc-500" : "text-zinc-600";

  return (
    <div
      className={`w-14 h-14 sm:w-16 sm:h-16 border-4 ${borderColor} relative rounded-full ${bgColor} overflow-hidden flex items-center justify-center shadow-md transition-colors duration-300`}
      data-theme={activeTheme}
    >
      {profileImage ? (
        <img
          src={profileImage}
          alt="Profile"
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <User className={`w-8 h-8 sm:w-10 sm:h-10 ${iconColor}`} />
      )}
    </div>
  );
}