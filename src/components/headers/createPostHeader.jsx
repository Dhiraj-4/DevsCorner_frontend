import { motion } from "framer-motion";

export function CreatePostHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center mb-12"
    >

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="text-4xl md:text-5xl font-semibold text-white tracking-tight"
      >
        Create Post
      </motion.h1>

    </motion.header>
  );
}