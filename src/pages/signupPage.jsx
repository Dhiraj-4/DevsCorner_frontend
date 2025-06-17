import { FullNameInput } from "../components/signupInputFields/fullNameInput.jsx";
import { UserNameInput } from "../components/signupInputFields/userNameInput.jsx";
import { EmailInput } from "../components/signupInputFields/emailInput.jsx";
import { NewPasswordInput } from "../components/signupInputFields/newPasswordInput.jsx";
import { ConfirmPasswordInput } from "../components/signupInputFields/confirmPasswordInput.jsx";
import { OtpInput } from "../components/signupInputFields/otpInput.jsx";
import { CoolButton } from "../components/Buttons/button.jsx";
import { getOtpHandler, submitHandler } from "../utils/signupPageHandlers.js";
import { ButtonText } from "../components/Buttons/signupButtonText.jsx";
import { useNavigate } from "react-router-dom";
import { SignupHeader } from "../components/headers/signupPageHeader.jsx";
import { useAuthStore } from "../store/authStore.js";
import { Error } from "../components/errors/error.jsx";

export function SignupPage() {

  const { otpVerificationToken } = useAuthStore();
  const navigate = useNavigate();
  
  return (
    <>
    <div className="flex justify-center items-center flex-col min-h-screen bg-zinc-950 text-white px-4 sm:px-6 md:px-8">
    <SignupHeader/>
      <form
        action="/login"
        onSubmit={async(e) => {
        e.preventDefault();
        const functionCall = (otpVerificationToken) ? submitHandler : getOtpHandler;
        const success = await functionCall();
        if(success) {
          navigate('/login');
        }
      }}
        className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl flex flex-col justify-center items-center gap-4 p-6 sm:p-8 md:p-10 bg-zinc-900 border border-zinc-800 rounded-xl shadow-[0_0_12px_#0ea5e9]"
      >
        <Error/>
        <FullNameInput />
        <UserNameInput />
        <EmailInput />
        <NewPasswordInput />
        <ConfirmPasswordInput />
        <OtpInput />
        <CoolButton text={<ButtonText/>}/>

        <a href="/login" className="text-sm sm:text-base mt-2">
          Already have an account?{" "}
          <li className="inline text-blue-500 font-bold hover:underline">Login</li>
        </a>
      </form>
    </div>
    </>
  );
}