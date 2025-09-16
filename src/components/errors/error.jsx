import { useAuthStore } from "../../store/authStore.js";

export function Error() {

    const { error } = useAuthStore();
    
    return (
        <>
        {
            error &&
            <div className="text-red-500 font-bold">
                {error}
            </div>
        }
        </>
    )
}