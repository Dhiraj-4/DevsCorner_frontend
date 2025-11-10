import axios from "axios";
import { useAuthStore } from "../../store/authStore";
import { BACKEND_URL } from "../../../config/envConfig";
import { refreshToken } from "../../utils/refreshToken";

export async function uploadTwitterLink(link) {
    const {
        accessToken
    } = useAuthStore.getState();

    try {

        let res = await axios.post(
            `${BACKEND_URL}user/upload-social-links`,
            {
                socialLinks: {
                    twitter: link
                }
            },
            {
                headers : {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
        );

        return { status: 200, link };
    } catch (err) {
        if(err.response?.status == 401) {
              let res = await refreshToken();
              if(res) return await uploadTwitterLink(link);
        }else if(err.response?.status == 400) {
          return {
            status: 400,
            message: "Invalid Twitter profile Url"
          }
        }else {
            return {
                status: 500,
                message: "Something went wrong"
            }
        }
    }
}