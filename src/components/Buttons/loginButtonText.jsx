import { useAuthStore } from "../../store/authStore.js";
import { IsLoadingSvg } from "../loaders/isLoadingSvg.jsx";

export function ButtonText() {

    const { isLoading } = useAuthStore();

    return(
        <>
        {isLoading ? (
        <IsLoadingSvg/>
      ) : (
        "Login"
      )}
        </>
    )
}