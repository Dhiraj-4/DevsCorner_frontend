import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore.js";
import { useTheme } from "../../theme-provider.jsx";

export function Timer() {
  const [timer, setTimer] = useState(2 * 60 * 1000); // 2 Minutes
  const { setResending } = useAuthStore();
  const { activeTheme } = useTheme();
  const isDark = activeTheme === "dark";

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1000) {
          clearInterval(interval);
          setResending(true);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [setResending]);

  const minutes = Math.floor(timer / 60000);
  const seconds = Math.floor((timer / 1000) % 60);

  const textClass = isDark ? "text-zinc-200" : "text-zinc-800";

  return (
    <div
      className={`inline font-mono font-semibold ${textClass} transition-colors duration-300`}
      data-theme={activeTheme}
    >
      {minutes}:{seconds.toString().padStart(2, "0")}
    </div>
  );
}