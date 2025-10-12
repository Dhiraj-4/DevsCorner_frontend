import axios from "axios";
import { useAuthStore } from "../../../store/authStore.js";
import { usePostStore } from "../../../store/postStore.js";
import { BACKEND_URL } from "../../../../config/envConfig.js";
import { refreshToken } from "../../../utils/refreshToken.js";

export async function deletePost(postId, refresh) {
    try {
        const { accessToken } = useAuthStore.getState();

        const { reset_postStore } = usePostStore.getState();

        await axios.delete(
            `${BACKEND_URL}post/delete`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                data: { postId }
            }
        );

        reset_postStore();
        refresh();
        return { status: 200 }

    } catch (error) {
        console.log(error);
        if(error.response?.status == 401) {
            let res = refreshToken();
            if (res) return deletePost(postId, refresh);
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