import { useNavigate } from "react-router-dom";
import { createPostHandler } from "./createPostHandler.js";
import { usePostStore } from "../../../store/postStore.js";
import { CoolButton } from "../../../components/Buttons/button.jsx";
import { IsLoadingSvg } from "../../../components/loaders/isLoadingSvg.jsx";
import { Error } from "../../../components/errors/error.jsx";
import { Input } from "../../../components/Inputs/input.jsx";
import { useAuthStore } from "../../../store/authStore.js";
import { CreatePostHeader } from "../../../components/headers/createPostHeader.jsx";

export function UploadPostPage() {

    const {
        text,
        setText
    } = usePostStore();

    const {
        isLoading
    } = useAuthStore();

    const navigate = useNavigate();
    return (
        <div className="primary-bg">

            {/* Header */}
            <CreatePostHeader />
            <form
                action="/feed"
                onSubmit={async(e) => {
                e.preventDefault();
                let success = await createPostHandler();
                if(success) {
                    navigate("/feed");
                }
                }}
                className="primary-form"
            >

                {/* Error */}
                <Error />

                <Input 
                    type={"text"}
                    name={"text"}
                    required={true}
                    minLength={1}
                    placeholder={"Post text"}
                    value={text}
                    set={setText}
                    autoComplete={"text"}
                />

                <CoolButton text={
                    (isLoading) ? <IsLoadingSvg/> : "Create Post"
                }/>

            </form>
        </div>
    )
}