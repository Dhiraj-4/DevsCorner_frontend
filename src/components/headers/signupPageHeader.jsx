import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { useTheme } from "../../theme-provider.jsx";

export function SignupHeader() {
  const { theme } = useTheme();
  const subtitleClass = theme === "dark" ? "text-zinc-300" : "text-zinc-600";
  const titleClass = theme === "dark" ? "text-white" : "text-zinc-900";

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center pt-10"
    >
      <motion.p className={`uppercase tracking-wide text-sm ${subtitleClass} mb-2`}>
        Join DevsCorner
      </motion.p>

      <motion.h1 className={`text-3xl sm:text-4xl font-semibold ${titleClass}`}>
        Create your developer profile
      </motion.h1>

      <motion.p className="text-[#7f5af0] mt-3 text-lg sm:text-xl font-mono font-semibold">
        <Typewriter
          words={[
            "Showcase your skills.",
            "Connect with devs & teams.",
            "Get noticed for what you build.",
          ]}
          loop={0}
          cursor
          cursorStyle="|"
          typeSpeed={60}
          deleteSpeed={40}
          delaySpeed={2000}
        />
      </motion.p>
    </motion.header>
  );
}