import axios from "axios";
import { usePostStore } from "../../../store/postStore.js";
import { useAuthStore } from "../../../store/authStore.js";
import { refreshToken } from "../../../utils/refreshToken.js";
import { BACKEND_URL } from "../../../../config/envConfig.js";

export async function createPostHandler() {
    const {
        text,
        setIsLoading
    } = usePostStore.getState();

    const {
        setError,
        clearError,
        accessToken
    } = useAuthStore.getState();

    try {
        setIsLoading(true);

        const response = await axios.post(
            `${BACKEND_URL}post/`,
            {
                text
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        if(response.status == 201) {
            console.log("Post created success", response);
            clearError();
            return true;
        }else {
            return false;
        }
    } catch (error) {
        console.log(error);
        if(error.response?.status == 401) {
            let res = await refreshToken();
            if (res) return await createPostHandler();
        }
        else if(error.response?.status == 400) {
            setError( error.response.data?.error?.issues[0].message || error.response.data?.error?.issues[0].code || error.response.data.message);
        }
        return false;
    }finally {
        setIsLoading(false);
    }
}