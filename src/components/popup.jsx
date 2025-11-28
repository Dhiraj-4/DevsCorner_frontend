import { useEffect } from "react";
import { X } from "lucide-react";
import { useTheme } from "../theme-provider.jsx";

export default function Popup({
  message,
  type = "success",
  duration = 2500,
  onClose,
}) {
  const { activeTheme } = useTheme();

  useEffect(() => {
    const t = setTimeout(() => onClose && onClose(), duration);
    return () => clearTimeout(t);
  }, [duration, onClose]);

  const colorClasses =
    type === "success"
      ? activeTheme === "dark"
        ? "bg-green-700 text-green-200 border-green-600"
        : "bg-green-100 text-green-800 border-green-300"
      : activeTheme === "dark"
      ? "bg-red-700 text-red-200 border-red-600"
      : "bg-red-100 text-red-800 border-red-300";

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 px-4 py-3 border rounded-lg shadow-lg flex items-center gap-3 
      animate-in fade-in slide-in-from-bottom-3 transition-colors
      ${colorClasses}`}
    >
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className="opacity-70 hover:opacity-100 transition"
      >
        <X size={16} />
      </button>
    </div>
  );
}