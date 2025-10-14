import axios from "axios";
import { useAuthStore } from "../../../store/authStore.js";
import { useJobStore } from "../../../store/jobPostStore.js";
import { BACKEND_URL } from "../../../../config/envConfig.js";
import { refreshToken } from "../../../utils/refreshToken.js";

export async function getAllJobsHandler() {
    const {
        accessToken
    } = useAuthStore.getState();

    const {
        pageNumber,
        setHasMore,
        setAllJobs
    } = useJobStore.getState();
    try {
        const response = await axios.get(
            `${BACKEND_URL}job?page=${pageNumber}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );
        if(response.status == 200) {
            console.log(response);
            setAllJobs(response.data.info[0]);
            setHasMore(response.data.info[1]);
        }
    } catch (error) {
        console.log(error);
        if(error.response?.status == 403 || error.response?.status == 401) {
            let res = await refreshToken();
            if(res) getAllJobsHandler();
        }
    }
}