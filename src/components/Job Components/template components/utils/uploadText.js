import axios from "axios";
import { useAuthStore } from "../../../../store/authStore";
import { BACKEND_URL } from "../../../../../config/envConfig";
import { refreshToken } from "../../../../utils/refreshToken";

export async function uploadText(textState, jobId) {
    try {
        const { accessToken } = useAuthStore.getState();

        let response = await axios.patch(
            `${BACKEND_URL}job/update-text`,
            {
                text: textState,
                jobId
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