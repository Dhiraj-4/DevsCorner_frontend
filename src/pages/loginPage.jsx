// // src/pages/auth/LoginPage.jsx
// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { checkAccessToken } from "../utils/checkAccessToken.js"
// import { useTheme } from "../theme-provider.jsx";
// import { CoolButton } from "../components/Buttons/button.jsx" // don't change
// import { LoginHeader } from "../components/headers/loginPageHeader.jsx";
// import { IdentifierInput } from "../components/loginInputFields/identifierInput.jsx";
// import { PasswordInput } from "../components/loginInputFields/passwordInput.jsx";
// import { Error } from "../components/errors/error.jsx";
// import { ForgotPassword } from "../components/loginInputFields/forgotPassword.jsx";
// import { GoogleAuth } from "../components/googleAuth/googleLogin.jsx"; // don't change
// import { loginHandler } from "../utils/loginPageHandlers.js";
// import { useAuthStore } from "../store/authStore.js";
// import { IsLoadingSvg } from "../components/loaders/isLoadingSvg.jsx";

// export function LoginPage() {
//   const navigate = useNavigate();
//   const { theme } = useTheme();
//   const { isLoading } = useAuthStore();

//   // theme-aware container classes
//   const isDark = theme === "dark";
//   const containerBg = isDark ? "bg-zinc-900/60 backdrop-blur-sm" : "bg-white/80";
//   const containerBorder = isDark ? "border-zinc-800" : "border-zinc-200";
//   const pageBg = isDark ? "bg-zinc-950 text-zinc-100" : "bg-zinc-50 text-zinc-900";

//   if (isLoading) {
//     return (
//       <div className={`${pageBg} min-h-screen flex items-center justify-center`}>
//         {/* <div className="loader ease-linear rounded-full border-8 border-t-8 border-zinc-200 h-16 w-16"></div> */}
//         <IsLoadingSvg />
//       </div>
//     );
//   }
//   return (
//     <div className={`${pageBg} min-h-screen flex items-center justify-center py-12 px-4`}>
//       <main className="w-full max-w-3xl">
//         <div className="mx-auto">
//           {/* Hero / header */}
//           <div className="flex justify-center">
//             <LoginHeader />
//           </div>

//           {/* Centered card */}
//           <div
//             className={`mx-auto mt-6 rounded-2xl p-6 sm:p-8 shadow-lg border ${containerBorder} ${containerBg} max-w-md`}
//             style={{ backdropFilter: "saturate(130%) blur(8px)" }}
//           >
//             <form
//               onSubmit={async (e) => {
//                 e.preventDefault();
//                 // keep logic: loginHandler returns success boolean
//                 const success = await loginHandler();
//                 if (success) navigate("/me");
//               }}
//               className="flex flex-col gap-4"
//             >
//               <Error />
//               <IdentifierInput />
//               <PasswordInput />

//               <div className="flex items-center justify-between">
//                 <ForgotPassword />
//                 {/* keep CoolButton intact */}
//                 <div className="w-32">
//                   <CoolButton text={<span>Log in</span>} />
//                 </div>
//               </div>

//               <div className="text-center text-sm text-zinc-500 mt-1">or</div>

//               {/* Google auth - unchanged */}
//               <div className="mt-2">
//                 <GoogleAuth />
//               </div>

//               <div className="mt-4 text-center text-sm">
//                 <span className="text-zinc-500">Don't have an account? </span>
//                 <Link to="/signup" className="text-blue-500 font-semibold hover:underline ml-1">
//                   Signup
//                 </Link>
//               </div>
//             </form>
//           </div>
         
//         </div>
//       </main>
//     </div>
//   );
// }


// src/pages/auth/LoginPage.jsx
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../theme-provider.jsx";
import { CoolButton } from "../components/Buttons/button.jsx"; // don't change
import { LoginHeader } from "../components/headers/loginPageHeader.jsx";
import { IdentifierInput } from "../components/loginInputFields/identifierInput.jsx";
import { PasswordInput } from "../components/loginInputFields/passwordInput.jsx";
import { Error } from "../components/errors/error.jsx";
import { ForgotPassword } from "../components/loginInputFields/forgotPassword.jsx";
import { GoogleAuth } from "../components/googleAuth/googleLogin.jsx"; // don't change
import { loginHandler } from "../utils/loginPageHandlers.js";
import { useAuthStore } from "../store/authStore.js";
import { IsLoadingSvg } from "../components/loaders/isLoadingSvg.jsx";

export function LoginPage() {
  const navigate = useNavigate();
  const { activeTheme } = useTheme(); // ✅ use activeTheme instead of theme
  const { isLoading } = useAuthStore();

  const isDark = activeTheme === "dark";
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
    <div className={`${pageBg} min-h-screen flex items-center justify-center py-12 px-4 transition-colors duration-500`}>
      <main className="w-full max-w-3xl">
        <div className="mx-auto">
          {/* Hero / header */}
          <div className="flex justify-center">
            <LoginHeader />
          </div>

          {/* Centered card */}
          <div
            className={`mx-auto mt-6 rounded-2xl p-6 sm:p-8 shadow-lg border ${containerBorder} ${containerBg} max-w-md transition-colors duration-500`}
            style={{ backdropFilter: "saturate(130%) blur(8px)" }}
          >
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const success = await loginHandler();
                if (success) navigate("/me");
              }}
              className="flex flex-col gap-4"
            >
              <Error />
              <IdentifierInput />
              <PasswordInput />

              <div className="flex items-center justify-between">
                <ForgotPassword />
                {/* keep CoolButton intact */}
                <div className="w-32">
                  <CoolButton text={<span>Log in</span>} />
                </div>
              </div>

              <div className="text-center text-sm text-zinc-500 mt-1">or</div>

              {/* Google auth - unchanged */}
              <div className="mt-2">
                <GoogleAuth />
              </div>

              <div className="mt-4 text-center text-sm">
                <span className={isDark ? "text-zinc-500" : "text-zinc-600"}>
                  Don't have an account?{" "}
                </span>
                <Link
                  to="/signup"
                  className="text-blue-500 font-semibold hover:underline ml-1"
                >
                  Signup
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}