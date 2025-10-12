import { Trash2, ThumbsDown, ThumbsUp } from "lucide-react";
import { Owner } from "../../Job Components/template components/owner.jsx";
import { PostText } from "../text/post text.jsx";
import { deletePost } from "./deletePost.js";
import { useState } from "react";
import { toggleLikeHandler } from "./toggleLikeHandler.js";
import { toggleDislikeHandler } from "./toggleDislikedHandler.js";

export function PostTemplate({ text, owner, postId, refresh, isFollowing, likes, dislikes, isLiked, isDisliked}) {

  const [isLikedState, setIsLikedState] = useState(isLiked);
  const [isDislikedState, setIsDislikedState] = useState(isDisliked);


  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto p-6 mb-4 bg-white shadow-md rounded-2xl border border-gray-200">
      
        {(owner != "YOU") ? (
            <Owner owner={owner} isFollowing={isFollowing}/>
        ) : (
            <div className="flex justify-between items-center gap-2 mb-2">
            <span className="px-3 py-2 text-xs font-bold text-white bg-blue-600 rounded-full">
              YOU
            </span>

            <Trash2 
                className="w-7 h-7 text-gray-400 hover:text-red-400 cursor-pointer" 
                onClick={async() => deletePost(postId, refresh)}
            />
            </div>
        )}
      
        <PostText text={text} owner={owner} postId={postId} />

        <div className="flex gap-2">
          <span className="flex flex-col justify-center items-center">

            <ThumbsUp className="w-5 h-5" 
              fill={isLikedState ? "black" : "white"} 

              onClick={async() => {
                let res = await toggleLikeHandler(postId, refresh);
                if(res.status == 200) {
                  if(res.isLiked) {
                    setIsLikedState(true);
                    setIsDislikedState(false);
                  }
                }
              }} 
            />

            {likes}</span>

          <span className="flex flex-col justify-center items-center">

            <ThumbsDown 
              className="w-5 h-5" fill={isDislikedState ? "black" : "white"} 
              onClick={async() => {
                let res = await toggleDislikeHandler(postId, refresh);
                if(res.status == 200) {
                  if(res.isDisliked) {
                    setIsDislikedState(true);
                    setIsLikedState(false);
                  }
                }
              }} 
            />

            {dislikes}</span>
        </div>
    </div>
  );
}