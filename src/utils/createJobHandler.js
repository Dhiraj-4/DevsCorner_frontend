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
        companyName,
        resetJobStore
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
            resetJobStore();
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
            setError(error.response.data.message);
        }
        return false;
    }finally {
        setIsLoading(false);
    }
}