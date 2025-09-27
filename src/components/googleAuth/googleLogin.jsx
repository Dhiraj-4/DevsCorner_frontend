import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { BACKEND_URL } from "../../../config/envConfig";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import api from "../../../config/axiosConfig.js";

export function GoogleAuth() {

    const {
        setAccessToken,
        setIsLoggedIn
    } = useAuthStore();

    const navigate = useNavigate();

    return (
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          try {
            const { data } = await api.post(`${BACKEND_URL}auth/google`, {
              token: credentialResponse.credential,
            });
            console.log("Backend response good");
            console.log("Access token received.")
            setAccessToken(data.info);
            setIsLoggedIn(true);
            navigate('/me');
          } catch (error) {
            console.error(
              "Error while sending token:",
              error.response?.data || error.message
            );
          }
        }}
        onError={() => console.log("Login Failed")}
      />
    );
}
