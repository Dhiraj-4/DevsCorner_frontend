import { Location } from "../components/location/location.jsx";
import { uploadLocation } from "../components/location/uploadLocation.js";
import { ProfileImage } from "../components/profile image/profileImage.jsx";
import { Resume } from "../components/resume/resume.jsx";
import { Skills } from "../components/skills/skills.jsx";
import { SocialLinks } from "../components/social links/socialLinks.jsx";
import { useAuthStore } from "../store/authStore.js";
import { useUserStore } from "../store/userStore.js";
import { Mail, Globe, MapPin, FileText } from "lucide-react";

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
            <h1 className="text-3xl font-bold text-white">{user.fullName}</h1>
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
          {user.bio ? (
            <p className="text-gray-200 text-lg leading-relaxed text-center md:text-left">
              {user.bio}
            </p>
          ) : (
            <p className="italic text-gray-500 text-center md:text-left">
              Add a bio to tell people about yourself
            </p>
          )}
        </div>

        {/* Contact + Links */}
        <div className="mt-8 space-y-3">
          {/* Email */}
          <div className="flex items-center gap-3 text-gray-300">
            <Mail className="w-5 h-5 text-gray-400" />
            <span>{user.email}</span>
          </div>

          {/* Location */}
          {/* <div className="flex items-center gap-3 text-gray-300">
            <MapPin className="w-5 h-5 text-gray-400" />
            {user.location ? (
              <a
                href={user.location}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 transition"
              >
                {user.location}
              </a>
            ) : (
              <span className="italic text-gray-500">Add location</span>
            )}
          </div> */}
          <Location onSave={uploadLocation}/>

          {/* Resume */}
          <Resume />
        </div>

        {/* Skills */}
        {/* <div className="mt-10">
          <h2 className="text-xl font-semibold text-white mb-3">Skills</h2>
          {user.skills?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 rounded-full text-sm shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="italic text-gray-500">Add your skills</p>
          )}
        </div> */}
        <Skills/>

        {/* Social Links */}
        <SocialLinks />


        {/* Footer Spacer */}
        <div className="h-10"></div>
      </div>
    </div>
  );
}