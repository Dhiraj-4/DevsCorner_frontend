import axios from "axios";
import { checkPasswords } from "./checkFieldsHelper.js"
import { useAuthStore } from "../store/authStore.js";

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
            'http://localhost:8080/api/auth/signup/initiate',
            body
        );

        const { info } = response.data;

        if (info) {
          setOtpVerificationToken(info);
          console.log("OTP token received");
          clearError();
        } else {
            console.error("No OTP info in response.");
            setError({ message: 'OTP token not received. try again'});
            setTimeout(()=> {
                reset_authStore();
            },2000)
        }
    } catch (error) {
        console.log(error);
        if(error.response?.data.message == "Validation failed") setError(error.response.data.error)
        else if(error.response?.data) setError(error.response.data);
        else setError(error.message);
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
            'http://localhost:8080/api/auth/signup/verify',
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
        if(error.response?.data.message == "Validation failed") setError(error.response.data.error);
        else if(error.response?.data) setError(error.response.data);
        else setError(error.message);
    } finally {
        setIsLoading(false);
    }
}