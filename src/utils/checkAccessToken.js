import { useAuthStore } from "../store/authStore";
import { refreshToken } from "./refreshToken.js";

export const checkAccessToken = async() => {

    const {
        accessToken
    } = useAuthStore.getState();

    if(!accessToken) {
      const success = await refreshToken();
      return success;
    }else {
      return true;
    }
}