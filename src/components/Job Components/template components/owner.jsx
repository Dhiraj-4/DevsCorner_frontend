import { useRef, useState } from "react";
import { toggleFollow } from "../../../utils/toggleFollow.js";
import { CoolButton } from "../../Buttons/button.jsx";
import { NavbarProfileImage } from "../../profile image/navbarProfileImage.jsx";

export function Owner({ owner, isFollowing }) {

    const [isFollowingState, setIsFollowingState] = useState(isFollowing);
    const [error, setError] = useState("");

    async function toggleHelper() {
        let res = await toggleFollow(owner.userName);

        if(res.status == 400) {
            setError(res.message);
        }else if(res.status == 500) {
            setError(res.message);
        }else if(res.status == 200) {
            setError("");
            setIsFollowingState(res.isFollowing);
        }
    }
    return (
        <div 
        className="flex flex-wrap justify-between items-center gap-2"
        key={owner._id}
        >
            {/* Profile image, full name and @username */}
            <div className="flex flex-wrap items-center gap-2">
                <NavbarProfileImage profileImage={owner?.profileImage}/>

            <div className="flex flex-col">
                <span className="font-bold">
                    {owner.fullName}
                </span>
                <span>
                    @{owner.userName}
                </span>
            </div>
            </div>

            {/* Toggle follow button */}
            <div>
                <CoolButton text={ isFollowingState ? "unfollow" : "follow"} clickHandler={() => toggleHelper()}/>
                <span className="text-red-500 font-semibold">{error}</span>
            </div>
        </div>
    )
}