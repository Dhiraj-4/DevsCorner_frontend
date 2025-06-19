import { Home } from "lucide-react";
export default function PublicNavbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/10 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 text-xl font-semibold">
            <a href="/" className="flex items-center space-x-2 hover:text-blue-300 transition-colors duration-300">
              <span>
                <Home className="w-6 h-6 text-white" />
              </span>
              <span>Home</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}