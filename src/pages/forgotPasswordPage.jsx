import { useNavigate } from "react-router-dom";
import { Error} from "../components/errors/error.jsx";
import { IdentifierInput } from "../components/loginInputFields/identifierInput.jsx";
import { CoolButton } from "../components/Buttons/button.jsx";
import { ButtonText } from "../components/Buttons/forgotPasswordText.jsx";
import { OtpInput } from "../components/signupInputFields/otpInput.jsx";
import { NewPasswordInput } from "../components/signupInputFields/newPasswordInput.jsx";
import { ConfirmPasswordInput } from "../components/signupInputFields/confirmPasswordInput.jsx";
import { useAuthStore } from "../store/authStore.js";
import { forgotPasswordHandler, resetPasswordInitiate, updatePassword } from "../utils/forgotPasswordHandler.js";
import { ForgotPasswordHeader } from "../components/headers/forgotPasswordPageHeader.jsx";

export function ForgotPasswordPage() {

    const navigate = useNavigate();
    const { passwordResetToken, otpVerificationToken } = useAuthStore();
    return (
        <div className="primary-bg">
          <ForgotPasswordHeader/>
          <form
            action="/me"
            onSubmit={async(e) => {
            e.preventDefault();
            const functionCall = (passwordResetToken) ? (updatePassword) : (
              (otpVerificationToken) ? (resetPasswordInitiate) : (forgotPasswordHandler));

            let success = await functionCall();
            if(success) navigate('/login');
          }}
            className="primary-form"
          >
            <Error/>
            {
              (passwordResetToken) ? 
              (
                <span 
                className="w-full flex flex-col gap-2"
                >
                  <NewPasswordInput/>
                  <ConfirmPasswordInput/>
                </span>
              ) : (
                <span 
                className="w-full flex flex-col gap-2 "
                >
                  <IdentifierInput/>
                  <OtpInput/>
                </span>
              )
            }
            
            <CoolButton text={<ButtonText/>}/>

          </form>
        </div>
    )
}