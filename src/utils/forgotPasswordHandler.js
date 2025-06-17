import axios from "axios";
import { useAuthStore } from "../store/authStore"
import { checkPasswords } from "./checkFieldsHelper.js";

export const forgotPasswordHandler = async() => {

    const {
        identifier,
        setIsLoading,
        setOtpVerificationToken,
        setOtp,
        reset_authStore,
        setError,
        clearError
    } = useAuthStore.getState();

    if(!identifier) return;

    const body = { identifier };

    setIsLoading(true);
    setOtp('');
    setOtpVerificationToken('');
    try {
        const response = await axios.post(
            'http://localhost:8080/api/auth/forgot-password',
            body
        );

        const { info } = response.data;

        if (info) {
          setOtpVerificationToken(info);
          console.log("OTP token received");
          clearError();
          return false;
        } else {
            console.error("No OTP info in response.");
            setError({ message: 'OTP token not received. try again'});
            setTimeout(()=> {
                reset_authStore();
            },2000)
            return false;
        }
    } catch (error) {
        console.log(error, 'here is the error');
        if(error.response?.data.message == "Validation failed") {
            console.log(error.response.data.error);
            setError(error.response.data.error);
        }
        else if(error.response?.data) setError(error.response.data);
        else setError(error.message);
    } finally {
        setIsLoading(false);
    }
}

export const resetPasswordInitiate = async() => {
    const {
        otp,
        setOtp,
        otpVerificationToken,
        setOtpVerificationToken,
        setIsLoading,
        clearError,
        setError,
        reset_authStore,
        setPasswordResetToken
    } = useAuthStore.getState();

    const body = {
        otp
    }
    setIsLoading(true);
    try {
        const response = await axios.post(
            'http://localhost:8080/api/auth/reset-password/initiate',
            body,
            {
                headers: {
                    'authorization':  `Bearer ${otpVerificationToken}`
                }
            }
        );

        const { info } = response.data;

        if (info) {
          setPasswordResetToken(info);
          console.log("Password reset token received");
          clearError();
          return false;
        } else {
            console.error("No password reset token info in response.");
            setError({ message: 'Reset token not received. try again'});
            setTimeout(()=> {
                reset_authStore();
            },2000);
            return false;
        }
    } catch(error) {
        console.log(error);
        if(error.response?.data.message == "Validation failed") {
            console.log(error.resonse?.data.error);
            setError(error.response.data.error);
        }
        else if(error.response?.data) setError(error.response.data);
        else setError(error.message);
    } finally {
        setOtpVerificationToken('');
        setOtp('');
        setIsLoading(false);
    }
}

export const updatePassword = async() => {
    const {
        passwordResetToken,
        newPassword,
        setError,
        reset_authStore,
        clearError,
        setIsLoading
    } = useAuthStore.getState();

    if(!checkPasswords()) return;

    const body = {
        password: newPassword
    }
    setIsLoading(true);

    try {
        const response = await axios.post(
            'http://localhost:8080/api/auth/update-password',
            body,
            {
                headers: {
                    'authorization':  `Bearer ${passwordResetToken}`
                }
            }
        );

        if(response.data.message == "password updated") {
            console.log(response.data.message);
            clearError();
            reset_authStore();
            return true;
        } else {
            setError({ message: "Something went wrong, try again"});
            setTimeout(() => {
                reset_authStore();
            },2000);
            return false;
        }
    } catch (error) {
        console.log(error);
        if(error.response?.data.message == "Validation failed") setError(error.response.data.error);
        else if(error.response?.data) setError(error.response.data);
        else setError(error.message);
    } finally {
        setIsLoading(false);
    }
}