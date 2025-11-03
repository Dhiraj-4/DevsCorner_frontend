import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const getSystemTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

  const getInitialTheme = () => {
    if (typeof window === "undefined") return "light";
    const saved = localStorage.getItem("theme");
    if (saved && saved !== "system") return saved;
    return getSystemTheme();
  };

  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "system");
  const [activeTheme, setActiveTheme] = useState(getInitialTheme());

  // Apply and persist theme
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(activeTheme);
    localStorage.setItem("theme", theme);
  }, [activeTheme, theme]);

  // React to system theme changes when set to “system”
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      if (theme === "system") {
        setActiveTheme(getSystemTheme());
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  // Update activeTheme whenever user toggles theme
  useEffect(() => {
    if (theme === "system") {
      setActiveTheme(getSystemTheme());
    } else {
      setActiveTheme(theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, activeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);