import { useLoginStore } from "../../store/loginStore.js"

export function LoginError() {

    const { error } = useLoginStore();
    
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