import axios from "axios";
import { useAuthStore } from "../../store/authStore";
import { BACKEND_URL } from "../../../config/envConfig";
import { refreshToken } from "../../utils/refreshToken";
import { useUserStore } from "../../store/userStore";

export async function deleteTwitterLink() {
    try {
        const {
            accessToken
        } = useAuthStore.getState();

        const { user } = useUserStore.getState();

        await axios.delete(
            `${BACKEND_URL}user/delete-social-links`,
            {
              data: {
                socialLinks: {
                  twitter: user.socialLinks.twitter,
                },
              },
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
        );

        return { status: 200 };
    } catch (err) {
        if(err.response?.status == 401) {
              let res = await refreshToken();
              if(res) return await deleteTwitterLink();
        }
        else {
            console.error("Failed to delete Twitter link:", err);
            return { status: 500 };
        }
    }
}