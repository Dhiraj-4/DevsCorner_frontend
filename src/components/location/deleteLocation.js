import axios from "axios";
import { useAuthStore } from "../../store/authStore";
import { BACKEND_URL } from "../../../config/envConfig";
import { useUserStore } from "../../store/userStore";
import { refreshToken } from "../../utils/refreshToken";

export async function deleteLocation() {
    try {
        const {
            accessToken
        } = useAuthStore.getState();

        const { hydrateUser } = useUserStore.getState();

        let res = await axios.delete(
            `${BACKEND_URL}user/delete-location`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        await hydrateUser();
        return { status: 200, message: "location uploaded" };
    } catch (error) {
        console.log(error);
        if(error.response?.status == 403 || error.response?.status == 401) {
            let res = await refreshToken();
            if(res) await deleteLocation();
        }
    }
}