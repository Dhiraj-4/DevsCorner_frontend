import axios from "axios";
import { BACKEND_URL } from "../../../config/envConfig";
import { useAuthStore } from "../../store/authStore";
import { refreshToken } from "../../utils/refreshToken";
import { useJobStore } from "../../store/jobPostStore";

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
        if(error.response?.status == 403 || error.response?.status == 401) {
            let res = await refreshToken();
            if(res) getMyJobsHandler();
        }
    }
}