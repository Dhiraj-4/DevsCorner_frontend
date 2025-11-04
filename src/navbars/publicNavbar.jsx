import { Home, Sun, Moon, Laptop } from "lucide-react";
import { CoolButton } from "../components/Buttons/button";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useTheme } from "../theme-provider.jsx";
import { useEffect, useState } from "react";
import { checkAccessToken } from "../utils/checkAccessToken.js";
import { useAuthStore } from "../store/authStore.js";

export default function PublicNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [isLogin, setIsLogin] = useState(false);
  const { isLoading, setIsLoading } = useAuthStore();
  

  // Theme toggle logic
  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  useEffect(() => {
      const checkLogin = async () => {
        const route = "/";
        const success = await checkAccessToken({ route, navigate });
        setIsLogin(success);
      };
      checkLogin();
      return () => {
        if (isLoading) {
          setIsLoading(false);
        }
      };
    }, []);
  
    // Immediately redirect if logged in
    useEffect(() => {
      if (isLogin) navigate("/me");
    }, [isLogin, navigate]);

  const nextLabel =
    theme === "light" ? "Dark" : theme === "dark" ? "System" : "Light";

  const icon =
    theme === "light" ? (
      <Sun className="w-5 h-5 text-yellow-500" />
    ) : theme === "dark" ? (
      <Moon className="w-5 h-5 text-blue-400" />
    ) : (
      <Laptop className="w-5 h-5 text-muted-foreground" />
    );

  const path = location.pathname;
  const isHome = path === "/" || path === "/feed";

  const activeColor =
    theme === "dark"
      ? "text-blue-400"
      : "text-blue-600";

  const inactiveColor = "text-foreground";

  // hover states match dark mode behavior
  const hoverClasses =
    theme === "dark"
      ? "hover:bg-zinc-800 hover:text-blue-400"
      : theme === "light"
      ? "hover:bg-zinc-200 hover:text-blue-600"
      : "hover:bg-zinc-800 hover:text-blue-600";

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50 
        backdrop-blur-md border-b border-border transition-colors
        ${theme === "light" 
          ? "bg-white shadow-sm" 
          : theme === "dark" 
          ? "bg-zinc-900/60" 
          : "bg-background/60"}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Home */}
          <Link
            to="/"
            className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all duration-150 ${hoverClasses} ${
              isHome ? activeColor : inactiveColor
            }`}
          >
            <Home
              className={`w-5 h-5 transition-colors ${
                isHome ? activeColor : inactiveColor
              }`}
            />
            <span>Home</span>
          </Link>

          {/* Right: Login / Signup + Theme Toggle */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2">
              <CoolButton text="Login" clickHandler={() => navigate("/login")} />
              <CoolButton text="Signup" clickHandler={() => navigate("/signup")} />
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-md border border-border hover:bg-muted transition-colors flex items-center justify-center"
              title={`Switch to ${nextLabel} mode`}
            >
              {icon}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}