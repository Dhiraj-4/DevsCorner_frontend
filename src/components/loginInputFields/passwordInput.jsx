// // src/components/loginInputFields/passwordInput.jsx
// import { motion } from "framer-motion";
// import { Eye, EyeOff } from "lucide-react";
// import { useAuthStore } from "../../store/authStore.js";
// import { useTheme } from "../../theme-provider.jsx";

// export function PasswordInput() {
//   const { password, setPassword, passwordShow, setPasswordShow } = useAuthStore();
//   const { theme } = useTheme();
//   const iconColor = theme === "dark" ? "text-zinc-300" : "text-zinc-600";

//   return (
//     <div className="relative w-full">
//       <motion.input
//         type={passwordShow ? "text" : "password"}
//         name="password"
//         required
//         minLength={8}
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="primary-input"
//         autoComplete="current-password"
//         initial={{ opacity: 0, y: 6 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.12 }}
//         whileFocus={{ scale: 1.01 }}
//       />

//       <button
//         type="button"
//         onClick={() => setPasswordShow(!passwordShow)}
//         className={`absolute right-3 top-1/2 -translate-y-1/2 transition ${iconColor} hover:text-blue-500`}
//         aria-label={passwordShow ? "Hide password" : "Show password"}
//       >
//         {passwordShow ? <EyeOff size={18} /> : <Eye size={18} />}
//       </button>
//     </div>
//   );
// }


// src/components/loginInputFields/passwordInput.jsx
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../../store/authStore.js";
import { useTheme } from "../../theme-provider.jsx";

export function PasswordInput() {
  const { password, setPassword, passwordShow, setPasswordShow } = useAuthStore();
  const { activeTheme } = useTheme(); // ✅ use activeTheme instead of theme
  const isDark = activeTheme === "dark";
  const iconColor = isDark ? "text-zinc-300" : "text-zinc-600";

  return (
    <div className="relative w-full">
      <motion.input
        type={passwordShow ? "text" : "password"}
        name="password"
        required
        minLength={8}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="primary-input"
        autoComplete="current-password"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.12 }}
        whileFocus={{ scale: 1.01 }}
      />

      <button
        type="button"
        onClick={() => setPasswordShow(!passwordShow)}
        className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ${iconColor} hover:text-blue-500`}
        aria-label={passwordShow ? "Hide password" : "Show password"}
      >
        {passwordShow ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}
