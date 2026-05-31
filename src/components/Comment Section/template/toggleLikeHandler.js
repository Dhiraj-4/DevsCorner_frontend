import axios from "axios";
import { useAuthStore } from "../../../store/authStore.js";
import { usePostStore } from "../../../store/postStore.js";
import { BACKEND_URL } from "../../../../config/envConfig.js";
import { refreshToken } from "../../../utils/refreshToken.js";

export async function toggleLikeHandler(commentId) {
    try {
        const { accessToken } = useAuthStore.getState();

        let res = await axios.patch(
            `${BACKEND_URL}comment/toggle-like`,
            {
                commentId
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        return { status: 200, isLiked: (res.data.message == "liked") };
    } catch (error) {
        console.log(error);
        if(error.response?.status == 401) {
            let res = refreshToken();
            if (res) return toggleLikeHandler(commentId);
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