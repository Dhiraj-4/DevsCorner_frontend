import axios from "axios";
import { useAuthStore } from "../store/authStore.js";
import { useLoginStore } from "../store/loginStore.js";
import api from "../../config/axiosConfig.js";

export const validatePassword = () => {
    const {
        password,
        setError,
        clearError
    } = useLoginStore.getState();

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
        setIsLoading
    } = useLoginStore.getState();

    const {
        setAccessToken
    } = useAuthStore.getState();

    const body = {
        password,
        identifier
    }
    setIsLoading(true);
    try {
        const response = await api.post(
            'http://localhost:8080/api/auth/login',
            body
        );

        const { info } = response.data;

        if (info) {
            setAccessToken(info);
            console.log("Access token received");
            clearError();
            return true;
        } else {
            console.error("No accessToken info in response.");
            setError({ message: 'Access token not received.'});
            setTimeout(()=> {
                reset_signup();
            },2000)
            return false;
        }
    } catch (error) {
        console.log(error);
        if(error.response?.data) {setError(error.response.data);}
        else setError(error.message);
    } finally {
        setIsLoading(false);
    }
}

export async function refreshToken() {
    try {
        const response = await api.post(
            'http:localhost:8080/api/auth/refresh'
        );

        console.log(response.data);
    } catch (error) {
        console.log("failed: ", error.response);
    }
}
