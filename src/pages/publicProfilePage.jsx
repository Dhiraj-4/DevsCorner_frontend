import { Link } from "react-router-dom";
import { Bio } from "../components/bio/bio.jsx";
import { FollowersAndFollowing } from "../components/followersAndFollowing.jsx";
import { FullName } from "../components/fullName/fullName.jsx";
import { Location } from "../components/location/location.jsx";
import { uploadLocation } from "../components/location/uploadLocation.js";
import { Resume } from "../components/resume/resume.jsx";
import { Skills } from "../components/skills/skills.jsx";
import { SocialLinks } from "../components/social links/socialLinks.jsx";
import { Mail, MapPin, User } from "lucide-react";
import { CoolButton } from "../components/Buttons/button.jsx";
import { logoutHelper } from "../utils/logoutHelper.js";

export default function PublicProfilePage({ user }) {

  return (
    <div className="flex justify-center items-center h-screen pt-20 bg-black">
      <div className="max-w-4xl w-full m-auto p-8 rounded-2xl bg-zinc-900 shadow-xl">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

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
        </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">

            {/* <FullName/> */}
          <div className="flex flex-wrap items-center gap-3">

        <div className="flex flex-wrap justify-center items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-semibold text-white">
              {user.fullName}
            </h1>
            </div>
          </div>

            <p className="text-gray-400">@{user.userName}</p>
            <p className="text-sm text-gray-500 mt-1">
              Joined {new Date(user.createdAt).toLocaleDateString()}
            </p>

            {/* Followers / Following */}

            <div className="flex justify-center md:justify-start gap-6 mt-3">
              <div className="text-center">
                <p className="text-lg font-semibold text-white">
                  {user.countFollowers ?? 0}
                </p>
                <p className="text-sm text-gray-400">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-white">
                  {user.countFollowing ?? 0}
                </p>
                <p className="text-sm text-gray-400">Following</p>
              </div>
            </div>

          </div>
        </div>

        {/* Bio */}
        <div className="mt-6">
          {user.bio ? 
          <div
          className="flex flex-wrap gap-5"
          >
            <p className="text-gray-200 text-lg leading-relaxed text-center md:text-left">
              {user.bio}
            </p>
          </div> : 

          <div
          className="flex flex-wrap gap-5"
          >
            <p className="text-gray-200 text-lg leading-relaxed text-center md:text-left">
              No bio
            </p>
          </div>
          }
        </div>

        {/* Contact + Links */}
        <div className="mt-8 space-y-3">

          {/* Email */}
          <div className="flex items-center gap-3 text-gray-300">
            <Mail className="w-5 h-5 text-gray-400" />
            <span>{user.email}</span>
          </div>

          {/* Location */}

      <div className="flex items-center gap-3 text-gray-300">
      <MapPin className="w-5 h-5 text-gray-400" />

      {user.location ? (
        <div className="flex items-center gap-2 bg-black rounded-2xl px-3 py-1">
          <span className="text-gray-400">{user.location}</span>
        </div>
      ) : (
        <span className="italic text-gray-500">
          no location
        </span>
      )}
      </div>


      </div>

        {/* Skills */}
        {/* <Skills/> */}

        {/* Social Links */}
        {/* <SocialLinks /> */}

      </div>
    </div>
  );
}