import axios from "axios";
import { BACKEND_URL } from "../../../../config/envConfig.js";
import { useAuthStore } from "../../../store/authStore.js";
import { refreshToken } from "../../../utils/refreshToken.js";
import { useJobStore } from "../../../store/jobPostStore.js";

export async function getMyJobsHandler() {
    const {
        accessToken
    } = useAuthStore.getState();

    const {
        pageNumber,
        setHasMore,
        setMyJobs
    } = useJobStore.getState();
    try {
        const response = await axios.get(
            `${BACKEND_URL}job/my-jobs?page=${pageNumber}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );  
        if(response.status == 200) {
            console.log(response);
            setMyJobs(response.data.info[0]);
            setHasMore(response.data.info[1]);
            
        }
    } catch (error) {
        console.log(error);
        if(error.response?.status == 401) {
            let res = await refreshToken();
            if(res) getMyJobsHandler();
        }
    }
}