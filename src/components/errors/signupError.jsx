import { useSignupStore } from "../../store/signupStore"

export function SignupError() {

    const { error } = useSignupStore();
    
    return (
        <>
        {
            error &&
            <div className="text-red-500 font-bold">
                {error.message}
            </div>
        }
        </>
    )
}