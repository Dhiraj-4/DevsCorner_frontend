import axios from "axios";
import { useAuthStore } from "../../store/authStore"
import { BACKEND_URL } from "../../../config/envConfig";
import { refreshToken } from "../../utils/refreshToken";

export const deleteProfileImage = async() => {
    const {
        accessToken
    } = useAuthStore.getState();

    try {
        await axios.delete(
            `${BACKEND_URL}user/profile-image`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
        );

        return { status: 200  };
    } catch (err) {
        if(err.response?.status == 401) {
              let res = await refreshToken();
              if(res) return await deleteProfileImage();
        }
        console.error("deletion failed:", err);
        throw err;
    }
}