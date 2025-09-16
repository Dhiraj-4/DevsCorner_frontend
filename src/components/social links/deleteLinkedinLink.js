import axios from "axios";
import { useAuthStore } from "../../store/authStore";
import { BACKEND_URL } from "../../../config/envConfig";
import { useUserStore } from "../../store/userStore";
import { refreshToken } from "../../utils/refreshToken";

export async function deleteLinkedinLink() {
    try {
        const {
            accessToken
        } = useAuthStore.getState();

        const {
            hydrateUser,
            user
        } = useUserStore.getState();

        await axios.delete(
            `${BACKEND_URL}user/delete-social-links`,
            {
              data: {
                socialLinks: {
                  linkedin: user.socialLinks.linkedin,
                },
              },
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
        );


        await hydrateUser();
    } catch (err) {
        if(err.response?.status == 403 || err.response?.status == 401) {
              let res = await refreshToken();
              if(res) await deleteLinkedinLink();
        }
        console.error("failed:", err);
        throw err;
    }
}