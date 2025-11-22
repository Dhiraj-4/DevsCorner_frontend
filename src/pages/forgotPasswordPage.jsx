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
import { useEffect } from "react";

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { passwordResetToken, otpVerificationToken, isLoading, reset_authStore } = useAuthStore();
  const { activeTheme } = useTheme();

  const isDark = activeTheme === "dark";
  const containerBg = isDark ? "bg-zinc-900/60 backdrop-blur-sm" : "bg-white/80";
  const containerBorder = isDark ? "border-zinc-800" : "border-zinc-200";
  const pageBg = isDark ? "bg-zinc-950 text-zinc-100" : "bg-zinc-50 text-zinc-900";

  useEffect(() => {
      reset_authStore();
    },[]);

  if (isLoading) {
    return (
      <div className={`${pageBg} min-h-screen flex items-center justify-center`} data-theme={activeTheme}>
        <IsLoadingSvg />
      </div>
    );
  }

  return (
    <div
      className={`${pageBg} min-h-screen flex items-center justify-center py-12 px-4 transition-colors duration-300`}
      data-theme={activeTheme}
    >
      <main className="w-full max-w-3xl">
        <div className="mx-auto">
          {/* Header */}
          <div className="flex justify-center">
            <ForgotPasswordHeader />
          </div>

          {/* Centered Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
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
          </motion.div>
        </div>
      </main>
    </div>
  );
}