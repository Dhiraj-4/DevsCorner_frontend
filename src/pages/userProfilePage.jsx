import { ProfileImage } from "../components/profile image/profileImage.jsx";
import { Resume } from "../components/resume/resume.jsx";
import { useAuthStore } from "../store/authStore.js";
import { useUserStore } from "../store/userStore.js";
import { Mail, Globe, MapPin, FileText } from "lucide-react";

export default function ProfilePage() {
  const { accessToken } = useAuthStore();
  const { user } = useUserStore();

  if (!accessToken) return null;

  return (
    <div className="flex justify-center items-center h-screen pt-16 bg-black">
      <div className="max-w-4xl w-full mx-auto p-8 rounded-2xl bg-zinc-900 shadow-xl">
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
          <div className="flex items-center gap-3 text-gray-300">
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
          </div>

          {/* Resume */}
          <Resume />
        </div>

        {/* Skills */}
        <div className="mt-10">
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
        </div>

        {/* Social Links */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-white mb-3">Social Links</h2>
        {user.socialLinks && 
         (user.socialLinks.github || user.socialLinks.linkedin || user.socialLinks.twitter) ? (
          <div className="flex flex-wrap gap-3">
            {user.socialLinks.github && (
              <a
                href={user.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 rounded-full text-sm shadow-sm hover:bg-indigo-500/20 transition"
              >
                <span className="text-indigo-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.1-1.2-1.4-1.2-1.4-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.8 1.6 3.5 2.2v-1.6c-2.6-.3-5.4-1.3-5.4-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.2 0 4.7-2.8 5.7-5.4 6v1.7c0 .4.2.7.8.6A10.9 10.9 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                  </svg>
                </span>
                GitHub
              </a>
            )}
            {user.socialLinks.linkedin && (
              <a
                href={user.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 rounded-full text-sm shadow-sm hover:bg-indigo-500/20 transition"
              >
                <span className="text-indigo-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.98 3.5c0 1.38-1.12 2.5-2.49 2.5S0 4.88 0 3.5 1.12 1 2.49 1 4.98 2.12 4.98 3.5zM.2 8.34h4.58V24H.2zM8.98 8.34h4.39v2.13h.06c.61-1.15 2.12-2.36 4.37-2.36 4.68 0 5.55 3.08 5.55 7.1V24h-4.58v-7.59c0-1.81-.03-4.14-2.52-4.14-2.52 0-2.9 1.97-2.9 4v7.73H8.98z" />
                  </svg>
                </span>
                LinkedIn
              </a>
            )}
            {user.socialLinks.twitter && (
              <a
                href={user.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 rounded-full text-sm shadow-sm hover:bg-indigo-500/20 transition"
              >
                <span className="text-indigo-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 2.999a9.42 9.42 0 0 1-2.829.797A4.93 4.93 0 0 0 22.337.365a9.86 9.86 0 0 1-3.127 1.195A4.92 4.92 0 0 0 16.5 0a4.92 4.92 0 0 0-4.917 4.918c0 .386.045.762.128 1.124a13.985 13.985 0 0 1-10.15-5.15 4.917 4.917 0 0 0 1.523 6.567 4.92 4.92 0 0 1-2.229-.616v.063a4.922 4.922 0 0 0 3.946 4.827 4.932 4.932 0 0 1-2.224.084 4.925 4.925 0 0 0 4.598 3.417A9.869 9.869 0 0 1 0 21.543a13.897 13.897 0 0 0 7.548 2.212c9.056 0 14.004-7.5 14.004-14.004 0-.213-.005-.425-.014-.636A10.025 10.025 0 0 0 23 2.999Z" />
                  </svg>
                </span>
                Twitter
              </a>
            )}
          </div>
        ) : (
          <p className="italic text-gray-500">Add your social links</p>
        )}
      </div>


        {/* Footer Spacer */}
        <div className="h-10"></div>
      </div>
    </div>
  );
}