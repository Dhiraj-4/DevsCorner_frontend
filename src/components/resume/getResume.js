import axios from "axios"
import { BACKEND_URL } from "../../../config/envConfig"
import { useAuthStore } from "../../store/authStore";
import { refreshToken } from "../../utils/refreshToken";

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
        if( err.response?.status == 401) {
              let res = await refreshToken();
              if(res) return await getResume();
        }
        console.error("failed:", err);
        throw err;
    }
}