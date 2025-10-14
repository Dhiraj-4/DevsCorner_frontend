import axios from "axios";
import { useAuthStore } from "../../../../store/authStore";
import { BACKEND_URL } from "../../../../../config/envConfig";
import { refreshToken } from "../../../../utils/refreshToken";

export async function deleteJob(jobId) {
    try {
        const { accessToken } = useAuthStore.getState();

        await axios.delete(
            `${BACKEND_URL}job/delete`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                data: { jobId }
            }
        );

        let job = document.getElementById(jobId);
        console.log("removed a job");
        if(job) job.remove();

        return { status: 200 }

    } catch (error) {
        console.log(error);
        if(error.response?.status == 401) {
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