import { motion } from "framer-motion";

export function TextArea({ name, placeholder, value, set, minLength = 0, rows = 4, required = true }) {
    return (
        <motion.textarea
            name={name}
            required={required}
            minLength={minLength}
            placeholder={placeholder}
            value={value}
            onChange={(e) => set(e.target.value)}
            rows={rows}
            className="primary-input resize-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            whileFocus={{ scale: 1 }}
        />
    );
}