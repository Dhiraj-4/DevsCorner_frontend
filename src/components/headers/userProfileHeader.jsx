import { motion } from "framer-motion";
import { useTheme } from "../../theme-provider.jsx";

export function UserProfileHeader() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const subtitleClass = isDark ? "text-zinc-400" : "text-zinc-600";
  const titleClass = isDark ? "text-white" : "text-zinc-900";

  return (
    <motion.header
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <motion.p
        className={`uppercase tracking-wide text-sm ${subtitleClass} mb-2`}
      >
        Your DevsCorner Space
      </motion.p>

      <motion.h1
        className={`text-4xl sm:text-5xl font-semibold ${titleClass}`}
      >
        Developer Profile
      </motion.h1>
    </motion.header>
  );
}
