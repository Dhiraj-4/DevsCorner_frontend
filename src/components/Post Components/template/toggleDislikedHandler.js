import axios from "axios";
import { useAuthStore } from "../../../store/authStore.js";
import { usePostStore } from "../../../store/postStore.js";
import { BACKEND_URL } from "../../../../config/envConfig.js";
import { refreshToken } from "../../../utils/refreshToken.js";

export async function toggleDislikeHandler(postId) {
    try {
        const { accessToken } = useAuthStore.getState();

        let res = await axios.patch(
            `${BACKEND_URL}post/toggle-dislike`,
            {
                postId
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        return { status: 200, isDisliked: (res.data.message == "disliked") };
    } catch (error) {
        console.log(error);
        if(error.response?.status == 401) {
            let res = refreshToken();
            if (res) return toggleDislikeHandler(postId);
        }else if(error.response?.status == 400) {
            return {
                status: 400,
                message: (error.response.data.error.issues[0]?.message || error.response.data.error.issues[0]?.code)
            }
        }else {
            return { status: 500 }
        }
    }
}