import axios from "axios"
import { BACKEND_URL } from "../../../config/envConfig"
import { useAuthStore } from "../../store/authStore";

export const getResume = async() => {
    const {
        accessToken
    } = useAuthStore.getState();
    
    try {
        const res = await axios.get(
        `${BACKEND_URL}user/resume`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
        );
        console.log(res);
        window.open(res.data.info, "_blank");

    } catch (err) {
        if(err.response?.status == 403 || err.response?.status == 401) {
              let res = await refreshToken();
              if(res) await getResume();
        }
        console.error("failed:", err);
        throw err;
    }
}