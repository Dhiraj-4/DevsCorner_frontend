import axios from "axios";
import { useAuthStore } from "../store/authStore.js"
import { checkPasswords } from "./checkFieldsHelper.js";
import { BACKEND_URL } from "../../config/envConfig.js";

export const forgotPasswordHandler = async() => {

    const {
        identifier,
        setIsLoading,
        setOtpVerificationToken,
        setOtp,
        reset_authStore,
        setError,
        clearError,
        setIsLoggedIn
    } = useAuthStore.getState();

    if(!identifier) return;

    const body = { identifier };

    setIsLoading(true);
    setOtp('');
    setOtpVerificationToken('');
    try {
        const response = await axios.post(
            `${BACKEND_URL}auth/forgot-password`,
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
            reset_authStore();
            setIsLoggedIn(false);
            return false;
        }
    } catch (error) {
        console.log(error);
        console.log(error.response.data.message);
        reset_authStore();

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

        setIsLoggedIn(false);
    } finally {
        setIsLoading(false);
    }
}

export const resetPasswordInitiate = async() => {
    const {
        otp,
        otpVerificationToken,
        setIsLoading,
        clearError,
        setError,
        reset_authStore,
        setPasswordResetToken,
        setIsLoggedIn
    } = useAuthStore.getState();

    const body = {
        otp
    }
    setIsLoading(true);
    try {
        const response = await axios.post(
            `${BACKEND_URL}auth/reset-password/initiate`,
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
            reset_authStore();
            setIsLoggedIn(false);
            return false;
        }
    } catch (error) {
        console.log(error);
        console.log(error.response.data.message);
        reset_authStore();
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
        setIsLoggedIn(false);
    } finally {
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
        setIsLoading,
        setIsLoggedIn
    } = useAuthStore.getState();

    if(!checkPasswords()) return;

    const body = {
        password: newPassword
    }
    setIsLoading(true);

    try {
        const response = await axios.post(
            `${BACKEND_URL}auth/update-password`,
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
                reset_authStore();
            setIsLoggedIn(false);
            return false;
        }
    } catch (error) {
        console.log(error);
        console.log(error.response.data.message);
        reset_authStore();
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
        setIsLoggedIn(false);
    } finally {
        setIsLoading(false);
    }
}