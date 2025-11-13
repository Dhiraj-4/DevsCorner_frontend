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
        salary,
        location,
        locationType,
        experience,
        setIsLoading
    } = useJobStore.getState();

    const {
        setError,
        clearError,
        accessToken
    } = useAuthStore.getState();

    try {
        setIsLoading(true);

        const body = {
            text,
            role,
            location,
            locationType
        }

        if(applyLink) body.applyLink = applyLink;
        if(companyName) body.companyName = companyName;
        if(salary) body.salary = salary;
        if(experience) body.experience = parseInt(experience);

        console.log(body);
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
            return true;
        }else {
            return false;
        }
    } catch (error) {
        console.log(error);
        if(error.response?.status == 401) {
            let res = await refreshToken();
            if (res) return await createJobHandler();
        }
        else if(error.response?.status == 400) {
            setError( error.response.data?.error?.issues[0].message || error.response.data?.error?.issues[0].code || error.response.data.message);
        }
        return false;
    }finally {
        setIsLoading(false);
    }
}