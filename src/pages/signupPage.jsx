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
import { Input } from "../components/Inputs/input.jsx";

export function SignupPage() {

  const { 
    otpVerificationToken, 

    userName, 
    setUserName,

    email,
    setEmail,

    fullName,
    setFullName

  } = useAuthStore();
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
        {/* Full Name */}
        <Input 
          type={"text"} 
          name={"fullName"} 
          minLength={3} 
          placeholder={"Full Name"}
          value={fullName}
          set={setFullName}
          autoComplete={"fullName"}
        />

        {/* User Name */}
        <Input 
          type={"text"} 
          name={"userName"} 
          minLength={3} 
          placeholder={"User Name"}
          value={userName}
          set={setUserName}
          autoComplete={"userName"}
        />

        {/* Email */}
        <Input 
          type={"email"} 
          name={"email"} 
          minLength={0} 
          placeholder={"Email"}
          value={email}
          set={setEmail}
          autoComplete={"email"}
        />
        
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