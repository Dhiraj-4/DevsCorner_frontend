import axios from "axios";
import { useAuthStore } from "../store/authStore.js";
import { BACKEND_URL } from "../../config/envConfig.js";
import { refreshToken } from "./refreshToken.js";

export const getMessages = async({conversationId}) => {
    try {
    const { accessToken } = useAuthStore.getState();
      const res = await axios.get(
      `${BACKEND_URL}chat/messages`,
      {
        params: { conversationId, page: 1 },
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
      }
    );
    console.log(res);
    return res;
    } catch (error) {
      console.log(error);
      if(error.response?.status == 401) {
        let x = refreshToken();
        if(x) return getMessages({ conversationId });
      }
    }
}