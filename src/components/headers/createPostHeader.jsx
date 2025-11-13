import { motion } from "framer-motion";
import { useTheme } from "../../theme-provider.jsx";

export function CreatePostHeader() {
  const { activeTheme } = useTheme();

  const textColor =
    activeTheme === "dark" ? "text-neutral-100" : "text-neutral-900";

  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center"
    >
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className={`text-4xl md:text-5xl font-semibold tracking-tight ${textColor}`}
      >
        Create Post
      </motion.h1>
    </motion.header>
  );
}