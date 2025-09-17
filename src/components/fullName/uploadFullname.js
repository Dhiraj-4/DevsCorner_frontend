import axios from "axios";
import { useAuthStore } from "../../store/authStore";
import { useUserStore } from "../../store/userStore";
import { BACKEND_URL } from "../../../config/envConfig";
import { refreshToken } from "../../utils/refreshToken";

export async function uploadFullname(fullName) {
    try {
        const { accessToken } = useAuthStore.getState();
        const { hydrateUser } = useUserStore.getState();

        await axios.patch(
            `${BACKEND_URL}user/update-bio-fullname`,
            {
                fullName
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        await hydrateUser();
        return { status: 200 }
    } catch (error) {
        console.log(error);
        if(error.response?.status == 403 || error.response?.status == 401) {
            let res = refreshToken();
            if (res) uploadFullname(fullName);
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