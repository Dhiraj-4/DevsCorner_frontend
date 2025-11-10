import axios from "axios";
import { useAuthStore } from "../../../../store/authStore.js";
import { BACKEND_URL } from "../../../../../config/envConfig.js";
import { refreshToken } from "../../../../utils/refreshToken.js";

export async function uploadLocation(locationState, jobId) {
    try {
        const { accessToken } = useAuthStore.getState();

        await axios.patch(
            `${BACKEND_URL}job/update-location`,
            {
                location: locationState,
                jobId
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        return { status: 200, locationState }
    } catch (error) {
        console.log(error);
        if(error.response?.status == 401) {
            let res = await refreshToken();
            if (res) return await uploadLocation(locationState, jobId);
        }else if(error.response?.status == 400) {
            return {
                status: 400,
                message: error.response.data.message ||error.response.data.error.issues[0].message || error.response.data.error.issues[0].code 
            }
        }else {
            return { status: 500 }
        }
    }
}