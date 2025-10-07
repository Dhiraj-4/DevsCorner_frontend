import axios from "axios";
import { useAuthStore } from "../../../../store/authStore";
import { BACKEND_URL } from "../../../../../config/envConfig";
import { refreshToken } from "../../../../utils/refreshToken";

export async function uploadApplyLink(applyLinkState, jobId) {
    try {
        const { accessToken } = useAuthStore.getState();

        await axios.patch(
            `${BACKEND_URL}job/update-applyLink`,
            {
                applyLink: applyLinkState,
                jobId
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        return { status: 200, applyLinkState }
    } catch (error) {
        console.log(error);
        if(error.response?.status == 403 || error.response?.status == 401) {
            let res = refreshToken();
            if (res) return uploadApplyLink(textState, jobId);
        }else if(error.response?.status == 400) {
            return {
                status: 400,
                message: (error.response.data.error.issues[0].message || error.response.data.message)
            }
        }else {
            return { status: 500 }
        }
    }
}