import { motion } from "framer-motion";

export function ForgotPasswordHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center mb-12"
    >
      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-sm md:text-base text-gray-500 tracking-wide uppercase mb-2"
      >
        DevsCorner
      </motion.p>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="text-4xl md:text-5xl font-semibold text-white tracking-tight"
      >
        Reset your account password
      </motion.h1>

    </motion.header>
  );
}