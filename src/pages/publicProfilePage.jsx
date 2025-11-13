import { FileText, Mail, MapPin, User } from "lucide-react";
import { PublicSkillItem } from "../components/skills/public skill items.jsx";
import { PublicSocialLinkItem } from "../components/social links/public socialLink item.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../config/envConfig.js";
import axios from "axios";
import { CoolButton } from "../components/Buttons/button.jsx";
import { useUserStore } from "../store/userStore.js";
import { toggleFollow } from "../utils/toggleFollow.js";
import { IsLoadingSvg } from "../components/loaders/isLoadingSvg.jsx";
import { useAuthStore } from "../store/authStore.js";
import { createConversation } from "../utils/createConversation.js";
import { useTheme } from "../theme-provider.jsx";

export default function PublicProfilePage() {
  const { userName } = useParams();
  const [otherUser, setotherUser] = useState(null);
  const [error, setError] = useState("Loading..");
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const navigate = useNavigate();

  const { user } = useUserStore();
  const { accessToken } = useAuthStore();
  const { activeTheme } = useTheme();

  const isDark = activeTheme === "dark";

  async function startConversation() {
    let response = await createConversation({ receiverId: otherUser._id });
    if (response.status == 200) navigate("/chat");
  }

  useEffect(() => {
    if (!otherUser) return;
    let flag = user.following.some(
      (id) => id.toString() === otherUser._id.toString()
    );
    setIsFollowing(flag);
  }, [otherUser, user]);

  useEffect(() => {
    if (!userName) return;
    async function fetchUser() {
      try {
        setIsLoading(true);
        const res = await axios.get(`${BACKEND_URL}user/?userName=${userName}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        setotherUser(res.data.info);
        setError("");
      } catch (err) {
        console.error("Error fetching user:", err);
        setError(err.response?.data?.message || "Failed to load user");
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, [userName, isFollowing, user]);

  const { skills = {} } = otherUser || {};
  const { socialLinks = {} } = otherUser || {};
  const { github = "", linkedin = "", twitter = "" } = socialLinks;

  const textPrimary = isDark ? "text-neutral-100" : "text-neutral-900";
  const textSecondary = isDark ? "text-neutral-400" : "text-neutral-600";
  const cardBg = isDark
    ? "bg-neutral-900 border border-neutral-800"
    : "bg-white border border-neutral-200";
  const pageBg = isDark ? "bg-neutral-950" : "bg-gray-50";

  return (
    <>
      {error.length !== 0 ? (
        <div
          className={`flex justify-center h-screen items-center font-bold text-2xl ${
            isDark ? "text-neutral-100" : "text-neutral-900"
          }`}
        >
          {error}
        </div>
      ) : (
        <div
          className={`flex justify-center items-center min-h-screen pt-20 transition-colors duration-300 ${pageBg}`}
        >
          <div
            className={`max-w-4xl w-full m-auto p-8 rounded-2xl shadow-xl transition-colors duration-300 ${cardBg}`}
          >
            {/* Top Section */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Profile Image */}
              <div className="w-32 h-32 relative md:w-40 md:h-40 rounded-full overflow-hidden flex items-center justify-center shadow-md bg-neutral-800/50">
                {otherUser?.profileImage ? (
                  <img
                    src={otherUser.profileImage}
                    alt="profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <User
                    className={`w-16 h-16 ${
                      isDark ? "text-neutral-500" : "text-neutral-400"
                    }`}
                  />
                )}
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-2">
                  <h1
                    className={`text-2xl md:text-3xl font-semibold ${textPrimary}`}
                  >
                    {otherUser.fullName}
                  </h1>
                </div>

                <p className={`text-sm ${textSecondary}`}>
                  @{otherUser.userName}
                </p>
                <p className={`text-xs mt-1 ${textSecondary}`}>
                  Joined {new Date(otherUser.createdAt).toLocaleDateString()}
                </p>

                {/* Followers / Following */}
                <div className="flex justify-center md:justify-start gap-6 mt-3">
                  <div className="text-center">
                    <p className={`text-lg font-semibold ${textPrimary}`}>
                      {otherUser.countFollowers ?? 0}
                    </p>
                    <p className={`text-sm ${textSecondary}`}>Followers</p>
                  </div>
                  <div className="text-center">
                    <p className={`text-lg font-semibold ${textPrimary}`}>
                      {otherUser.countFollowing ?? 0}
                    </p>
                    <p className={`text-sm ${textSecondary}`}>Following</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Follow + Message Buttons */}
            {user.userName !== otherUser.userName && (
              <div className="flex gap-2 p-2">
                <CoolButton
                  text={
                    isLoading ? (
                      <IsLoadingSvg />
                    ) : isFollowing ? (
                      "Unfollow"
                    ) : (
                      "Follow"
                    )
                  }
                  clickHandler={async () => {
                    let res = await toggleFollow(otherUser.userName);
                    if (res.status == 200) {
                      setIsFollowing(res.isFollowing);
                    }
                  }}
                />
                <CoolButton
                  text="Message"
                  clickHandler={() => startConversation()}
                />
              </div>
            )}

            {/* Bio */}
            <div className="mt-6">
              <p
                className={`text-lg leading-relaxed text-center md:text-left ${
                  isDark ? "text-neutral-200" : "text-neutral-700"
                }`}
              >
                {otherUser.bio || "No bio"}
              </p>
            </div>

            {/* Contact + Links */}
            <div className="mt-8 space-y-3">
              {/* Email */}
              <div className={`flex items-center gap-3 ${textSecondary}`}>
                <Mail className="w-5 h-5 opacity-80" />
                <span>{otherUser.email}</span>
              </div>

              {/* Location */}
              <div className={`flex items-center gap-3 ${textSecondary}`}>
                <MapPin className="w-5 h-5 opacity-80" />
                {otherUser.location ? (
                  <div
                    className={`flex items-center gap-2 rounded-2xl px-3 py-1 ${
                      isDark ? "bg-neutral-800" : "bg-neutral-100"
                    }`}
                  >
                    <span>{otherUser.location}</span>
                  </div>
                ) : (
                  <span className="italic opacity-70">No location</span>
                )}
              </div>

              {/* Resume */}
              <div className={`flex items-center gap-3 ${textSecondary}`}>
                <FileText className="w-5 h-5 opacity-80" />
                {otherUser.resume ? (
                  <a
                    href={otherUser.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-500 hover:text-indigo-400 transition"
                  >
                    View Resume
                  </a>
                ) : (
                  <span className="italic opacity-70">No resume</span>
                )}
              </div>
            </div>

            {/* Skills */}
            <div className="mt-10">
              <h2
                className={`text-xl font-semibold mb-3 ${
                  isDark ? "text-neutral-100" : "text-neutral-900"
                }`}
              >
                Skills
              </h2>
              {Object.keys(skills).length ? (
                <div className="flex flex-wrap gap-3">
                  {Object.keys(skills).map((skillKey) => (
                    <PublicSkillItem key={skillKey} skillKey={skillKey} />
                  ))}
                </div>
              ) : (
                <span className={textSecondary}>No skills</span>
              )}
            </div>

            {/* Social Links */}
            <div className="mt-10">
              <h2
                className={`text-xl font-semibold mb-3 ${
                  isDark ? "text-neutral-100" : "text-neutral-900"
                }`}
              >
                Social Links
              </h2>
              {github || twitter || linkedin ? (
                <div className="flex flex-wrap gap-3">
                  <PublicSocialLinkItem label="GitHub" link={github} />
                  <PublicSocialLinkItem label="Twitter" link={twitter} />
                  <PublicSocialLinkItem label="LinkedIn" link={linkedin} />
                </div>
              ) : (
                <span className={textSecondary}>No social links</span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}