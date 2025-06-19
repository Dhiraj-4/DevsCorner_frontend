import { motion } from "framer-motion";
import { useAuthStore } from "../../store/authStore.js";

export function FullNameInput() {
    const { fullName, setFullName } = useAuthStore();

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
            className="primary-input"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            whileFocus={{ scale: 1.01 }}
        />
    );
}
