import { Mail, MapPin, User } from "lucide-react";
import { PublicSkillItem } from "../components/skills/public skill items.jsx";
import { PublicSocialLinkItem } from "../components/social links/public socialLink item.jsx";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { BACKEND_URL } from "../../config/envConfig.js";
import axios from "axios";
import { CoolButton } from "../components/Buttons/button.jsx";
import { useUserStore } from "../store/userStore.js";
import { toggleFollow } from "../utils/toggleFollow.js";
import { IsLoadingSvg } from "../components/loaders/isLoadingSvg.jsx";
import { refreshToken } from "../utils/refreshToken.js";
import { useAuthStore } from "../store/authStore.js";

export default function PublicProfilePage() {
  const { userName } = useParams();
  const [otherUser, setotherUser] = useState(null);
  const [error, setError] = useState("Loading..");
  const [isLoading, setIsLoading] = useState(false);
  // const flag = useRef(false);
  const [isFollowing, setIsFollowing] = useState(false);
  
  const {
    user
  } = useUserStore();

  const {
    accessToken
  } = useAuthStore();
  
  
  useEffect( () => {
    if(!otherUser) return ;
    let flag = user.following.some( (id) => id.toString() === otherUser._id.toString());
    setIsFollowing(flag);
}, [otherUser, user]);
  
  useEffect(() => {
    if (!userName) return;
    async function fetchUser() {
      try {
        setIsLoading(true);
        console.log("fechting user")
        const res = await axios.get(
          `${BACKEND_URL}user/?userName=${userName}`,
          {
            headers: {
                    Authorization: `Bearer ${accessToken}`
            }
          }
        );

        setotherUser(res.data.info);
        setError("");
        console.log(res);
      } catch (err) {
        console.error("Error fetching user:", err); 
        if(err.response.status == 403 || err.response.status == 401) {
          // let x = refreshToken();
          // if(x) fetchUser();
        }
        setError(err.response.data.message);
      }finally{
        setIsLoading(false);
      }
    }

    fetchUser();
  }, [userName, isFollowing, user]);


  const { skills = {} } = otherUser || {};
  const { socialLinks = {} } = otherUser   || {};
  const { github = "", linkedin = "", twitter = "" } = socialLinks;

  return (
    <>
    {
      (error.length != 0) ? <div className="flex justify-center h-screen items-center font-bold text-white text-2xl">{error}</div> :

      <div className="flex justify-center items-center h-screen pt-20 bg-black">
      <div className="max-w-4xl w-full m-auto p-8 rounded-2xl bg-zinc-900 shadow-xl">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

          {/* Profile Image */}
        <div className="w-32 h-32 relative md:w-40 md:h-40 rounded-full bg-zinc-800 overflow-hidden flex items-center justify-center shadow-md">
            {otherUser?.profileImage ? (
                <img
                    src={otherUser.profileImage}
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
              {otherUser.fullName}
            </h1>
            </div>
          </div>

            <p className="text-gray-400">@{otherUser.userName}</p>
            <p className="text-sm text-gray-500 mt-1">
              Joined {new Date(otherUser.createdAt).toLocaleDateString()}
            </p>

            {/* Followers / Following */}

            <div className="flex justify-center md:justify-start gap-6 mt-3">
              <div className="text-center">
                <p className="text-lg font-semibold text-white">
                  {otherUser.countFollowers ?? 0}
                </p>
                <p className="text-sm text-gray-400">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-white">
                  {otherUser.countFollowing ?? 0}
                </p>
                <p className="text-sm text-gray-400">Following</p>
              </div>
            </div>

          </div>
        </div>

        {/* follow toggle and message buttons */}
        {
          (user.userName !== otherUser.userName) &&

          <div className="flex gap-2 p-2">
          <span>
            <CoolButton 
            text={ isLoading ? <IsLoadingSvg /> : isFollowing ? "unfollow" : "follow"} 
            clickHandler={async() => {
              let res = await toggleFollow(otherUser.userName);
              if(res.status == 200) {
                setIsFollowing(res.isFollowing);
              }
            }}
            /></span>
          <span><CoolButton text={"Message"} /></span>
          </div>
        }

        {/* Bio */}
        <div className="mt-6">
          {otherUser.bio ? 
          <div
          className="flex flex-wrap gap-5"
          >
            <p className="text-gray-200 text-lg leading-relaxed text-center md:text-left">
              {otherUser.bio}
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
            <span>{otherUser.email}</span>
          </div>

          {/* Location */}

      <div className="flex items-center gap-3 text-gray-300">
      <MapPin className="w-5 h-5 text-gray-400" />

      {otherUser.location ? (
        <div className="flex items-center gap-2 bg-black rounded-2xl px-3 py-1">
          <span className="text-gray-400">{otherUser.location}</span>
        </div>
      ) : (
        <span className="italic text-gray-500">
          no location
        </span>
      )}
      </div>


      </div>

        {/* Skills */}
        <div className="mt-10">
              <h2 className="text-xl font-semibold text-white mb-3">Skills</h2>
        
              {
                (Object.keys(skills) != 0) ?

                <div className="flex flex-wrap gap-3">
                {Object.keys(skills).map((skillKey) => (
                  <PublicSkillItem
                    key={skillKey}
                    skillKey={skillKey}
                  />
                ))}
              </div>

              :

              <span className="text-white">No skills</span>
              }
            </div>

        {/* Social Links */}
        <div className="mt-10">
        
                <h2 className="text-xl font-semibold text-white mb-3">Social Links</h2>
        
              {
                (github || twitter || linkedin) ? 

                <div className="flex flex-wrap gap-3">
                <PublicSocialLinkItem
                  label="GitHub"
                  link={github}
                />
        
                <PublicSocialLinkItem
                  label="Twitter"
                  link={twitter}
                />
        
                <PublicSocialLinkItem
                  label="LinkedIn"
                  link={linkedin}
                />
                </div>
                :
                <span className="text-white">No skills</span>
              }
            </div>

      </div>
    </div>
    }
    </>
  );
}