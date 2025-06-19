import { motion } from "framer-motion";

export function CoolButton({ text, onClick }) {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.05, backgroundColor: "#1f2937", boxShadow: "0px 0px 8px #0ea5e9" }}
            whileTap={{ scale: 0.95 }}
            className="primary-button"
        >
            {text}
        </motion.button>
    );
}