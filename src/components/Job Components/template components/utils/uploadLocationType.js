import axios from "axios";
import { useAuthStore } from "../../../../store/authStore.js";
import { BACKEND_URL } from "../../../../../config/envConfig.js";
import { refreshToken } from "../../../../utils/refreshToken.js";

export async function uploadLocationType(locationTypeState, jobId) {
    try {
        const { accessToken } = useAuthStore.getState();

        await axios.patch(
            `${BACKEND_URL}job/update-locationType`,
            {
                locationType: locationTypeState,
                jobId
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        return { status: 200, locationTypeState }
    } catch (error) {
        console.log(error);
        if(error.response?.status == 401) {
            let res = refreshToken();
            if (res) return uploadLocationType(locationTypeState, jobId);
        }else if(error.response?.status == 400) {
            return {
                status: 400,
                message: error.response.data.error.issues[0].message || error.response.data.error.issues[0].code || error.response.data.message
            }
        }else {
            return { status: 500 }
        }
    }
}