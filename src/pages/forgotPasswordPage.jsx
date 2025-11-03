// import { useNavigate } from "react-router-dom";
// import { Error} from "../components/errors/error.jsx";
// import { IdentifierInput } from "../components/loginInputFields/identifierInput.jsx";
// import { CoolButton } from "../components/Buttons/button.jsx";
// import { ButtonText } from "../components/Buttons/forgotPasswordText.jsx";
// import { OtpInput } from "../components/signupInputFields/otpInput.jsx";
// import { NewPasswordInput } from "../components/signupInputFields/newPasswordInput.jsx";
// import { ConfirmPasswordInput } from "../components/signupInputFields/confirmPasswordInput.jsx";
// import { useAuthStore } from "../store/authStore.js";
// import { forgotPasswordHandler, resetPasswordInitiate, updatePassword } from "../utils/forgotPasswordHandler.js";
// import { ForgotPasswordHeader } from "../components/headers/forgotPasswordPageHeader.jsx";

// export function ForgotPasswordPage() {

//     const navigate = useNavigate();
//     const { passwordResetToken, otpVerificationToken } = useAuthStore();
//     return (
//         <div className="primary-bg">
//           <ForgotPasswordHeader/>
//           <form
//             action="/me"
//             onSubmit={async(e) => {
//             e.preventDefault();
//             const functionCall = (passwordResetToken) ? (updatePassword) : (
//               (otpVerificationToken) ? (resetPasswordInitiate) : (forgotPasswordHandler));

//             let success = await functionCall();
//             if(success) navigate('/login');
//           }}
//             className="primary-form"
//           >
//             <Error/>
//             {
//               (passwordResetToken) ? 
//               (
//                 <span 
//                 className="w-full flex flex-col gap-2"
//                 >
//                   <NewPasswordInput/>
//                   <ConfirmPasswordInput/>
//                 </span>
//               ) : (
//                 <span 
//                 className="w-full flex flex-col gap-2 "
//                 >
//                   <IdentifierInput/>
//                   <OtpInput/>
//                 </span>
//               )
//             }
            
//             <CoolButton text={<ButtonText/>}/>

//           <a href="/login" className="text-white font-bold text-sm sm:text-base mt-2">
//           Already have an account?{" "}
//           <li className="inline text-blue-500 font-bold hover:underline">Login</li>
//         </a>
//           </form>
//         </div>
//     )
// }

import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../theme-provider.jsx";
import { motion } from "framer-motion";
import { Error } from "../components/errors/error.jsx";
import { IdentifierInput } from "../components/loginInputFields/identifierInput.jsx";
import { CoolButton } from "../components/Buttons/button.jsx"; // untouched
import { ButtonText } from "../components/Buttons/forgotPasswordText.jsx";
import { OtpInput } from "../components/signupInputFields/otpInput.jsx";
import { NewPasswordInput } from "../components/signupInputFields/newPasswordInput.jsx";
import { ConfirmPasswordInput } from "../components/signupInputFields/confirmPasswordInput.jsx";
import { useAuthStore } from "../store/authStore.js";
import {
  forgotPasswordHandler,
  resetPasswordInitiate,
  updatePassword,
} from "../utils/forgotPasswordHandler.js";
import { ForgotPasswordHeader } from "../components/headers/forgotPasswordPageHeader.jsx";
import { IsLoadingSvg } from "../components/loaders/isLoadingSvg.jsx";

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { passwordResetToken, otpVerificationToken, isLoading } = useAuthStore();
  const { theme } = useTheme();

  const isDark = theme === "dark";
  const containerBg = isDark ? "bg-zinc-900/60 backdrop-blur-sm" : "bg-white/80";
  const containerBorder = isDark ? "border-zinc-800" : "border-zinc-200";
  const pageBg = isDark ? "bg-zinc-950 text-zinc-100" : "bg-zinc-50 text-zinc-900";

  if (isLoading) {
    return (
      <div className={`${pageBg} min-h-screen flex items-center justify-center`}>
        <IsLoadingSvg />
      </div>
    );
  }

  return (
    <div className={`${pageBg} min-h-screen flex items-center justify-center py-12 px-4 transition-colors duration-300`}>
      <main className="w-full max-w-3xl">
        <div className="mx-auto">
          {/* Header */}
          <div className="flex justify-center">
            <ForgotPasswordHeader />
          </div>

          {/* Centered Card */}
          <div
            className={`mx-auto mt-6 rounded-2xl p-6 sm:p-8 shadow-lg border ${containerBorder} ${containerBg} max-w-md`}
            style={{ backdropFilter: "saturate(130%) blur(8px)" }}
          >
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const functionCall = passwordResetToken
                  ? updatePassword
                  : otpVerificationToken
                  ? resetPasswordInitiate
                  : forgotPasswordHandler;

                const success = await functionCall();
                if (success) navigate("/login");
              }}
              className="flex flex-col gap-4"
            >
              <Error />

              {passwordResetToken ? (
                <div className="flex flex-col gap-3">
                  <NewPasswordInput />
                  <ConfirmPasswordInput />
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <IdentifierInput />
                  <OtpInput />
                </div>
              )}

              <CoolButton text={<ButtonText />} />

              <div className="mt-2 text-center text-sm">
                <span className={isDark ? "text-zinc-400" : "text-zinc-600"}>
                  Remembered your password?{" "}
                </span>
                <Link
                  to="/login"
                  className="text-blue-500 font-semibold hover:underline"
                >
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}