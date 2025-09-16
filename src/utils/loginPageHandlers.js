import { useAuthStore } from "../store/authStore.js";
import api from "../../config/axiosConfig.js";
import { BACKEND_URL } from "../../config/envConfig.js";

export const validatePassword = () => {
    const {
        password,
        setError,
        clearError
    } = useAuthStore.getState();

    if (password.match(/[a-z]/g) && password.match(
                /[A-Z]/g) && password.match(
                    /[0-9]/g) && password.match(
                        /[^a-zA-Z\d]/g) && password.length >= 8)
        {
            console.log("Password validation true");
            clearError();
            return true;
        }
    else
        {
            console.log("Password validation false");
            setError({ message: "weak password" });
            return false;
        }
}

export async function loginHandler() {
    if(!validatePassword()) return false;

    const {
        password,
        identifier,
        setError,
        clearError,
        setIsLoading,
        setAccessToken,
        reset_authStore,
        setIsLoggedIn
    } = useAuthStore.getState();

    const body = {
        password,
        identifier
    }
    setIsLoading(true);
    try {
        const response = await api.post(
            `${BACKEND_URL}auth/login`,
            body
        );

        const { info } = response.data;

        if (info) {
            setAccessToken(info);
            setIsLoggedIn(true);
            console.log("Access token received");
            clearError();
            return true;
        } else {
            console.error("No accessToken info in response.");
            setError({ message: 'Access token not received.'});
            reset_authStore();
            setIsLoggedIn(false);
            return false;
        }
    } catch (error) {
        console.log(error);
        console.log(error.response.data.message);
        reset_authStore();
        if(error.response?.data?.message == "Validation failed") setError(error.response.data.message);
        else if(error.response?.data) setError(error.response.data.message);
        else setError(error.message);
        setIsLoggedIn(false);
    } finally {
        setIsLoading(false);
    }
}
