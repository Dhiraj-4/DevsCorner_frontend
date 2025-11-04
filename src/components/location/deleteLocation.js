import axios from "axios";
import { useAuthStore } from "../../store/authStore";
import { BACKEND_URL } from "../../../config/envConfig";
import { refreshToken } from "../../utils/refreshToken";

export async function deleteLocation() {
    try {
        const {
            accessToken
        } = useAuthStore.getState();

        let res = await axios.delete(
            `${BACKEND_URL}user/delete-location`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        return { status: 200, message: "location uploaded" };
    } catch (error) {
        console.log(error);
        if(error.response?.status == 403 || error.response?.status == 401) {
            let res = await refreshToken();
            if(res) return await deleteLocation();
        }
    }
}