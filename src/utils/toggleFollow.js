import axios from "axios";
import { refreshToken } from "./refreshToken.js";
import { useAuthStore } from "../store/authStore.js";
import { BACKEND_URL } from "../../config/envConfig.js";
import { useUserStore } from "../store/userStore.js";

export async function toggleFollow(otherUserName) {

    const {
        accessToken
    } = useAuthStore.getState();

    const {
        hydrateUser
    } = useUserStore.getState();

    try {
        const response = await axios.patch(
            `${BACKEND_URL}user/toggle-follow`,
            {
                otherUserName
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        if(response.status == 200) {
            console.log("toggled success", response);
            await hydrateUser();
            return {status: 200, isFollowing: (response.data.message === "Followed")}
        }
    } catch (error) {
        console.log(error);
        if(error.response?.status == 403 || error.response?.status == 401) {
            let res = refreshToken();
            if (res) return toggleFollow(otherUserName);
        }
        else if(error.response?.status == 400) {
            return {
                message: error.response.data.message,
                status: 400
            }
        }else {
            return {
                message: "Something went wrong",
                status: 500
            }
        }
    }
}