"use client";

import Image from "next/image";
import happyWoman from "@/assets/happywoman.png";
import backgroundImg from "@/assets/background.png";
import { useState, useEffect } from "react";

function getTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
  return `${formattedHours}:${minutes}:${seconds} ${ampm}`; 
}

function getGreeting() {
  const now = new Date();
  const hours = now.getHours();
  
  if (hours >= 5 && hours < 12) {
    return {
      greeting: "Good morning",
      message: "Hope you have a productive day ahead!"
    };
  } else if (hours >= 12 && hours < 17) {
    return {
      greeting: "Good afternoon", 
      message: "Keep up the great work!"
    };
  } else if (hours >= 17 && hours < 21) {
    return {
      greeting: "Good evening",
      message: "Time to wrap up and relax!"
    };
  } else {
    return {
      greeting: "Good night",
      message: "Working late? Don't forget to rest!"
    };
  }
}

export default function CardWelcomeComponent() {
  const [time, setTime] = useState(null); // start with null to avoid hydration errors
  const [greetingData, setGreetingData] = useState({ greeting: "", message: "" });

  useEffect(() => {
    const updateTimeAndGreeting = () => {
      setTime(getTime());
      setGreetingData(getGreeting());
    };

    updateTimeAndGreeting(); // set immediately after mount

    const intervalId = setInterval(updateTimeAndGreeting, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative rounded-2xl mt-[-32px] mb-2 overflow-hidden">
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
              {greetingData.greeting} <strong>{time}</strong>
            </p>
            <br />
            {greetingData.message}
          </div>
        </div>

        {/* Right Side Image */}
        <Image className="w-[150px]" src={happyWoman} alt="happy woman" />
      </div>
    </div>
  );
}