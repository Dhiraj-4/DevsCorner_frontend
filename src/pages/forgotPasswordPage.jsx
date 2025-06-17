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

export function ForgotPasswordPage() {

    const navigate = useNavigate();
    const { passwordResetToken, otpVerificationToken } = useAuthStore();
    return (
        <div className="flex justify-center items-center flex-col min-h-screen bg-zinc-950 text-white px-4 sm:px-6 md:px-8">
          <form
            action="/me"
            onSubmit={async(e) => {
            e.preventDefault();
            const functionCall = (passwordResetToken) ? (updatePassword) : (
              (otpVerificationToken) ? (resetPasswordInitiate) : (forgotPasswordHandler));

            let success = await functionCall();
            if(success) navigate('/login');
          }}
            className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl flex flex-col justify-center items-center gap-4 p-6 sm:p-8 md:p-10 bg-zinc-900 border border-zinc-800 rounded-xl shadow-[0_0_12px_#0ea5e9]"
          >
            <Error/>
            {
              (passwordResetToken) ? 
              (
                <span 
                className="w-full flex flex-col gap-1 rounded-lg bg-zinc-800 text-white placeholder-zinc-500 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-sky-500 ring-offset-2 ring-offset-zinc-900 transition duration-200"
                >
                  <NewPasswordInput/>
                  <ConfirmPasswordInput/>
                </span>
              ) : (
                <span 
                className="w-full flex flex-col gap-1 rounded-lg bg-zinc-800 text-white placeholder-zinc-500 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-sky-500 ring-offset-2 ring-offset-zinc-900 transition duration-200"
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