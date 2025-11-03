// src/components/loginInputFields/forgotPassword.jsx
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../theme-provider.jsx";

export function ForgotPassword() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const textClass = theme === "dark" ? "text-zinc-300" : "text-zinc-700";

  function handleForget() {
    navigate("/forgot-password");
  }

  return (
    <button
      type="button"
      onClick={handleForget}
      className={`text-sm font-medium ${textClass} hover:underline`}
    >
      Forgot password?
    </button>
  );
}
