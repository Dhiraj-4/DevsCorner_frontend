import { useState } from "react";
import {
  Home,
  User,
  Users,
  Briefcase,
  PlusSquare,
  Bell,
  MessageCircle,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function UserNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/10 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo or brand area */}
          <Link to="/" className="flex items-center space-x-1 text-lg font-bold hover:text-blue-300 transition-colors duration-300">
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-6 items-center text-lg font-bold">
            <NavItem to="/network" icon={<Users className="w-5 h-5" />} label="My Network" />
            <NavItem to="/jobs" icon={<Briefcase className="w-5 h-5" />} label="Jobs" />
            <NavItem to="/post" icon={<PlusSquare className="w-5 h-5" />} label="Post" />
            <NavItem to="/chat" icon={<MessageCircle className="w-5 h-5" />} label="Chat" />
            <NavItem to="/notifications" icon={<Bell className="w-5 h-5" />} label="Notifications" />
            <NavItem to="/me" icon={<User className="w-5 h-5" />} label="Profile" />
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
        <div className="md:hidden bg-white/10 backdrop-blur-md px-4 py-4 space-y-4 text-sm font-medium shadow-md">
          <NavItem to="/network" icon={<Users className="w-5 h-5" />} label="My Network" />
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