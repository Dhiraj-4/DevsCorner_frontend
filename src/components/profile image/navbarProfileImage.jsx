import { User } from "lucide-react";

export function NavbarProfileImage({ profileImage }) {

    return (
        <div className="w-16 h-16 relative rounded-full bg-zinc-800 overflow-hidden flex items-center justify-center shadow-md">

            {profileImage ? (
                <img
                    src={profileImage}
                    alt="profile"
                    className="w-full h-full object-cover rounded-full"
                />
            ) : (
                <User className="w-16 h-16 text-gray-500" />
            )}
        </div>
    )
}