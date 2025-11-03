// src/components/loginInputFields/identifierInput.jsx
import { motion } from "framer-motion";
import { useAuthStore } from "../../store/authStore.js";
import { useTheme } from "../../theme-provider.jsx";

export function IdentifierInput() {
  const { identifier, setIdentifier } = useAuthStore();
  const { theme } = useTheme();

  // keep your existing .primary-input styles, but add theme-aware placeholder
  const placeholderClass = theme === "dark" ? "placeholder-zinc-400" : "placeholder-zinc-500";

  return (
    <motion.input
      type="text"
      name="identifier"
      placeholder="Username or email"
      required
      minLength={3}
      value={identifier}
      onChange={(e) => setIdentifier(e.target.value)}
      className={`primary-input ${placeholderClass}`}
      autoComplete="identifier"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.12 }}
      whileFocus={{ scale: 1.01 }}
    />
  );
}