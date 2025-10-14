import { Trash2, ThumbsDown, ThumbsUp } from "lucide-react";
import { Owner } from "../../Job Components/template components/owner.jsx";
import { PostText } from "../text/post text.jsx";
import { deletePost } from "./deletePost.js";
import { useState } from "react";
import { toggleLikeHandler } from "./toggleLikeHandler.js";
import { toggleDislikeHandler } from "./toggleDislikedHandler.js";

export function PostTemplate({ text, owner, postId, isFollowing, likes, dislikes, isLiked, isDisliked}) {

  const [isLikedState, setIsLikedState] = useState(isLiked);
  const [isDislikedState, setIsDislikedState] = useState(isDisliked);
  const [likesCount, setLikesCount] = useState(likes);
  const [dislikesCount, setDislikesCount] = useState(dislikes);

  return (
    <div id={postId}
    className="flex flex-col gap-4 max-w-md mx-auto p-6 mb-4 bg-white shadow-md rounded-2xl border border-gray-200">
      
        {(owner != "YOU") ? (
            <Owner owner={owner} isFollowing={isFollowing}/>
        ) : (
            <div className="flex justify-between items-center gap-2 mb-2">
            <span className="px-3 py-2 text-xs font-bold text-white bg-blue-600 rounded-full">
              YOU
            </span>

            <Trash2 
                className="w-7 h-7 text-gray-400 hover:text-red-400 cursor-pointer" 
                onClick={async() => deletePost(postId)}
            />
            </div>
        )}
      
        <PostText text={text} owner={owner} postId={postId} />

        <div className="flex gap-2">
          <span className="flex flex-col justify-center items-center">

            <ThumbsUp className="w-5 h-5" 
              fill={isLikedState ? "black" : "white"} 

              onClick={async() => {
                let res = await toggleLikeHandler(postId);
                if(res.status == 200) {
                  if(res.isLiked) {
                    setIsLikedState(true);
                    setLikesCount(likesCount+1);
                    if(isDislikedState) {
                      setDislikesCount(dislikesCount-1);
                      setIsDislikedState(false);
                    }
                  }else {
                    setIsLikedState(false);
                    setLikesCount(likesCount-1);
                  }
                }
              }} 
            />

            {likesCount}</span>

          <span className="flex flex-col justify-center items-center">

            <ThumbsDown 
              className="w-5 h-5" fill={isDislikedState ? "black" : "white"} 
              onClick={async() => {
                let res = await toggleDislikeHandler(postId);
                if(res.status == 200) {
                  if(res.isDisliked) {
                    setDislikesCount(dislikesCount+1);
                    setIsDislikedState(true);
                    if(isLikedState) {
                      setIsLikedState(false);
                      setLikesCount(likesCount-1);
                    }
                  }else {
                    setDislikesCount(dislikesCount-1);
                    setIsDislikedState(false);
                  }
                }
              }} 
            />

            {dislikesCount}</span>
        </div>
    </div>
  );
}