import axios from "axios"
import { BACKEND_URL } from "../../../../../config/envConfig.js"
import { useAuthStore } from "../../../../store/authStore"
import { refreshToken } from "../../../../utils/refreshToken";

export const deleteBrandImage = async(jobId) => {
    try {
        const { accessToken } = useAuthStore.getState();

        const response = await axios.patch(
            `${BACKEND_URL}job/delete-brandImage`,
            {
                jobId
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        console.log(response);
        if(response.status == 200) {
            return { status: 200 }
        }
    } catch (error) {
        console.log(error);
        if(error.response?.status == 401) {
            let x = refreshToken();
            if(x) return deleteBrandImage(jobId);
        }
    }
}