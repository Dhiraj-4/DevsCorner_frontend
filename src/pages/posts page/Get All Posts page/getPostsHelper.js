import axios from "axios";
import { usePostStore } from "../../../store/postStore.js";
import { useAuthStore } from "../../../store/authStore.js";
import { BACKEND_URL } from "../../../../config/envConfig.js";
import { refreshToken } from "../../../utils/refreshToken.js";

export async function getPostsHandler() {
    const {
        accessToken
    } = useAuthStore.getState();

    const {
        setPosts,
        pageNumber,
        setHasMore,
        reset_postStore,
        setIsLoading
    } = usePostStore.getState();
    try {
        setIsLoading(true);

        const response = await axios.get(
            `${BACKEND_URL}post?page=${pageNumber}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        if(response.status == 200) {
            console.log(response);
            if(pageNumber == 1) reset_postStore();
            setPosts(response.data.info[0]);
            setHasMore(response.data.info[1]);
        }
    } catch (error) {
        console.log(error);
        if(error.response?.status == 401) {
            let res = await refreshToken();
            if(res) getPostsHandler();
        }
    } finally {
        setIsLoading(false);
    }
}