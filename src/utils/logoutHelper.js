import api from "../../config/axiosConfig.js";
import { BACKEND_URL } from "../../config/envConfig.js";

async function logoutHelper() {
    const response = await api.post(
        `${BACKEND_URL}auth/logout`
    );
    console.log(response);
    return;
}

export { logoutHelper };