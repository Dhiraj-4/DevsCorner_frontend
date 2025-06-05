import { useEffect, useState } from "react";
import { useSignupStore } from "../../store/signupStore";

export function Timer() {
  const [timer, setTimer] = useState(2 * 60 * 1000); // 2 Minutes
  const { setResending } = useSignupStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1000) {
          clearInterval(interval);
          setResending(true);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval); // clean on unmount
  }, []); // only once

  const minutes = Math.floor(timer / 60000);
  const seconds = Math.floor((timer / 1000) % 60);

  return (
    <div className="inline">
      {minutes}:{seconds.toString().padStart(2, "0")}
    </div>
  );
}