import { useAuthStore } from "../../store/authStore.js";
import { IsLoadingSvg } from "../loaders/isLoadingSvg.jsx";

export function ButtonText() {

    const { isLoading, otpVerificationToken } = useAuthStore();

    return(
        <>
        {isLoading ? (
        <IsLoadingSvg/>
      ) : (
        otpVerificationToken ? "Sign-up" : "Get Otp"
      )}
        </>
    )
}