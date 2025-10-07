import axios from "axios";
import { useAuthStore } from "../../../../store/authStore";
import { BACKEND_URL } from "../../../../../config/envConfig";
import { refreshToken } from "../../../../utils/refreshToken";
import { useJobStore } from "../../../../store/jobPostStore";

export async function deleteJob(jobId, refresh) {
    try {
        const { accessToken } = useAuthStore.getState();

        const { reset_jobStore } = useJobStore.getState();

        await axios.delete(
            `${BACKEND_URL}job/delete`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                data: { jobId }
            }
        );

        reset_jobStore();
        refresh();
        return { status: 200 }

    } catch (error) {
        console.log(error);
        if(error.response?.status == 403 || error.response?.status == 401) {
            let res = refreshToken();
            if (res) return deleteJob(jobId);
        }else if(error.response?.status == 400) {
            return {
                status: 400,
                message: (error.response.data.error.issues[0]?.message || error.response.data.error.issues[0]?.code)
            }
        }else {
            return { status: 500 }
        }
    }
}