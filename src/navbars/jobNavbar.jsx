import { Briefcase } from "lucide-react";
export default function JobNavbar() {
  return (
    <nav className="fixed top-20 left-0 w-full z-50 backdrop-blur-md  text-white shadow-md"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-around items-center h-16">

        <a href="/" className="flex flex-shrink-0 text-xl font-semibold items-center space-x-2 hover:text-blue-300 transition-colors duration-300">
          <div 
          className=""
          onClick={""}
          >
              <span>
                <Briefcase className="w-5 h-5" />
              </span>
              <span>My Jobs</span>
          </div>
        </a>

          <span className="font-semibold text-4xl"> | </span>

          <div className="flex-shrink-0 text-xl font-semibold">

            <a href="/" className="flex items-center space-x-2 hover:text-blue-300 transition-colors duration-300">
              <span>
                <Briefcase className="w-5 h-5" />
              </span>
              <span>Jobs</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

