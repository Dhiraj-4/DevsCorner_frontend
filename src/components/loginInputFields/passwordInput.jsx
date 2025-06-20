import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react"; // or "react-icons/fa"
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore.js";

export function PasswordInput() {
  const {
    password,
    setPassword,
    passwordShow,
    setPasswordShow,
  } = useAuthStore();

  const navigate = useNavigate();

  function handleForget() {
    navigate('/forgot-password')
  }
  return (
    <>
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
        autoComplete="password"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.1, ease: "easeOut" }}
        whileFocus={{ scale: 1.01 }}
      />

      <button
        type="button"
        onClick={() => setPasswordShow(!passwordShow)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition"
        tabIndex={-1}
      >
        {passwordShow ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>

    </div>

    <button
    onClick={handleForget}
    className="text-blue-500 min-w-full flex font-bold hover:underline">
        forgot password
    </button>
    </>
  );
}