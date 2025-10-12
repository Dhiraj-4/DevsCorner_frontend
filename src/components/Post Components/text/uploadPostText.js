import axios from "axios";
import { useAuthStore } from "../../../store/authStore.js";
import { BACKEND_URL } from "../../../../config/envConfig.js";
import { refreshToken } from "../../../utils/refreshToken.js";

export async function uploadText(textState, postId) {
    try {
        const { accessToken } = useAuthStore.getState();

        let response = await axios.patch(
            `${BACKEND_URL}post/update-text`,
            {
                text: textState,
                postId
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        let text = response.data.info.text;
        console.log(response);
        return { status: 200, text }
    } catch (error) {
        console.log(error);
        if(error.response?.status == 401) {
            let res = refreshToken();
            if (res) return uploadText(textState, jobId);
        }else if(error.response?.status == 400) {
            return {
                status: 400,
                message: error.response.data.error.issues[0].code
            }
        }else {
            return { status: 500 }
        }
    }
}