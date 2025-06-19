import { useAuthStore } from "../../store/authStore.js";
import { motion } from "framer-motion";

export function EmailInput() {
    const { email, setEmail } = useAuthStore();

    return (
        <motion.input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="primary-input"
            autoComplete="email"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            whileFocus={{ scale: 1.01 }}
        />
    );
}
