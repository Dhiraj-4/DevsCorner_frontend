import axios from "axios";
import { checkPasswords } from "./checkFieldsHelper.js"
import { useAuthStore } from "../store/authStore.js";
import { BACKEND_URL } from "../../config/envConfig.js";

export const getOtpHandler = async() => {
    if(!checkPasswords()) return;
    const {
        fullName,
        userName,
        email,
        newPassword,
        setOtpVerificationToken,
        setIsLoading,
        setError,
        clearError,
        reset_authStore,
        setOtp
    } = useAuthStore.getState();
    setOtp('');
    setOtpVerificationToken('');

    setIsLoading(true);
    const body = {
        fullName,
        userName,
        email,
        password: newPassword
    }
    try {
        const response = await axios.post(
            `${BACKEND_URL}auth/signup/initiate`,
            body
        );

        console.log(response);
        const { info } = response.data;

        if (info) {
          setOtpVerificationToken(info);
          console.log("OTP token received");
          clearError();
        } else {
            console.error("No OTP info in response.");
            setError('OTP token not received. try again');
            setTimeout(()=> {
                reset_authStore();
            },2000)
        }
    } catch (error) {
        console.log(error);

        if (error.response?.status === 400) {
            const issue = error.response.data?.error?.issues?.[0];
            const path = issue?.path?.[0];
            const rawMsg = issue?.message;
                
            let clean = rawMsg;
            if (rawMsg && rawMsg.startsWith("String")) {
                clean = rawMsg.slice("String".length).trim();
            }
        
            let errStr = "";
            if (path) {
                errStr = `${path} ${clean}`;
            } else if (clean) {
                errStr = clean;
            }
        
            setError(errStr || error.response?.data?.message || "Bad Request");
        }
        
        else if (error.response?.status === 429) {
            setError("Too Many Requests 😮");
        }
        
        else if (error.response?.status === 409) {
            setError(error.response?.data?.message);
        }
        
        else {
            setError("something went wrong 🥺");
        }

    } finally {
        setIsLoading(false);
    }
}

export const submitHandler = async() => {

    const {
        otp,
        otpVerificationToken,
        setIsLoading,
        clearError,
        setError,
        reset_authStore
    } = useAuthStore.getState();

    const body = {
        otp
    }
    setIsLoading(true);
    try {
        const response = await axios.post(
            `${BACKEND_URL}auth/signup/verify`,
            body,
            {
                headers: {
                    'authorization':  `Bearer ${otpVerificationToken}`
                }
            }
        );

        console.log(response.data);
        clearError();
        reset_authStore();
        return true;
    } catch(error) {
        console.log(error);
        reset_authStore();
        if(error.status == 429) {
            setError(error.response?.data);
        }
        else if(error.response?.data?.message == "Validation failed") setError(error.response.data.message);
        else if(error.response?.data) setError(error.response.data.message);
        else setError(error.message);
    } finally {
        setIsLoading(false);
    }
}