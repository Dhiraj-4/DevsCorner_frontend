import { useAuthStore } from "../../store/authStore.js";
import { IsLoadingSvg } from "../loaders/isLoadingSvg.jsx";

export function ButtonText() {

    const { isLoading, otpVerificationToken, passwordResetToken } = useAuthStore();

    return(
        <>
        {isLoading ? (
          <IsLoadingSvg/>
      ) : passwordResetToken ? "Reset Password" :
          (
            otpVerificationToken ? "Submit" : "Get Otp"
          )
      }
        </>
    )
}