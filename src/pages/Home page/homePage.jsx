import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { HomeHeader } from "../../components/headers/homePageHeader.jsx";
import { CoolButton } from "../../components/Buttons/button.jsx";
import { Feature } from "./feature.jsx";
import { checkAccessToken } from "../../utils/checkAccessToken.js";

export default function HomePage() {

  const navigate = useNavigate();
  const [ isLogin, setIsLogin ] = useState();

  useEffect( () => {
    const checkLogin = async() => {
      const route = '/';
      const success = await checkAccessToken({route, navigate});
      setIsLogin(success);
    }
    checkLogin();
  },[]);
  return (
    <>
      {
        isLogin ? 
        (navigate('/me'))
        :
        <div className="primary-bg">
        <HomeHeader/>
        <div className="flex gap-4 h-12 min-w-3xs ">
          <CoolButton text={"Sign-up"} onClick={() => navigate('/signup')}/>
          <CoolButton text={"Login"} onClick={() => navigate('/login')}/>
        </div>

        <div className="text-white flex flex-wrap justify-center items-center gap-5">
          <Feature title={"🧑‍💻 Developer Showcase"} desc={"Upload resumes, portfolios, GitHub — everything in one place"}/>
          <Feature title={"💬 Real-time Chat"} desc={"Talk instantly with interested employers or devs"}/>
          <Feature title={"📄 Resume Templates"} desc={"Beautiful, auto-formatted resumes you can download and share"}/>
          <Feature title={"🛠️ Project Portfolios"} desc={"Add and show off your projects with screenshots and live demos"}/>
          <Feature title={"🏢 Job Board"} desc={"Filter jobs based on role, experience, and tech stack"}/>
        </div>

        </div> 
      }
    </>
  )
}