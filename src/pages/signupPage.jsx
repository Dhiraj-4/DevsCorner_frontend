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
import { GoogleAuth } from "../components/googleAuth/googleLogin.jsx";

export function SignupPage() {

  const { otpVerificationToken } = useAuthStore();
  const navigate = useNavigate();
  
  return (
    <>
    <div className="primary-bg">
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
        className="primary-form"
      >
        <Error/>
        <FullNameInput />
        <UserNameInput />
        <EmailInput />
        <NewPasswordInput />
        <ConfirmPasswordInput />
        <OtpInput />
        <CoolButton text={<ButtonText/>}/>

        <a href="/login" className="text-white font-bold text-sm sm:text-base mt-2">
          Already have an account?{" "}
          <li className="inline text-blue-500 font-bold hover:underline">Login</li>
        </a>

        <div className="flex text-white">
            or 
          </div>

        <GoogleAuth/>
      </form>
    </div>
    </>
  );
}