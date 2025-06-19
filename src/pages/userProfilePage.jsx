import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkAccessToken } from "../utils/checkAccessToken.js";

export default function userProfilePage() {
  const navigate = useNavigate();
  const [ isLogin, setIsLogin ] = useState(false);

  useEffect( () => {
    const fetchUser = async() => {
      const success = await checkAccessToken({navigate});
      setIsLogin(success);
    }
    fetchUser();
  },[]);

  return (
    <>
      {
        isLogin &&
        <div className="text-white font-bold absolute top-16">
          Welcome
        </div>
        
      }
    </>
  )
}