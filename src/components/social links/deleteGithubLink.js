import axios from "axios";
import { useAuthStore } from "../../store/authStore";
import { BACKEND_URL } from "../../../config/envConfig";
import { refreshToken } from "../../utils/refreshToken";
import { useUserStore } from "../../store/userStore";

export async function deleteGithubLink() {
  const {
      accessToken
  } = useAuthStore.getState();

  const { user } = useUserStore.getState();
  
    try {

        await axios.delete(
            `${BACKEND_URL}user/delete-social-links`,
            {
              data: {
                socialLinks: {
                  github: user.socialLinks.github,
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
              if(res) return await deleteGithubLink();
        }
        else {
            console.error("Failed to delete GitHub link:", err);
            return { status: 500 };
        }
    }
}