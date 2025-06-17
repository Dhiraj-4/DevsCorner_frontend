import { motion } from "framer-motion";
import { Timer } from '../loaders/timer.jsx';
import { getOtpHandler } from '../../utils/signupPageHandlers.js';
import { useAuthStore } from "../../store/authStore.js";

export function OtpInput() {

  const { otpVerificationToken, otp, setOtp, resending, setResending } = useAuthStore();

  const classes = resending
    ? 'text-blue-500 px-2 font-bold'
    : 'text-blue-200 px-2 font-bold opacity-40 cursor-not-allowed';

  const handleResend = async () => {
    await getOtpHandler(); // Call your resend logic
    setResending(false); // Disable resend button again
  };

  return (
    <>
    {otpVerificationToken && (
        <div className="space-y-2 min-w-full">
          <motion.input
            type="text"
            name="otp"
            required
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white placeholder-zinc-500 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-sky-500 ring-offset-2 ring-offset-zinc-900 transition duration-200"
            autoComplete="otp"
            maxLength={6}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            whileFocus={{ scale: 1.01 }}
          />
          <button
          onClick={handleResend}
          disabled={!resending}
          className={`${classes}`}>
            resend  
          </button>
          <Timer/>
          </div>)
    }
    </>
  )
}