import { useEffect, useState } from "react";

export default function Countdown() {
  const targetDate = new Date();

  // Ends in 3 days
  targetDate.setDate(targetDate.getDate() + 3);

  const calculateTime = () => {
    const difference = targetDate - new Date();

    if (difference <= 0) {
      return {
        hours: "00",
        minutes: "00",
        seconds: "00",
      };
    }

    return {
      hours: String(
        Math.floor((difference / (1000 * 60 * 60)) % 24)
      ).padStart(2, "0"),

      minutes: String(
        Math.floor((difference / (1000 * 60)) % 60)
      ).padStart(2, "0"),

      seconds: String(
        Math.floor((difference / 1000) % 60)
      ).padStart(2, "0"),
    };
  };

  const [time, setTime] = useState(calculateTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-3">

      {[
        {
          label: "Hours",
          value: time.hours,
        },
        {
          label: "Min",
          value: time.minutes,
        },
        {
          label: "Sec",
          value: time.seconds,
        },
      ].map((item) => (
        <div
          key={item.label}
          className="
            flex
            w-16
            flex-col
            items-center
            rounded-xl
            bg-[#102B52]
            px-3
            py-2
            text-white
          "
        >
          <span className="text-xl font-bold">
            {item.value}
          </span>

          <span className="text-[11px] uppercase text-slate-300">
            {item.label}
          </span>
        </div>
      ))}

    </div>
  );
}