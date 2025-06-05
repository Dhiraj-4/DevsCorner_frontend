import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

export function SignupHeader() {
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
        Empowering developers and employers to connect meaningfully.
      </motion.p>

      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="text-4xl md:text-5xl font-semibold text-white tracking-tight"
      >
        Your talent network starts here
      </motion.h1>

      {/* Typing effect with dual messaging */}
      <motion.p
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1, duration: 0.8 }}
  className="text-[#7f5af0] mt-6 text-2xl md:text-4xl font-mono font-semibold tracking-wide"
>
  <Typewriter
    words={['Showcase your skills.', 'Hire top developers.']}
    loop={0}
    cursor
    cursorStyle="|"
    typeSpeed={70}
    deleteSpeed={50}
    delaySpeed={2000}
  />
</motion.p>
    </motion.header>
  );
}
