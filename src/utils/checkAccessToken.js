import { useAuthStore } from "../store/authStore";
import { refreshToken } from "./refreshToken.js";

export const checkAccessToken = async({route = "/login",navigate}) => {

    const {
        accessToken
    } = useAuthStore.getState();

    if(!accessToken) {
      const success = await refreshToken({ navigate, route });
      return success;
    }else {
      return true;
    }
}