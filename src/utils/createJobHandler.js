import axios from "axios";
import { useJobStore } from "../store/jobPostStore.js";
import { refreshToken } from "./refreshToken.js";
import { useAuthStore } from "../store/authStore.js";
import { BACKEND_URL } from "../../config/envConfig.js";

export async function createJobHandler() {
    const {
        text,
        role,
        applyLink,
<<<<<<< HEAD
        companyName,
        resetJobStore
=======
        companyName
>>>>>>> d724ff7 (whole basic job's CRUD flow is done, today added udpate to applyLink and description and delete button to delete job)
    } = useJobStore.getState();

    const {
        setError,
        clearError,
        setIsLoading,
        accessToken
    } = useAuthStore.getState();

    try {
        setIsLoading(true);

        const body = {
            text,
            role
        }

        if(applyLink) body.applyLink = applyLink;
        if(companyName) body.companyName = companyName;

        const response = await axios.post(
            `${BACKEND_URL}job/post`,
            body,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        if(response.status == 201) {
            console.log("job created success", response);
            clearError();
<<<<<<< HEAD
            resetJobStore();
=======
>>>>>>> d724ff7 (whole basic job's CRUD flow is done, today added udpate to applyLink and description and delete button to delete job)
            return true;
        }else {
            return false;
        }
    } catch (error) {
        console.log(error);
        if(error.response?.status == 403 || error.response?.status == 401) {
            let res = refreshToken();
            if (res) createJobHandler();
        }
        else if(error.response?.status == 400) {
<<<<<<< HEAD
            setError(error.response.data.message);
=======
            setError( error.response.data?.error?.issues[0].code || error.response.data.message);
>>>>>>> d724ff7 (whole basic job's CRUD flow is done, today added udpate to applyLink and description and delete button to delete job)
        }
        return false;
    }finally {
        setIsLoading(false);
    }
}