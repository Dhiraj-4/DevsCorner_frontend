import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react"; // or "react-icons/fa"
import { useAuthStore } from "../../store/authStore.js";
import { Input } from "../Inputs/input.jsx";

export function NewPasswordInput() {
  const {
    newPassword,
    setNewPassword,
    newPasswordShow,
    setNewPasswordShow,
  } = useAuthStore();

  return (
    <div className="relative w-full">
      <Input
        type={newPasswordShow ? "text" : "password"}
        name={"newPassword"}
        required
        minLength={8}
        placeholder={"New Password"}
        value={newPassword}
        set={setNewPassword}
        autoComplete={"new-password"}
      />

      <button
        type="button"
        onClick={() => setNewPasswordShow(!newPasswordShow)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-blue-400 transition"
        tabIndex={-1}
      >
        {newPasswordShow ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}