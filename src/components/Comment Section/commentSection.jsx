import { useEffect, useRef } from "react";
import { useUserStore } from "../../store/userStore.js";
import { useCommentStore } from "../../store/commentStore.js";
import { getCommentsHandler } from "./getCommentsHelper.js";
import { CommentTemplate } from "./template/commentTemplate.jsx";
import { IsLoadingSvg } from "../../components/loaders/isLoadingSvg.jsx";
import { useTheme } from "../../theme-provider.jsx";
import { OnCancelButton } from "../Buttons/onCancelButton.jsx";
import { UploadComment } from "./uploadComment.jsx";

export function CommentSection({ postId, setIsCommentSection, commentCount, setCommentCount }) {
  const { setPageNumber, commentsArray, reset_commentStore, hasMore, isLoading } =
    useCommentStore();

  const { user } = useUserStore();
  const { activeTheme } = useTheme();

  const targetRef = useRef(null);
  const isLoadingRef = useRef(false);

  async function loadMore(entries) {
    if (isLoadingRef.current || !hasMore) return;

    for (let entry of entries) {
      if (entry.isIntersecting) {
        console.log("loaded more");
        isLoadingRef.current = true;
        await getCommentsHandler({ postId });
        setPageNumber();
        isLoadingRef.current = false;
      }
    }
  }

  async function handler() {
    reset_commentStore();
    await getCommentsHandler({ postId });
    setPageNumber();
  }

  useEffect(() => {
    handler();
  }, []);

  useEffect(() => {
    if (!targetRef.current) return;

    const options = {
      root: document.querySelector("scrollArea"),
      rootMargin: "0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(loadMore, options);
    observer.observe(targetRef.current);

    return () => observer.disconnect();
  }, [commentsArray, hasMore]);

  // Colors based on theme
  const pageBg =
    activeTheme === "dark" ? "bg-neutral-950 text-neutral-100" : "bg-neutral-50 text-neutral-900";
  const containerBg =
    activeTheme === "dark" ? "bg-neutral-900" : "bg-white border border-neutral-200 shadow-md";

  if (isLoading && commentsArray.length === 0 && hasMore) {
    return (
      <div
        className={`flex justify-center items-center h-full min-h-screen ${pageBg} transition-colors duration-300`}
      >
        <IsLoadingSvg />
      </div>
    );
  }

  function handleClickCancel() {
    setIsCommentSection(false);
  }

  return (
    <div className="mt-2 overflow-auto relative">
    <OnCancelButton onClick={handleClickCancel} text={"Close Comment Section"}/>
    <div
      className={`flex flex-col justify-center items-center h-full min-h-10 ${pageBg} transition-colors duration-300`}
    >
      {commentsArray.length !== 0 ? (
        <div
          className={`max-w-4xl w-full overflow-y-auto max-h-100 
          p-6 md:p-8 rounded-2xl ${containerBg} transition-colors duration-300`}
        >
          {commentsArray.map((comment) => (
            <CommentTemplate
              key={comment.commentId}
              isFollowing={user.following.some(
                (id) => id.toString() === comment.owner._id.toString()
              )}
              refresh={() => getCommentsHandler({postId})}
              text={comment.text}
              owner={
                user.userName === comment.owner.userName ? "YOU" : comment.owner
              }
              commentCount={commentCount}
              setCommentCount={setCommentCount}
              commentId={comment.commentId}
              likes={comment.countLikes}
              dislikes={comment.countDislikes}
              comments={comment.countCommnets}
              isLiked={comment.likes.some(
                (id) => id.toString() === user._id.toString()
              )}
              isDisliked={comment.dislikes.some(
                (id) => id.toString() === user._id.toString()
              )}
            />
            
          ))}

          <div
            id="target"
            ref={targetRef}
            className={`flex justify-center font-medium text-lg py-4 ${
              activeTheme === "dark" ? "text-neutral-400" : "text-neutral-600"
            }`}
          >
            {hasMore ? <IsLoadingSvg /> : "No more comments"}
          </div>
        </div>
      ) : (
        <div
          className={`font-bold text-3xl ${
            activeTheme === "dark" ? "text-neutral-300" : "text-neutral-700"
          }`}
        >
          No Comments :(
        </div>
      )}

      <div className="flex relative gap-2 justify-center items-center">
        <UploadComment postId={postId} commentCount={commentCount} setCommentCount={setCommentCount} />
      </div>
    </div>

    </div>
    );
}