import { motion } from "framer-motion";

export function CoolButton({ text, onClick }) {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.05, backgroundColor: "#1f2937", boxShadow: "0px 0px 8px #0ea5e9" }}
            whileTap={{ scale: 0.95 }}
            className="bg-sky-600 flex items-center justify-center text-white w-full px-6 py-2 rounded-xl border border-zinc-700 shadow-md transition-colors duration-200"
        >
            {text}
        </motion.button>
    );
}