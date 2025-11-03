import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react"; // or "react-icons/fa"
import { useAuthStore } from "../../store/authStore.js";

export function ConfirmPasswordInput() {
  const {
    confirmPassword,
    setConfirmPassword,
    confirmPasswordShow,
    setConfirmPasswordShow,
  } = useAuthStore();

  return (
    <div className="relative w-full">
      <motion.input
        type={confirmPasswordShow ? "text" : "password"}
        name="confirmPassword"
        required
        minLength={8}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="primary-input"
        autoComplete="new-password"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.1, ease: "easeOut" }}
        whileFocus={{ scale: 1.01 }}
      />

      <button
        type="button"
        onClick={() => setConfirmPasswordShow(!confirmPasswordShow)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-blue-400 transition"
        tabIndex={-1}
      >
        {confirmPasswordShow ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}