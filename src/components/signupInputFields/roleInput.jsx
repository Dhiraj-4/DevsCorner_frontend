import { motion } from "framer-motion";
import { useSignupStore } from "../../store/signupStore.js";

export function RoleSelect() {
  const { role, setRole } = useSignupStore();

  return (
    <div className="relative w-full">
      <label htmlFor="role" className="sr-only">Select Role</label>

      <motion.select
        id="role"
        required
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="appearance-none w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-sky-500 ring-offset-2 ring-offset-zinc-900 transition duration-200 pr-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.1, ease: "easeOut" }}
        whileFocus={{ scale: 1.01 }}
        defaultValue=""
      >
        <option value="" disabled hidden>Select Role</option>
        <option value="developer">Developer</option>
        <option value="employer">Employer</option>
      </motion.select>

      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
        <svg
          className="w-4 h-4 text-zinc-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}