import { useAuthStore } from "../../store/authStore.js";

export function LoginError() {

    const { error } = useAuthStore();
    
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