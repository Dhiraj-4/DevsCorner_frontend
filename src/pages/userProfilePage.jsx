import { Link } from "react-router-dom";
import { Bio } from "../components/bio/bio.jsx";
import { FollowersAndFollowing } from "../components/followersAndFollowing.jsx";
import { FullName } from "../components/fullName/fullName.jsx";
import { Location } from "../components/location/location.jsx";
import { uploadLocation } from "../components/location/uploadLocation.js";
import { ProfileImage } from "../components/profile image/profileImage.jsx";
import { Resume } from "../components/resume/resume.jsx";
import { Skills } from "../components/skills/skills.jsx";
import { SocialLinks } from "../components/social links/socialLinks.jsx";
import { useAuthStore } from "../store/authStore.js";
import { useUserStore } from "../store/userStore.js";
import { Mail } from "lucide-react";
import { CoolButton } from "../components/Buttons/button.jsx";
import { logoutHelper } from "../utils/logoutHelper.js";
import { useTheme } from "../theme-provider.jsx";
import { IsLoadingSvg } from "../components/loaders/isLoadingSvg.jsx";

export default function ProfilePage() {
  const { isLoading } = useAuthStore();
  const { user } = useUserStore();
  const { activeTheme } = useTheme();

  const isDark = activeTheme === "dark";
  const pageBg = isDark ? "bg-zinc-950 text-zinc-100" : "bg-zinc-50 text-zinc-900";

  if (isLoading) {
    return (
      <div className={` ${pageBg} min-h-screen flex items-center justify-center`}>
        <IsLoadingSvg />
      </div>
    );
  }


  return (
    <div
      className={`
        flex justify-center items-start min-h-screen pt-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300
        ${activeTheme === "dark" ? "bg-zinc-950 text-gray-100" : "bg-gray-50 text-gray-900"}
      `}
    >
      <div
        className={`
          w-full max-w-4xl rounded-2xl shadow-lg border transition-colors duration-300
          ${activeTheme === "dark" ? "bg-zinc-900/90 border-zinc-800" : "bg-white border-gray-200"}
        `}
      >
        {/* Inner Container */}
        <div className="p-6 sm:p-8 flex flex-col gap-8">
          {/* ──────── Top Section ──────── */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Image */}
            <ProfileImage />

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <FullName />
              <p
                className={`text-sm sm:text-base ${
                  activeTheme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                @{user.userName}
              </p>
              <p
                className={`text-xs sm:text-sm mt-1 ${
                  activeTheme === "dark" ? "text-gray-500" : "text-gray-500"
                }`}
              >
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </p>

              <FollowersAndFollowing />
            </div>
          </div>

          {/* ──────── Bio ──────── */}
          <Bio />

          {/* ──────── Contact & Links ──────── */}
          <div className="space-y-4">
            {/* Email */}
            <div
              className={`flex items-center gap-3 text-sm sm:text-base ${
                activeTheme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <Mail className="w-5 h-5 text-muted-foreground" />
              <span>{user.email}</span>
            </div>

            <Location onSave={uploadLocation} />
            <Resume />
          </div>

          {/* ──────── Skills ──────── */}
          <Skills />

          {/* ──────── Social Links ──────── */}
          <SocialLinks />

          {/* ──────── Logout Button ──────── */}
          <div className="flex justify-center sm:justify-start mt-6">
            <Link to="/login">
              <CoolButton text={"Logout"} clickHandler={logoutHelper} />
            </Link>
          </div>
        </div>

        {/* Footer Spacer */}
        <div className="h-8 sm:h-10"></div>
      </div>
    </div>
  );
}