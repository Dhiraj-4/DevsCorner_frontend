import axios from "axios";
import { useAuthStore } from "../../store/authStore"
import { BACKEND_URL } from "../../../config/envConfig";
import { useUserStore } from "../../store/userStore";

export const deleteProfileImage = async() => {
    const {
        accessToken
    } = useAuthStore.getState();

    const {
        hydrateUser
    } = useUserStore.getState();

    try {
        await axios.delete(
            `${BACKEND_URL}user/profile-image`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
        );

        await hydrateUser();
    } catch (err) {
        if(err.response?.status == 403) {
              let res = await refreshToken();
              if(res) await deleteProfileImage();
        }
        console.error("deletion failed:", err);
        throw err;
    }
}