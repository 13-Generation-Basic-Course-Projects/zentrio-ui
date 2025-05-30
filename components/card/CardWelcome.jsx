"use client";


import Image from "next/image";
import happyWoman from "@/assets/happywoman.png";
import backgroundImg from "@/assets/background.png";
import { useState, useMemo, useEffect } from "react";

function getTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
  return `${formattedHours}:${minutes}:${seconds} ${ampm}`; 
}


export default function CardWelcomeComponent() {
  const [time, setTime] = useState(null); // start with null to avoid hydration errors

  useEffect(() => {
    setTime(getTime()); // set immediately after mount

    const intervalId = setInterval(() => {
      setTime(getTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

 

  return (
    <div className="relative rounded-2xl mt-[-32px]  mb-2 overflow-hidden">
      {/* Background Image */}
      <Image
        className="w-full"
        src={backgroundImg}
        alt="background in workspace"
      />

      {/* Overlay Content: Text Left, Image Right */}
      <div className="absolute inset-0 flex items-center justify-between px-10">
        {/* Left Side Text */}
        <div>
          <h1 className="text-h4 text-white font-bold mb-2">
            Hello welcome to <br /> Zentrio System
          </h1>
          <div className="text-white text-sm">
            <p>
              Good morning <strong>{time}</strong>
            </p>
            <br />
            please enjoy your nice day!
          </div>
        </div>

        {/* Right Side Image */}
        <Image className="w-[150px]" src={happyWoman} alt="happy woman" />
      </div>
    </div>
  );
}