import api from "../../config/axiosConfig.js";
import { BACKEND_URL } from "../../config/envConfig.js";
import { useAuthStore } from "../store/authStore.js";
import { useChatStore } from "../store/chatStore.js";
import { useJobStore } from "../store/jobPostStore.js";

async function logoutHelper() {
    const {
        reset_authStore,
        setIsLoggedIn,
    } = useAuthStore.getState();

    const {
        reset_jobStore
    } = useJobStore.getState();

    const { resetChatStore } = useChatStore.getState();
    resetChatStore();
    
    const response = await api.post(
        `${BACKEND_URL}auth/logout`
    );
    
    reset_authStore();
    reset_jobStore();
    setIsLoggedIn(false);
    console.log(response);
    return;
}

export { logoutHelper };