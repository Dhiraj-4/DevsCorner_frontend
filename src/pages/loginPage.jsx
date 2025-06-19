import { useNavigate } from "react-router-dom";
import { CoolButton } from "../components/Buttons/button.jsx";
import { ButtonText } from "../components/Buttons/loginButtonText.jsx";
import { LoginHeader } from "../components/headers/loginPageHeader.jsx";
import { IdentifierInput } from "../components/loginInputFields/identifierInput.jsx";
import { PasswordInput } from "../components/loginInputFields/passwordInput.jsx";
import { loginHandler } from "../utils/loginPageHandlers.js";
import { Error } from "../components/errors/error.jsx";

export function LoginPage() {

    const navigate = useNavigate();
    return (
        <div className="primary-bg">
        <LoginHeader/>
          <form
            action="/me"
            onSubmit={async(e) => {
            e.preventDefault();
            const success = await loginHandler();
            if(success) {
                navigate('/me');
            }
          }}
            className="primary-form"
          >
            <Error/>
            <IdentifierInput/>
            <PasswordInput/>
            <CoolButton text={<ButtonText/>}/>

            <a href="/signup" className="text-white font-bold text-sm sm:text-base mt-2">
              Don't have an account?{" "}
              <li className="inline text-blue-500 font-bold hover:underline">Signup</li>
            </a>
          </form>
        </div>
    )
}