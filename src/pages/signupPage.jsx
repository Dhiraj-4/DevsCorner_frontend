// import { Link, useNavigate } from "react-router-dom";
// import { useTheme } from "../theme-provider.jsx";
// import { CoolButton } from "../components/Buttons/button.jsx"; // untouched
// import { ButtonText } from "../components/Buttons/signupButtonText.jsx";
// import { SignupHeader } from "../components/headers/signupPageHeader.jsx";
// import { Error } from "../components/errors/error.jsx";
// import { Input } from "../components/Inputs/input.jsx";
// import { NewPasswordInput } from "../components/signupInputFields/newPasswordInput.jsx";
// import { ConfirmPasswordInput } from "../components/signupInputFields/confirmPasswordInput.jsx";
// import { OtpInput } from "../components/signupInputFields/otpInput.jsx";
// import { GoogleAuth } from "../components/googleAuth/googleLogin.jsx"; // untouched
// import { getOtpHandler, submitHandler } from "../utils/signupPageHandlers.js";
// import { useAuthStore } from "../store/authStore.js";
// import { IsLoadingSvg } from "../components/loaders/isLoadingSvg.jsx";

// export function SignupPage() {
//   const {
//     otpVerificationToken,
//     userName,
//     setUserName,
//     email,
//     setEmail,
//     fullName,
//     setFullName,
//     isLoading
//   } = useAuthStore();
//   const navigate = useNavigate();
//   const { theme } = useTheme();

//   const isDark = theme === "dark";
//   const containerBg = isDark ? "bg-zinc-900/60 backdrop-blur-sm" : "bg-white/80";
//   const containerBorder = isDark ? "border-zinc-800" : "border-zinc-200";
//   const pageBg = isDark ? "bg-zinc-950 text-zinc-100" : "bg-zinc-50 text-zinc-900";
  
//   if (isLoading) {
//     return (
//       <div className={`${pageBg} min-h-screen flex items-center justify-center`}>
//         <IsLoadingSvg />
//       </div>
//     );
//   }
//   return (
//     <div className={`${pageBg} min-h-screen flex items-center justify-center py-12 px-4`}>
//       <main className="w-full max-w-3xl">
//         <div className="mx-auto">
//           {/* Header */}
//           <div className="flex justify-center">
//             <SignupHeader />
//           </div>

//           {/* Centered card */}
//           <div
//             className={`mx-auto mt-6 rounded-2xl p-6 sm:p-8 shadow-lg border ${containerBorder} ${containerBg} max-w-md`}
//             style={{ backdropFilter: "saturate(130%) blur(8px)" }}
//           >
//             <form
//               action="/login"
//               onSubmit={async (e) => {
//                 e.preventDefault();
//                 const functionCall = otpVerificationToken ? submitHandler : getOtpHandler;
//                 const success = await functionCall();
//                 if (success) navigate("/login");
//               }}
//               className="flex flex-col gap-4"
//             >
//               <Error />

//               <Input
//                 type="text"
//                 name="fullName"
//                 minLength={3}
//                 placeholder="Full Name"
//                 value={fullName}
//                 set={setFullName}
//                 autoComplete="name"
//               />

//               <Input
//                 type="text"
//                 name="userName"
//                 minLength={3}
//                 placeholder="Username"
//                 value={userName}
//                 set={setUserName}
//                 autoComplete="username"
//               />

//               <Input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={email}
//                 set={setEmail}
//                 autoComplete="email"
//               />

//               <NewPasswordInput />
//               <ConfirmPasswordInput />
//               <OtpInput />

//               <CoolButton text={<ButtonText />} />

//               <div className="mt-2 text-center text-sm">
//                 <span className={isDark ? "text-zinc-400" : "text-zinc-600"}>
//                   Already have an account?{" "}
//                 </span>
//                 <Link
//                   to="/login"
//                   className="text-blue-500 font-semibold hover:underline"
//                 >
//                   Login
//                 </Link>
//               </div>

//               <div
//                 className={`flex justify-center items-center mt-3 text-sm ${
//                   isDark ? "text-zinc-400" : "text-zinc-600"
//                 }`}
//               >
//                 <span className="mx-2">or</span>
//               </div>

//               <GoogleAuth />
//             </form>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// src/pages/auth/SignupPage.jsx
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../theme-provider.jsx";
import { CoolButton } from "../components/Buttons/button.jsx"; // untouched
import { ButtonText } from "../components/Buttons/signupButtonText.jsx";
import { SignupHeader } from "../components/headers/signupPageHeader.jsx";
import { Error } from "../components/errors/error.jsx";
import { Input } from "../components/Inputs/input.jsx";
import { NewPasswordInput } from "../components/signupInputFields/newPasswordInput.jsx";
import { ConfirmPasswordInput } from "../components/signupInputFields/confirmPasswordInput.jsx";
import { OtpInput } from "../components/signupInputFields/otpInput.jsx";
import { GoogleAuth } from "../components/googleAuth/googleLogin.jsx"; // untouched
import { getOtpHandler, submitHandler } from "../utils/signupPageHandlers.js";
import { useAuthStore } from "../store/authStore.js";
import { IsLoadingSvg } from "../components/loaders/isLoadingSvg.jsx";

export function SignupPage() {
  const {
    otpVerificationToken,
    userName,
    setUserName,
    email,
    setEmail,
    fullName,
    setFullName,
    isLoading,
  } = useAuthStore();

  const navigate = useNavigate();
  const { activeTheme } = useTheme(); // ✅ use activeTheme instead of theme
  const isDark = activeTheme === "dark";

  // ✅ Theme-aware styles
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
    <div
      className={`${pageBg} min-h-screen flex items-center justify-center py-12 px-4 transition-colors duration-500`}
    >
      <main className="w-full max-w-3xl">
        <div className="mx-auto">
          {/* Header */}
          <div className="flex justify-center">
            <SignupHeader />
          </div>

          {/* Centered card */}
          <div
            className={`mx-auto mt-6 rounded-2xl p-6 sm:p-8 shadow-lg border ${containerBorder} ${containerBg} max-w-md transition-colors duration-500`}
            style={{ backdropFilter: "saturate(130%) blur(8px)" }}
          >
            <form
              action="/login"
              onSubmit={async (e) => {
                e.preventDefault();
                const functionCall = otpVerificationToken ? submitHandler : getOtpHandler;
                const success = await functionCall();
                if (success) navigate("/login");
              }}
              className="flex flex-col gap-4"
            >
              <Error />

              <Input
                type="text"
                name="fullName"
                minLength={3}
                placeholder="Full Name"
                value={fullName}
                set={setFullName}
                autoComplete="name"
              />

              <Input
                type="text"
                name="userName"
                minLength={3}
                placeholder="Username"
                value={userName}
                set={setUserName}
                autoComplete="username"
              />

              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                set={setEmail}
                autoComplete="email"
              />

              <NewPasswordInput />
              <ConfirmPasswordInput />
              <OtpInput />

              <CoolButton text={<ButtonText />} />

              <div className="mt-2 text-center text-sm transition-colors duration-300">
                <span className={isDark ? "text-zinc-400" : "text-zinc-600"}>
                  Already have an account?{" "}
                </span>
                <Link
                  to="/login"
                  className="text-blue-500 font-semibold hover:underline"
                >
                  Login
                </Link>
              </div>

              <div
                className={`flex justify-center items-center mt-3 text-sm ${
                  isDark ? "text-zinc-400" : "text-zinc-600"
                } transition-colors duration-300`}
              >
                <span className="mx-2">or</span>
              </div>

              <GoogleAuth />
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
