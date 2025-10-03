import { useAuthStore } from "../store/authStore.js";

export const validatePassword = (newPassword) => {
    const {
        setError,
        clearError
    } = useAuthStore.getState();

    if (newPassword.match(/[a-z]/g) && newPassword.match(
                /[A-Z]/g) && newPassword.match(
                    /[0-9]/g) && newPassword.match(
                        /[^a-zA-Z\d]/g) && newPassword.length >= 8)
        {
            console.log("Password validation true");
            clearError();
            return true;
        }
    else
        {
            console.log("Password validation false");
            setError("weak password");
            return false;
        }
}
export const checkPasswords = () => {

    const {
        newPassword,
        confirmPassword,
        setError,
        clearError
    } = useAuthStore.getState();
    if(
        newPassword === confirmPassword   
    ) {
        if(!validatePassword(newPassword)) return false;
        clearError();
        return true;
    } else {
        setError(`Both passwords doesn't match`);
        return false;
    }
}