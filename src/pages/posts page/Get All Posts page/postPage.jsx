// import { useEffect, useRef } from "react"
// import { useUserStore } from "../../../store/userStore.js";
// import { usePostStore } from "../../../store/postStore.js";
// import { getPostsHandler } from "./getPostsHelper.js";
// import { PostTemplate } from "../../../components/Post Components/template/postTemplate.jsx";
// import { IsLoadingSvg } from "../../../components/loaders/isLoadingSvg.jsx";

// export function PostPage() {

//     const {
//         setPageNumber,
//         postsArray,
//         reset_postStore,
//         hasMore,
//         isLoading
//     } = usePostStore();

//     const {
//         user
//     } = useUserStore();

//     const targetRef = useRef(null);
//     const isLoadingRef = useRef(false);

//     async function loadMore(entries, observer) {
//         if(isLoadingRef.current || !hasMore) return;

//         for(let entry of entries) {
//             if(entry.isIntersecting) {
//                 console.log("loaded more");
//                 isLoadingRef.current = true;
//                 await getPostsHandler();
//                 setPageNumber();
//                 isLoadingRef.current = false;
//             }
//         }
//     } 

//     async function handler() {
//         reset_postStore();
//         await getPostsHandler();
//         setPageNumber();
//     }

//     useEffect( () => {
//         handler();
//     },[]);

//     useEffect( () => {
//         if(!targetRef.current) return;

//         const options = {
//             root: document.querySelector("scrollArea"),
//             rootMargin: "0px",
//             threshold: 0,
//         }

//         const observer = new IntersectionObserver(loadMore, options);
//         observer.observe(targetRef.current);

//         return () => observer.disconnect();
//     },[postsArray, hasMore]);

//     if(isLoading && (postsArray.length == 0 && hasMore)) {
//         return (
//             <div className="flex justify-center items-center h-full min-h-screen mt-20 pt-20 bg-black">
//                 <IsLoadingSvg />
//             </div>
//         )
//     }
    
//     return (
//         <div className="flex justify-center items-center h-full min-h-screen mt-20 pt-20 bg-black">
//             {
//                 (postsArray.length != 0) ?

//                 <div className="fixed top-40 left-1/2 -translate-x-1/2 max-w-4xl w-full h-[calc(100vh-13rem)] overflow-y-auto 
//              p-8 rounded-2xl bg-zinc-900 shadow-xl">
//                 {
//                     postsArray.map( (post) => {
//                         return <PostTemplate
//                             isFollowing={user.following.some( (id) => id.toString() === post.owner._id.toString())}
//                             refresh={getPostsHandler}
//                             key={post.postId}
//                             text={post.text}
//                             owner={ (user.userName === post.owner.userName) ? "YOU" : post.owner }
//                             postId={post.postId}
//                             likes={post.countLikes}
//                             dislikes={post.countDislikes}
//                             isLiked={post.likes.some( (id) => id.toString() == user._id.toString())}
//                             isDisliked={post.dislikes.some( (id) => id.toString() == user._id.toString())}
//                         />
//                     })
//                 }

//                 <div
//                   id="target"
//                   ref={targetRef}
//                   className="flex justify-center text-white font-bold text-xl"
//                 >
//                   {hasMore ? <IsLoadingSvg /> : "No more posts"}
//                 </div>
        
//             </div>

//             :

//             <div className="text-white font-bold text-3xl"
//             >No Posts :(</div>
//             }
//         </div>
//     )
// }

import { useEffect, useRef } from "react";
import { useUserStore } from "../../../store/userStore.js";
import { usePostStore } from "../../../store/postStore.js";
import { getPostsHandler } from "./getPostsHelper.js";
import { PostTemplate } from "../../../components/Post Components/template/postTemplate.jsx";
import { IsLoadingSvg } from "../../../components/loaders/isLoadingSvg.jsx";
import { useTheme } from "../../../theme-provider.jsx";

export function PostPage() {
  const { setPageNumber, postsArray, reset_postStore, hasMore, isLoading } =
    usePostStore();

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
        await getPostsHandler();
        setPageNumber();
        isLoadingRef.current = false;
      }
    }
  }

  async function handler() {
    reset_postStore();
    await getPostsHandler();
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
  }, [postsArray, hasMore]);

  // Colors based on theme
  const pageBg =
    activeTheme === "dark" ? "bg-neutral-950 text-neutral-100" : "bg-neutral-50 text-neutral-900";
  const containerBg =
    activeTheme === "dark" ? "bg-neutral-900" : "bg-white border border-neutral-200 shadow-md";

  if (isLoading && postsArray.length === 0 && hasMore) {
    return (
      <div
        className={`flex justify-center items-center h-full min-h-screen mt-20 pt-20 ${pageBg} transition-colors duration-300`}
      >
        <IsLoadingSvg />
      </div>
    );
  }

  return (
    <div
      className={`flex justify-center items-center h-full min-h-screen ${pageBg} transition-colors duration-300`}
    >
      {postsArray.length !== 0 ? (
        <div
          className={`fixed top-25 left-1/2 -translate-x-1/2 max-w-4xl w-full h-[calc(100vh-10rem)] overflow-y-auto 
          p-6 md:p-8 rounded-2xl ${containerBg} transition-colors duration-300`}
        >
          {postsArray.map((post) => (
            <PostTemplate
              key={post.postId}
              isFollowing={user.following.some(
                (id) => id.toString() === post.owner._id.toString()
              )}
              refresh={getPostsHandler}
              text={post.text}
              owner={
                user.userName === post.owner.userName ? "YOU" : post.owner
              }
              postId={post.postId}
              likes={post.countLikes}
              dislikes={post.countDislikes}
              isLiked={post.likes.some(
                (id) => id.toString() === user._id.toString()
              )}
              isDisliked={post.dislikes.some(
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
            {hasMore ? <IsLoadingSvg /> : "No more posts"}
          </div>
        </div>
      ) : (
        <div
          className={`font-bold text-3xl ${
            activeTheme === "dark" ? "text-neutral-300" : "text-neutral-700"
          }`}
        >
          No Posts :(
        </div>
      )}
    </div>
  );
}