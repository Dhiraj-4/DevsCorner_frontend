import { Trash2, ThumbsDown, ThumbsUp } from "lucide-react";
import { Owner } from "../../Job Components/template components/owner.jsx";
import { PostText } from "../text/post text.jsx";
import { deletePost } from "./deletePost.js";
import { useState } from "react";
import { toggleLikeHandler } from "./toggleLikeHandler.js";
import { toggleDislikeHandler } from "./toggleDislikedHandler.js";
import { useTheme } from "../../../theme-provider.jsx";

export function PostTemplate({
  text,
  owner,
  postId,
  isFollowing,
  likes,
  dislikes,
  isLiked,
  isDisliked,
}) {
  const [isLikedState, setIsLikedState] = useState(isLiked);
  const [isDislikedState, setIsDislikedState] = useState(isDisliked);
  const [likesCount, setLikesCount] = useState(likes);
  const [dislikesCount, setDislikesCount] = useState(dislikes);

  const { activeTheme } = useTheme();

  // dynamic colors based on theme
  const containerStyle =
    activeTheme === "dark"
      ? "bg-neutral-900 border border-neutral-800 text-neutral-200"
      : "bg-white border border-neutral-200 text-neutral-800";
  const badgeStyle =
    activeTheme === "dark"
      ? "bg-blue-500 text-white"
      : "bg-blue-600 text-white";
  const iconActive =
    activeTheme === "dark" ? "fill-neutral-100" : "fill-neutral-900";
  const iconInactive =
    activeTheme === "dark"
      ? "fill-transparent stroke-neutral-400"
      : "fill-transparent stroke-neutral-600";

  return (
    <div
      id={postId}
      className={`flex flex-col gap-4 w-full mx-auto p-5 md:p-6 mb-5 rounded-2xl shadow-md transition-colors duration-300 ${containerStyle}`}
    >
      {owner !== "YOU" ? (
        <Owner owner={owner} isFollowing={isFollowing} />
      ) : (
        <div className="flex justify-between items-center gap-2 mb-2">
          <span
            className={`px-3 py-1.5 text-xs font-bold rounded-full ${badgeStyle}`}
          >
            YOU
          </span>

          <Trash2
            className="w-6 h-6 text-neutral-400 hover:text-red-500 cursor-pointer transition-colors duration-200"
            onClick={async () => {
              let post = document.getElementById(postId);
              console.log("remove a post");
              if(post) post.remove();
              await deletePost(postId);
            }}
          />
        </div>
      )}

      <PostText text={text} owner={owner} postId={postId} />

      <div className="flex gap-4 pt-1">
        <button
          className="flex flex-col items-center justify-center hover:scale-105 transition-transform duration-150"
          onClick={async () => {
            let res = await toggleLikeHandler(postId);
            if (res.status == 200) {
              if (res.isLiked) {
                setIsLikedState(true);
                setLikesCount(likesCount + 1);
                if (isDislikedState) {
                  setDislikesCount(dislikesCount - 1);
                  setIsDislikedState(false);
                }
              } else {
                setIsLikedState(false);
                setLikesCount(likesCount - 1);
              }
            }
          }}
        >
          <ThumbsUp
            className={`w-5 h-5 ${
              isLikedState ? iconActive : iconInactive
            } transition-all duration-200`}
          />
          <span
            className={`text-sm ${
              activeTheme === "dark"
                ? "text-neutral-400"
                : "text-neutral-700"
            }`}
          >
            {likesCount}
          </span>
        </button>

        <button
          className="flex flex-col items-center justify-center hover:scale-105 transition-transform duration-150"
          onClick={async () => {
            let res = await toggleDislikeHandler(postId);
            if (res.status == 200) {
              if (res.isDisliked) {
                setDislikesCount(dislikesCount + 1);
                setIsDislikedState(true);
                if (isLikedState) {
                  setIsLikedState(false);
                  setLikesCount(likesCount - 1);
                }
              } else {
                setDislikesCount(dislikesCount - 1);
                setIsDislikedState(false);
              }
            }
          }}
        >
          <ThumbsDown
            className={`w-5 h-5 ${
              isDislikedState ? iconActive : iconInactive
            } transition-all duration-200`}
          />
          <span
            className={`text-sm ${
              activeTheme === "dark"
                ? "text-neutral-400"
                : "text-neutral-700"
            }`}
          >
            {dislikesCount}
          </span>
        </button>
      </div>
    </div>
  );
}