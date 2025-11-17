import axios from "axios"
import { BACKEND_URL } from "../../config/envConfig.js"
import { useAuthStore } from "../store/authStore.js"
import { refreshToken } from "./refreshToken.js";

export const deleteNotif = async(id) => {
    try {
        const { accessToken } = useAuthStore.getState();
        await axios.delete(
            `${BACKEND_URL}notification/delete`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                data: {
                    id
                }
            }
        );

        console.log("Notification deleted");
    } catch (error) {
        console.log("Error in notification deletion: ", error);

        if(error.response?.status == 401) {
            let x = await refreshToken();
            if(x) await deleteNotif(id);
        }
    }
}