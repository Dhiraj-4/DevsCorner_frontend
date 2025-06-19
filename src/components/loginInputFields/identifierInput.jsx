import { useAuthStore } from "../../store/authStore.js";
import { motion } from "framer-motion";

export function IdentifierInput() {
    const { identifier, setIdentifier } = useAuthStore();

    return (
        <motion.input
            type="text"
            name="identifier"
            placeholder="Enter User Name or Email"
            required
            minLength={3}
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="primary-input"
            autoComplete="identifier"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            whileFocus={{ scale: 1.01 }}
        />
    );
}
