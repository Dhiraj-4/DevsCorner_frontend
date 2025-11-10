import axios from "axios";
import { useAuthStore } from "../../../../store/authStore";
import { BACKEND_URL } from "../../../../../config/envConfig";
import { refreshToken } from "../../../../utils/refreshToken";

export async function uploadCompanyName(company, jobId) {
    try {
        const { accessToken } = useAuthStore.getState();

        await axios.patch(
            `${BACKEND_URL}job/update-companyName`,
            {
                companyName: company,
                jobId
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        return { status: 200, company }
    } catch (error) {
        console.log(error);
        if(error.response?.status == 401) {
            let res = await refreshToken();
            if (res) return await uploadCompanyName(company, jobId);
        }else if(error.response?.status == 400) {
            return {
                status: 400,
                message: error.response.data.message ||error.response.data.error.issues[0].message || error.response.data.error.issues[0].code
            }
        }else {
            return { status: 500 }
        }
    }
}