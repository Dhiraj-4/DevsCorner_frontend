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

        if(error.response?.status == 401) {
            let res = await refreshToken();
            if (res) return await uploadApplyLink(applyLinkState, jobId);
        }

        else if (error.response?.status === 400) {
            const issue = error.response.data?.error?.issues?.[0];
            const path = issue?.path?.[0];
            const rawMsg = issue?.message;

            let clean = rawMsg;
            if (rawMsg && rawMsg.startsWith("String")) {
                clean = rawMsg.slice("String".length).trim();
            }
        
            let errStr = "";
            if (path) {
                errStr = `${path} ${clean}`;
            } else if (clean) {
                errStr = clean;
            }

            return { 
                status: 400,
                message: errStr || error.response?.data?.message || "Bad Request"
             };
        }

        else if (error.response?.status === 429) {
            
            return {
                status: 429,
                message: "Too Many Requests 😮"
            };
        }

        else if (error.response?.status === 409) {
            return {
                status: 409,
                message: error.response?.data?.message
            };
        }

        else {
            return { status: 500 };
        }
    }
}