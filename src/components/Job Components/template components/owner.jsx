import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toggleFollow } from "../../../utils/toggleFollow.js";
import { CoolButton } from "../../Buttons/button.jsx";
import { NavbarProfileImage } from "../../profile image/navbarProfileImage.jsx";
import { useTheme } from "../../../theme-provider.jsx";
import { useUserStore } from "../../../store/userStore.js";
import { OnSaveButton } from "../../../components/Buttons/onSaveButton.jsx";

export function Owner({ owner, isFollowing }) {
  const [isFollowingState, setIsFollowingState] = useState(isFollowing);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();

  const { activeTheme } = useTheme();
  const isDark = activeTheme === "dark";

  const textPrimary = isDark ? "text-zinc-100" : "text-zinc-900";
  const textSecondary = isDark ? "text-zinc-400" : "text-zinc-600";
  const errorColor = isDark ? "text-red-400" : "text-red-600";

  async function toggleHelper() {
    const res = await toggleFollow(owner.userName);

    if (res.status === 400 || res.status === 500) {
      setError(res.message);
    } else if (res.status === 200) {
      setError("");
      setIsFollowingState(res.isFollowing);
      if(res.isFollowing) {
        user.following.push(owner._id);
        user.countFollowing = user.countFollowing + 1;
      } else {
        user.following = user.following.filter(
          (id) => id !== owner._id
        );
        user.countFollowing = user.countFollowing - 1;
      }
      setUser({...user});
    }
  }

  return (
    <div
      className="flex flex-wrap justify-between items-center gap-2 transition-colors duration-300"
      key={owner._id}
    >
      {/* Profile image + name */}
      <div
        className="flex flex-wrap items-center gap-2 cursor-pointer"
        onClick={() => navigate(`/user/${owner.userName}`)}
      >
        <NavbarProfileImage profileImage={owner?.profileImage} />

        <div className="flex flex-col leading-tight">
          <span className={`font-bold ${textPrimary}`}>
            {owner.fullName}
          </span>
          <span className={`text-sm ${textSecondary}`}>
            @{owner.userName}
          </span>
        </div>
      </div>

      {/* Follow toggle */}
      <div className="flex flex-col items-end">
        <OnSaveButton text={isFollowingState ? "Unfollow" : "Follow"} onClick={toggleHelper} />

        {error && <span className={`text-sm font-semibold ${errorColor}`}>{error}</span>}
      </div>
    </div>
  );
}