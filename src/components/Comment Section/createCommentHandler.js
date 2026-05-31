import axios from "axios";
import { useAuthStore } from "../../store/authStore.js";
import { refreshToken } from "../../utils/refreshToken.js";
import { BACKEND_URL } from "../../../config/envConfig.js";
import { useCommentStore } from "../../store/commentStore.js";

export async function createCommentHandler({ postId, commentCount, setCommentCount }) {
    const {
        text,
        setIsLoading,
        addComment
    } = useCommentStore.getState();

    const {
        setError,
        clearError,
        accessToken
    } = useAuthStore.getState();

    try {
        setIsLoading(true);

        const response = await axios.post(
            `${BACKEND_URL}comment/post`,
            {
                text,
                postId
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        if(response.status == 201) {
            console.log("Comment created success", response.data.info);
            response.data.info.owner = "YOU";
            setCommentCount(commentCount + 1);
            addComment(response.data.info);
            clearError();
            return true;
        }else {
            return false;
        }
    } catch (error) {
        console.log(error);
        if(error.response?.status == 401) {
            let res = await refreshToken();
            if (res) return await createCommentHandler({ postId });
        }
        else if(error.response?.status == 400) {
            setError( error.response.data?.error?.issues[0].message || error.response.data?.error?.issues[0].code || error.response.data.message);
        }
        return false;
    }finally {
        setIsLoading(false);
    }
}