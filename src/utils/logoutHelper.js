import api from "../../config/axiosConfig.js";
import { BACKEND_URL } from "../../config/envConfig.js";
import { useAuthStore } from "../store/authStore.js";

async function logoutHelper() {
    const {
        reset_authStore,
        setIsLogggedIn,
    } = useAuthStore.getState();

    const response = await api.post(
        `${BACKEND_URL}auth/logout`
    );
    reset_authStore();
    setIsLogggedIn(false);
    console.log(response);
    return;
}

export { logoutHelper };