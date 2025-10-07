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
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore.js";
import { useAuthStore } from "../store/authStore.js";
import { checkAccessToken } from "../utils/checkAccessToken.js";
import { NavbarProfileImage } from "../components/profile image/navbarProfileImage.jsx";

export default function UserNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  
  const {
    hydrateUser,
    user
  } = useUserStore();

  const {
    isLoggedIn
  } = useAuthStore();
  
  const naviagte = useNavigate();
  useEffect( () => {
    
    const checkUserLogin = async() => {
      await checkAccessToken();
      hydrateUser();
    }
    checkUserLogin();
  },[]);

  if(!isLoggedIn) {
      naviagte("/login");
  }


  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-800 backdrop-blur-md text-white py-2 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-5">
          {/* Logo or brand area */}
          <Link to="/feed" className="flex items-center space-x-1 text-lg font-bold hover:text-blue-300 transition-colors duration-300">
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-6 items-center text-lg font-bold">
            <NavItem to="/jobs" icon={<Briefcase className="w-5 h-5" />} label="Jobs" />
            <NavItem to="/post" icon={<PlusSquare className="w-5 h-5" />} label="Post" />
            <NavItem to="/chat" icon={<MessageCircle className="w-5 h-5" />} label="Chat" />
            <NavItem to="/notifications" icon={<Bell className="w-5 h-5" />} label="Notifications" />
            <NavItem to="/me" icon={<User className="w-5 h-5" />} label="Profile" />
            <NavbarProfileImage profileImage={user?.profileImage}/>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="md:hidden z-10 bg-black backdrop-blur-md px-4 py-4 space-y-4 text-sm font-medium shadow-md">
          <NavbarProfileImage profileImage={user?.profileImage} />
          <NavItem to="/jobs" icon={<Briefcase className="w-5 h-5" />} label="Jobs" />
          <NavItem to="/post" icon={<PlusSquare className="w-5 h-5" />} label="Post" />
          <NavItem to="/chat" icon={<MessageCircle className="w-5 h-5" />} label="Chat" />
          <NavItem to="/notifications" icon={<Bell className="w-5 h-5" />} label="Notifications" />
          <NavItem to="/me" icon={<User className="w-5 h-5" />} label="Profile" />
        </div>
      )}
    </nav>
  );
}

function NavItem({ to, icon, label }) {
  return (
    <Link
      to={to}
      className="flex items-center space-x-1 hover:text-blue-300 transition-colors duration-300"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}