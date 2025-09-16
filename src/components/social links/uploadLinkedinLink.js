import axios from "axios";
import { useAuthStore } from "../../store/authStore";
import { BACKEND_URL } from "../../../config/envConfig";
import { useUserStore } from "../../store/userStore";
import { refreshToken } from "../../utils/refreshToken";

export async function uploadLinkedinLink(link) {
    const {
        accessToken
    } = useAuthStore.getState();

    const {
        hydrateUser
    } = useUserStore.getState();

    try {

        let res = await axios.post(
            `${BACKEND_URL}user/upload-social-links`,
            {
                socialLinks: {
                    linkedin: link
                }
            },
            {
                headers : {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
        );

        await hydrateUser();
        return {
            status: 200
        }
    } catch (err) {

        if(err.response?.status == 403 || err.response?.status == 401) {
              let res = await refreshToken();
              if(res) await uploadLinkedinLink(link);
        }else if(err.response?.status == 400) {
          return {
            status: 400,
            message: "Invalid Linkedin profile Url"
          }
        }else {
            return {
                status: 500,
                message: "Something went wrong"
            }
        }
        console.error("failed:", err);
        throw err;
    }
}