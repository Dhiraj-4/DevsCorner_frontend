import axios from "axios";
import { BACKEND_URL } from "../../../config/envConfig.js";
import { useAuthStore } from "../../store/authStore.js";
import { useCommentStore } from "../../store/commentStore.js";
import { refreshToken } from "../../utils/refreshToken.js";

export async function getCommentsHandler({ postId }) {
    const {
        accessToken
    } = useAuthStore.getState();

    const {
        setComments,
        pageNumber,
        setHasMore,
        reset_commentStore,
        setIsLoading
    } = useCommentStore.getState();
    try {
        setIsLoading(true);
        const response = await axios.get(
            `${BACKEND_URL}comment?page=${pageNumber}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                params: {
                    postId: postId
                }
            }
        );

        if(response.status == 200) {
            console.log(response);
            if(pageNumber == 1) reset_commentStore();
            setComments(response.data.info[0]);
            setHasMore(response.data.info[1]);
        }
    } catch (error) {
        console.log(error);
        if(error.response?.status == 401) {
            let res = await refreshToken();
            if(res) getCommentsHandler({ postId });
        }
    } finally {
        setIsLoading(false);
    }
}