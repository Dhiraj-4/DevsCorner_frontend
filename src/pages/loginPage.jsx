import { useNavigate } from "react-router-dom";
import { CoolButton } from "../components/Buttons/button.jsx";
import { ButtonText } from "../components/Buttons/loginButtonText.jsx";
import { LoginError } from "../components/errors/loginError.jsx";
import { LoginHeader } from "../components/headers/loginPageHeader.jsx";
import { IdentifierInput } from "../components/loginInputFields/identifierInput.jsx";
import { PasswordInput } from "../components/loginInputFields/passwordInput.jsx";
import { loginHandler } from "../utils/loginPageHandlers.js";

export function LoginPage() {

    const navigate = useNavigate();
    return (
        <div className="flex justify-center items-center flex-col min-h-screen bg-zinc-950 text-white px-4 sm:px-6 md:px-8">
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
            className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl flex flex-col justify-center items-center gap-4 p-6 sm:p-8 md:p-10 bg-zinc-900 border border-zinc-800 rounded-xl shadow-[0_0_12px_#0ea5e9]"
          >
            <LoginError/>
            <IdentifierInput/>
            <PasswordInput/>
            <CoolButton text={<ButtonText/>}/>

            <a href="/signup" className="text-sm sm:text-base mt-2">
              Don't have an account?{" "}
              <li className="inline text-blue-500 font-bold hover:underline">Signup</li>
            </a>
          </form>
        </div>
    )
}