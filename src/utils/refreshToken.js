import api from "../../config/axiosConfig.js";
import { BACKEND_URL } from "../../config/envConfig.js";
import { useAuthStore } from "../store/authStore.js";

export async function refreshToken() {

    const {
        setAccessToken,
        reset_authStore,
        setIsLoading,
        setIsLoggedIn
    } = useAuthStore.getState();

    setIsLoading(true);
    try {
        const response = await api.post(
            `${BACKEND_URL}auth/refresh`
        );

        const { info } = response.data;

        if (info) {
            setAccessToken(info);
            setIsLoggedIn(true);
            console.log("Access token received");
            return true;
        } else {
            console.error("No accessToken info in response.");
            setTimeout(()=> {
                reset_authStore();
                setIsLoggedIn(false);
            },2000)
            return false;
        }
    } catch (error) {
        console.log("failed: ", error);
        console.log("status:", error.status)
        if(error.status == 403 || 401) {
            reset_authStore();
            setIsLoggedIn(false);
        }
        return false;
    } finally {
        setIsLoading(false);
    }
}