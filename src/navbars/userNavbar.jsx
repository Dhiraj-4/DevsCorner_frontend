import { useEffect, useState } from "react";
import {
  Home,
  User,
  Briefcase,
  PlusSquare,
  Bell,
  MessageCircle,
  Menu,
  X,
  Sun,
  Moon,
  Laptop,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUserStore } from "../store/userStore.js";
import { useAuthStore } from "../store/authStore.js";
import { checkAccessToken } from "../utils/checkAccessToken.js";
import { NavbarProfileImage } from "../components/profile image/navbarProfileImage.jsx";
import { useTheme } from "../theme-provider.jsx";
import { useChatStore } from "../store/chatStore.js";
import { useNotifStore } from "../store/notificationStore.js";
import { fetchNotifications } from "../utils/fetchNotifications.js";

export default function UserNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const { hydrateUser, user } = useUserStore();
  const { notifications } = useNotifStore();
  const { connectSocket } = useChatStore();
  const { isLoggedIn, isLoading, accessToken } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  // Socket connection
  useEffect(() => {
    if (!user._id || !accessToken) return;
    connectSocket(user._id);
    fetchNotifications()
  }, [user]);

  // Hydrate user
  useEffect(() => {
    const init = async () => {
      await checkAccessToken();
      await hydrateUser();
    };
    init();
  }, []);

  // Redirect if logged out
  if (!isLoggedIn) navigate("/login");

  // Theme toggle logic
  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

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

  // Close dropdown when navigating (mobile)
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

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
        <div className="flex justify-between items-center h-16 gap-4">
          {/* Home as NavItem so active styling is consistent */}
          <NavItem to="/feed" icon={<Home />} label="Home" isHome />

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {(isLoading && !accessToken) ? (
              <div className="animate-pulse text-muted-foreground">Loading...</div>
            ) : (
              <>
                <NavItem to="/jobs" icon={<Briefcase />} label="Jobs" />
                <NavItem to="/post" icon={<PlusSquare />} label="Post" />
                <NavItem to="/chat" icon={<MessageCircle />} label="Chat" />
                <span className="relative">
                  <NavItem to="/notifications" icon={<Bell />} label="Notifications" /> 
                  <div 
                  className="w-5 h-5 bg-red-500 text-white text-lg absolute top-0 flex justify-center items-center rounded-full"
                  >
                    {notifications.length}
                  </div>
                </span>
                <NavItem to="/me" icon={<User />} label="Profile" />
                <NavbarProfileImage profileImage={user?.profileImage} />
              </>
            )}


            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md border border-border hover:bg-muted transition-colors flex items-center justify-center"
              title={`Switch to ${nextLabel} mode`}
            >
              {icon}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
          >
            {isOpen ? 
            
            <X className="w-6 h-6" /> : 
            
            <span className="relative">
              <Menu className="w-6 h-6" />
            <div 
            className="w-4 h-4 bg-red-500 text-white p-1 absolute top-0 left-0 flex justify-center items-center rounded-full"
            >
              {notifications.length}
            </div>
            </span>
            }
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border py-4 px-4 space-y-3 shadow-md">
          <NavbarProfileImage profileImage={user?.profileImage} />
          <MobileNavItem to="/jobs" icon={<Briefcase />} label="Jobs" onClick={closeMenu} />
          <MobileNavItem to="/post" icon={<PlusSquare />} label="Post" onClick={closeMenu} />
          <MobileNavItem to="/chat" icon={<MessageCircle />} label="Chat" onClick={closeMenu} />
          <div className="relative">
            <MobileNavItem to="/notifications" icon={<Bell />} label="Notifications" onClick={closeMenu} />
            <span 
            className="w-5 h-5 bg-red-500 text-white text-lg absolute top-0 flex justify-center items-center rounded-full"
            >
              {notifications.length}
            </span>
          </div>
          <MobileNavItem to="/me" icon={<User />} label="Profile" onClick={closeMenu} />

          <button
            onClick={() => {
              toggleTheme();
              closeMenu();
            }}
            className="flex items-center gap-2 p-2 border border-border rounded-md hover:bg-muted transition-colors w-full justify-center"
          >
            {icon}
            <span className="text-sm">{`Switch to ${nextLabel}`}</span>
          </button>
        </div>
      )}
    </nav>
  );
}

/**
 * NavItem: desktop link that highlights when active.
 * - active class: dark -> text-blue-400, light -> text-primary
 * - applies same class to icon and label
 */

function NavItem({ to, icon, label, isHome = false }) {
  const location = useLocation();
  const { theme } = useTheme();

  const path = location.pathname || "/";
  const isActive =
    path === to || path.startsWith(to) || (isHome && (path === "/" || path === "/feed"));

  // consistent colors across themes
  const activeColor =
    theme === "dark"
      ? "text-blue-400"
      : "text-blue-600"; // brighter in light mode for visibility

  const inactiveColor = "text-foreground";

  // hover states match dark mode behavior
  const hoverClasses =
    theme === "dark"
      ? "hover:bg-zinc-800 hover:text-blue-400"
      : theme === "light"
      ? "hover:bg-zinc-200 hover:text-blue-600"
      : "hover:bg-zinc-800 hover:text-blue-600";

  return (
    <Link
      to={to}
      className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all duration-150 ${hoverClasses} ${
        isActive ? activeColor : inactiveColor
      }`}
    >
      <span
        className={`flex items-center transition-colors ${
          isActive ? activeColor : inactiveColor
        }`}
      >
        {icon}
      </span>
      <span>{label}</span>
    </Link>
  );
}


/**
 * MobileNavItem: same active behavior, closes menu on click via onClick prop
 */

function MobileNavItem({ to, icon, label, onClick }) {
  const location = useLocation();
  const { theme } = useTheme();

  const path = location.pathname || "/";
  const isActive = path === to || path.startsWith(to);

  const activeColor =
    theme === "dark"
      ? "text-blue-400"
      : "text-blue-600";

  const inactiveColor = "text-foreground";

  const hoverClasses =
    theme === "dark"
      ? "hover:bg-zinc-800 hover:text-blue-400"
      : theme === "light"
      ? "hover:bg-zinc-200 hover:text-blue-600"
      : "hover:bg-zinc-800 hover:text-blue-600";

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center gap-2 p-2 rounded-md transition-all duration-150 ${hoverClasses} ${
        isActive ? activeColor : inactiveColor
      }`}
    >
      <span
        className={`flex items-center transition-colors ${
          isActive ? activeColor : inactiveColor
        }`}
      >
        {icon}
      </span>
      <span>{label}</span>
    </Link>
  );
}