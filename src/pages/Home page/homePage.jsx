// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { HomeHeader } from "../../components/headers/homePageHeader.jsx";
// import { CoolButton } from "../../components/Buttons/button.jsx";
// import { Feature } from "./feature.jsx";
// import { checkAccessToken } from "../../utils/checkAccessToken.js";

// export default function HomePage() {

//   const navigate = useNavigate();
//   const [ isLogin, setIsLogin ] = useState();

//   useEffect( () => {
//     const checkLogin = async() => {
//       const route = '/';
//       const success = await checkAccessToken({route, navigate});
//       setIsLogin(success);
//     }
//     checkLogin();
//   },[]);
//   return (
//     <>
//       {
//         isLogin ? 
//         (navigate('/me'))
//         :
//         <div className="primary-bg">
//         <HomeHeader/>
//         <div className="flex gap-4 h-12 min-w-3xs ">
//           <CoolButton text={"Sign-up"} clickHandler={() => navigate('/signup')}/>
//           <CoolButton text={"Login"} clickHandler={() => navigate('/login')}/>
//         </div>

//         <div className="text-white flex flex-wrap justify-center items-center gap-5">
//           <Feature title={"🧑‍💻 Developer Showcase"} desc={"Upload resumes, portfolios, GitHub — everything in one place"}/>
//           <Feature title={"💬 Real-time Chat"} desc={"Talk instantly with interested employers or devs"}/>
//           <Feature title={"📄 Resume Templates"} desc={"Beautiful, auto-formatted resumes you can download and share"}/>
//           <Feature title={"🛠️ Project Portfolios"} desc={"Add and show off your projects with screenshots and live demos"}/>
//           <Feature title={"🏢 Job Board"} desc={"Filter jobs based on role, experience, and tech stack"}/>
//         </div>

//         </div> 
//       }
//     </>
//   )
// }
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkAccessToken } from "../../utils/checkAccessToken.js";
import { useTheme } from "../../theme-provider.jsx";
import { CoolButton } from "../../components/Buttons/button.jsx";
import { Feature } from "./feature.jsx";

export default function HomePage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const checkLogin = async () => {
      const route = "/";
      const success = await checkAccessToken({ route, navigate });
      setIsLogin(success);
    };
    checkLogin();
  }, []);

  if (isLogin) {
    navigate("/me");
    return null;
  }

  // light/dark/system aware colors
  const isDark = theme === "dark";
  const bgColor = isDark ? "bg-zinc-950" : "bg-zinc-50";
  const textColor = isDark ? "text-zinc-100" : "text-zinc-800";
  const subText = isDark ? "text-zinc-400" : "text-zinc-600";

  return (
    <div className={`min-h-screen flex flex-col items-center ${bgColor} ${textColor} transition-colors duration-500`}>
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-6 mt-24 max-w-3xl">
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-tight">
          Welcome to <span className="text-blue-500">DevsCorner</span>
        </h1>
        <p className={`${subText} text-lg sm:text-xl mt-4 max-w-2xl`}>
          The community-driven platform for developers to{" "}
          <span className="text-blue-500 font-medium">connect</span>,{" "}
          <span className="text-blue-500 font-medium">share posts</span>, and
          showcase their work — all in one place.
        </p>

        <div className="flex gap-4 mt-8">
          <CoolButton text="Sign Up" clickHandler={() => navigate("/signup")} />
          <CoolButton text="Login" clickHandler={() => navigate("/login")} />
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-20 px-6 max-w-6xl w-full">
        <Feature
          title="🧑‍💻 Connect with Developers"
          desc="Discover and collaborate with developers worldwide, sharing ideas and skills."
        />
        <Feature
          title="💬 Post & Share"
          desc="Share thoughts, updates, or insights — build your personal dev feed."
        />
        <Feature
          title="⚡ Real-time Chat"
          desc="Talk instantly with other developers and teams. Stay connected, effortlessly."
        />
        <Feature
          title="📂 Developer Profile"
          desc="Showcase your GitHub, skills, and projects in a sleek developer profile."
        />
        <Feature
          title="🛠️ Project Portfolios"
          desc="Highlight your best projects with visuals and live demos."
        />
        <Feature
          title="🌐 Modern UI"
          desc="A fast, responsive, and minimal design for both light and dark themes."
        />
      </section>

      {/* Footer */}
      <footer
        className={`mt-24 py-6 text-center text-sm transition-colors duration-300 w-full border-t ${
          isDark
            ? "border-zinc-800 text-zinc-400"
            : "border-zinc-200 text-zinc-500"
        }`}
      >
        © {new Date().getFullYear()} <span className="font-semibold text-blue-500">DevsCorner</span> — Built for Developers.
      </footer>
    </div>
  );
}
