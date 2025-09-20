import axios from "axios";
import { useAuthStore } from "../../store/authStore";
import { BACKEND_URL } from "../../../config/envConfig";
import { useUserStore } from "../../store/userStore";
import { refreshToken } from "../../utils/refreshToken";

export async function uploadLocation(location) {
    try {
        const {
            accessToken
        } = useAuthStore.getState();

        const { hydrateUser } = useUserStore.getState();

        let res = await axios.post(
            `${BACKEND_URL}user/upload-location`,
            {
                location
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        await hydrateUser();
        return { status: 200, message: "location uploaded" };
    } catch (error) {
        console.log(error);
    if(err.response?.status == 403 || err.response?.status == 401) {
      let res = await refreshToken();
      if(res) await uploadLocation(location);
    }else if(err.response?.status == 400) {
      return { status: err.response?.status, message: err.response?.data.message }
    }else {
      return { status: err.response?.status || 500, message: err.message };
    }
    }
}