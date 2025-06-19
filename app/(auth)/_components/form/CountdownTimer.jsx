import { useEffect, useState, useRef } from "react";

export const CountdownTimer = ({ duration = 180, onResend }) => {
  const [remainingTime, setRemainingTime] = useState(0);
  const [loading, setLoading] = useState(false);
  const intervalRef = useRef(null);

  const startTimer = () => {
    // Clear any existing interval before starting a new one
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const saved = localStorage.getItem("code_expiry");
    let expiry =
      saved && parseInt(saved, 10) > Date.now()
        ? parseInt(saved, 10)
        : Date.now() + duration * 1000;

    localStorage.setItem("code_expiry", expiry.toString());

    setRemainingTime(Math.floor((expiry - Date.now()) / 1000));

    intervalRef.current = setInterval(() => {
      const diff = Math.floor((expiry - Date.now()) / 1000);
      if (diff <= 0) {
        setRemainingTime(0);
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        localStorage.removeItem("code_expiry");
      } else {
        setRemainingTime(diff);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [duration]);

  const handleClick = async () => {
    if (remainingTime === 0 && !loading) {
      setLoading(true);
      try {
        await onResend?.();

        // Restart the timer after resend
        const nextExpiry = Date.now() + duration * 1000;
        localStorage.setItem("code_expiry", nextExpiry.toString());
        startTimer();
      } catch (err) {
        console.error("Resend failed:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
      2,
      "0"
    )}`;

  return (
    <span
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      aria-disabled={loading || remainingTime > 0}
      className={`text-body ${
        remainingTime === 0 && !loading
          ? "text-primary underline cursor-pointer"
          : "text-gray-500 cursor-default"
      }`}>
      {loading
        ? "Sending..."
        : remainingTime > 0
        ? `Send Code again : ${formatTime(remainingTime)}`
        : "Send Code again"}
    </span>
  );
};
