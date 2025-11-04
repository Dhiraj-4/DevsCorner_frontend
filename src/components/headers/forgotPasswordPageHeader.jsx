// import { motion } from "framer-motion";
// import { useTheme } from "../../theme-provider.jsx";

// export function ForgotPasswordHeader() {
//   const { theme } = useTheme();
//   const subtitleClass = theme === "dark" ? "text-zinc-300" : "text-zinc-600";
//   const titleClass = theme === "dark" ? "text-white" : "text-zinc-900";

//   return (
//     <motion.header
//       initial={{ opacity: 0, y: -18 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="text-center pt-10"
//     >
//       <motion.p className={`uppercase tracking-wide text-sm ${subtitleClass} mb-2`}>
//         DevsCorner
//       </motion.p>

//       <motion.h1 className={`text-3xl sm:text-4xl font-semibold ${titleClass}`}>
//         Reset your password
//       </motion.h1>
//     </motion.header>
//   );
// }

import { motion } from "framer-motion";
import { useTheme } from "../../theme-provider.jsx";

export function ForgotPasswordHeader() {
  const { activeTheme } = useTheme();
  const subtitleClass = activeTheme === "dark" ? "text-zinc-300" : "text-zinc-600";
  const titleClass = activeTheme === "dark" ? "text-white" : "text-zinc-900";

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center pt-10 transition-colors duration-300"
      data-theme={activeTheme}
    >
      <motion.p
        className={`uppercase tracking-wide text-sm ${subtitleClass} mb-2`}
      >
        DevsCorner
      </motion.p>

      <motion.h1
        className={`text-3xl sm:text-4xl font-semibold ${titleClass}`}
      >
        Reset your password
      </motion.h1>
    </motion.header>
  );
}
