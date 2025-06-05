import { useSignupStore } from "../../store/signupStore";
import { motion } from "framer-motion";

export function FullNameInput() {
    const { fullName, setFullName } = useSignupStore();

    return (
        <motion.input
            type="text"
            name="fullName"
            placeholder="Full Name"
            required
            minLength={3}
            value={fullName}
            autoComplete="name"
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white placeholder-zinc-500 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-sky-500 ring-offset-2 ring-offset-zinc-900 transition duration-200"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            whileFocus={{ scale: 1.01 }}
        />
    );
}
