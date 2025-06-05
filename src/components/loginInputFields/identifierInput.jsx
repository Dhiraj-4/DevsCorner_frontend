import { useLoginStore } from "../../store/loginStore.js";
import { motion } from "framer-motion";

export function IdentifierInput() {
    const { identifier, setIdentifier } = useLoginStore();

    return (
        <motion.input
            type="text"
            name="identifier"
            placeholder="Enter User Name or Email"
            required
            minLength={3}
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white placeholder-zinc-500 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-sky-500 ring-offset-2 ring-offset-zinc-900 transition duration-200"
            autoComplete="identifier"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            whileFocus={{ scale: 1.01 }}
        />
    );
}
