import { useSignupStore } from "../../store/signupStore";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react"; // or "react-icons/fa"

export function NewPasswordInput() {
  const {
    newPassword,
    setNewPassword,
    newPasswordShow,
    setNewPasswordShow,
  } = useSignupStore();

  return (
    <div className="relative w-full">
      <motion.input
        type={newPasswordShow ? "text" : "password"}
        name="newPassword"
        required
        minLength={8}
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full px-4 py-2 pr-10 rounded-lg bg-zinc-800 text-white placeholder-zinc-500 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-sky-500 ring-offset-2 ring-offset-zinc-900 transition duration-200"
        autoComplete="new-password"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.1, ease: "easeOut" }}
        whileFocus={{ scale: 1.01 }}
      />

      <button
        type="button"
        onClick={() => setNewPasswordShow(!newPasswordShow)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition"
        tabIndex={-1}
      >
        {newPasswordShow ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}