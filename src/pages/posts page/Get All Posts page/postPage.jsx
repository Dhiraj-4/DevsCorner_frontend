import { useEffect, useRef } from "react"
import { useUserStore } from "../../../store/userStore.js";
import { usePostStore } from "../../../store/postStore.js";
import { getPostsHandler } from "./getPostsHelper.js";
import { PostTemplate } from "../../../components/Post Components/template/postTemplate.jsx";

export function PostPage() {

    const {
        setPageNumber,
        postsArray,
        reset_postStore,
        hasMore
    } = usePostStore();

    const {
        user
    } = useUserStore();

    const targetRef = useRef(null);
    const isLoadingRef = useRef(false);

    async function loadMore(entries, observer) {
        if(isLoadingRef.current || !hasMore) return;

        for(let entry of entries) {
            if(entry.isIntersecting) {
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

    useEffect( () => {
        handler();
    },[]);

    useEffect( () => {
        if(!targetRef.current) return;

        const options = {
            root: document.querySelector("scrollArea"),
            rootMargin: "0px",
            threshold: 0,
        }

        const observer = new IntersectionObserver(loadMore, options);
        observer.observe(targetRef.current);

        return () => observer.disconnect();
    },[postsArray, hasMore])
    
    return (
        <div className="flex justify-center items-center h-full min-h-screen mt-20 pt-20 bg-black">
            {
                (postsArray.length != 0) ?

                <div className="fixed top-40 left-1/2 -translate-x-1/2 max-w-4xl w-full h-[calc(100vh-13rem)] overflow-y-auto 
             p-8 rounded-2xl bg-zinc-900 shadow-xl">
                {
                    postsArray.map( (post) => {
                        return <PostTemplate
                            isFollowing={user.following.some( (id) => id.toString() === post.owner._id.toString())}
                            refresh={getPostsHandler}
                            key={post.postId}
                            text={post.text}
                            owner={ (user.userName === post.owner.userName) ? "YOU" : post.owner }
                            postId={post.postId}
                            likes={post.countLikes}
                            dislikes={post.countDislikes}
                            isLiked={post.likes.some( (id) => id.toString() == user._id.toString())}
                            isDisliked={post.dislikes.some( (id) => id.toString() == user._id.toString())}
                        />
                    })
                }

                <div
                  id="target"
                  ref={targetRef}
                  className="flex justify-center text-white font-bold text-xl"
                >
                  {hasMore ? "Loading..." : "No more posts"}
                </div>
        
            </div>

            :

            <div className="text-white font-bold text-3xl"
            >No Posts :(</div>
            }
        </div>
    )
}