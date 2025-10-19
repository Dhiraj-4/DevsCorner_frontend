import axios from "axios"
import { BACKEND_URL } from "../../config/envConfig.js"
import { useAuthStore } from "../store/authStore.js"
import { refreshToken } from "./refreshToken.js";
import { useUserStore } from "../store/userStore.js";
import { useChatStore } from "../store/chatStore.js";

export const createConversation = async({ receiverId }) => {
    try {
        console.log("createConversation fire");
        
        const { accessToken } = useAuthStore.getState();

        const { user } = useUserStore.getState();

        const { setActiveConversation } = useChatStore.getState();

        const response = await axios.post(
            `${BACKEND_URL}chat/conversations`,
            {
                userId: user._id,
                receiverId
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        console.log(response);
        setActiveConversation(response.data.info);
        if(response.status == 201) {
            return { status: 200 };
        }
    } catch (error) {
        console.log(error);
        if(error.response?.status == 401) {
            let res = refreshToken();
            if(res) return createConversation({ receiverId });
        }
    }
}