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
import { Mail, Globe, MapPin, FileText } from "lucide-react";
import { CoolButton } from "../components/Buttons/button.jsx";
import { logoutHelper } from "../utils/logoutHelper.js";

export default function ProfilePage() {
  const { accessToken } = useAuthStore();
  const { user } = useUserStore();

  if (!accessToken) return null;

  return (
    <div className="flex justify-center items-center h-screen pt-20 bg-black">
      <div className="max-w-4xl w-full m-auto p-8 rounded-2xl bg-zinc-900 shadow-xl">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Profile Image */}
          <ProfileImage />

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">

            <FullName/>
            <p className="text-gray-400">@{user.userName}</p>
            <p className="text-sm text-gray-500 mt-1">
              Joined {new Date(user.createdAt).toLocaleDateString()}
            </p>

            {/* Followers / Following */}
            <FollowersAndFollowing/>

          </div>
        </div>

        {/* Bio */}
        <Bio />

        {/* Contact + Links */}
        <div className="mt-8 space-y-3">

          {/* Email */}
          <div className="flex items-center gap-3 text-gray-300">
            <Mail className="w-5 h-5 text-gray-400" />
            <span>{user.email}</span>
          </div>

          {/* Location */}
          <Location onSave={uploadLocation}/>

          {/* Resume */}
          <Resume />
        </div>

        {/* Skills */}
        <Skills/>

        {/* Social Links */}
        <SocialLinks />


        {/* logout button */}
        <div className="flex mt-5">
        <Link to='/login'>
            <CoolButton text={"Logout"} clickHandler={logoutHelper}/>
        </Link>
        </div>

        {/* Footer Spacer */}
        <div className="h-10"></div>
      </div>
    </div>
  );
}