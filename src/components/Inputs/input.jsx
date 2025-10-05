import { motion } from "framer-motion";

export function Input({type, name, minLength, placeholder, value, set, autoComplete, required = true}) {

    return (
        <motion.input
            type={type}
            name={name}
            required={required}
            minLength={minLength}
            placeholder={placeholder}
            value={value}
            onChange={(e) => set(e.target.value)}
            className="primary-input"
            autoComplete={autoComplete}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            whileFocus={{ scale: 1.01 }}
        />
    );
}