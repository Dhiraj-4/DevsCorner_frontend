import { useAuthStore } from "../../store/authStore.js";
import { motion } from "framer-motion";

export function UserNameInput() {
    const { userName, setUserName } = useAuthStore();

    return (
        <motion.input
            type="text"
            name="userName"
            required
            minLength={3}
            placeholder="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="primary-input"
            autoComplete="userName"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            whileFocus={{ scale: 1.01 }}
        />
    );
}
