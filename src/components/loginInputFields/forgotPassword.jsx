import { useNavigate } from "react-router-dom";

export function ForgotPassword() {
    const navigate = useNavigate();

    function handleForget() {
    navigate('/forgot-password')
  }

  return (
    <>
    <button
    type="button"
    onClick={handleForget}
    className="text-blue-500 min-w-full flex font-bold hover:underline">
        forgot password
    </button>
    </>
  )
}