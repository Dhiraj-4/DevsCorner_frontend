import axios from "axios";
import { useAuthStore } from "../../../store/authStore.js";
import { BACKEND_URL } from "../../../../config/envConfig.js";
import { refreshToken } from "../../../utils/refreshToken.js";

export async function getConversationsHandler() {
    try {
        const {
            accessToken
        } = useAuthStore.getState();

        const response = await axios.get(
            `${BACKEND_URL}chat/conversations`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );
        console.log(response);
        
        if(response.status == 200) {
            return { status: 200, conversations: response.data.info[0]}
        }
    } catch (error) {
        console.log(error);
        if(error.response?.status == 401) {
            let res = await refreshToken();
            if(res) return getConversationsHandler();
        }
    }
}