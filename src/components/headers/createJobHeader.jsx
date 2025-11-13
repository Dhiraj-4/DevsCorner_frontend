import { motion } from "framer-motion";
import { useTheme } from "../../theme-provider.jsx";

export function CreateJobHeader() {
  const { activeTheme } = useTheme();

  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center mb-12"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className={`text-4xl md:text-5xl font-semibold tracking-tight transition-colors duration-300 ${
          activeTheme === "dark" ? "text-neutral-100" : "text-neutral-900"
        }`}
      >
        Create Job Post
      </motion.h1>
    </motion.header>
  );
}