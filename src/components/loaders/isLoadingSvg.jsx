import { useTheme } from "../../theme-provider.jsx";

export function IsLoadingSvg() {
  const { activeTheme } = useTheme();

  const textColor =
    activeTheme === "dark" ? "text-zinc-300" : "text-zinc-700";
  const spinnerColor =
    activeTheme === "dark" ? "text-white" : "text-blue-600";

  return (
    <span className={`flex items-center gap-2 text-sm font-medium ${textColor}`}>
      <svg
        className={`animate-spin h-4 w-4 ${spinnerColor}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
        />
      </svg>
      <span>Loading...</span>
    </span>
  );
}