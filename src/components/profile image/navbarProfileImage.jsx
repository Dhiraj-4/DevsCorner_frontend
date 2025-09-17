import { User } from "lucide-react";
import { useUserStore } from "../../store/userStore"

export function NavbarProfileImage() {

    const { user } = useUserStore();
    return (
        <div className="w-16 h-16 relative rounded-full bg-zinc-800 overflow-hidden flex items-center justify-center shadow-md">

            {user?.profileImage ? (
                <img
                    src={user.profileImage}
                    alt="profile"
                    className="w-full h-full object-cover rounded-full"
                />
            ) : (
                <User className="w-16 h-16 text-gray-500" />
            )}
        </div>
    )
}