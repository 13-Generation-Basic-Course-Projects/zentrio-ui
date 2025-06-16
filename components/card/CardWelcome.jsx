"use client";

import Image from "next/image";
import happyWoman from "@/assets/happywoman.png";
import backgroundImg from "@/assets/background.svg";
import { useState, useEffect } from "react";
import { FaSun, FaCloudSun, FaMoon, FaBed } from "react-icons/fa";

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
  const hours = new Date().getHours();

  if (hours >= 5 && hours < 12) {
    return {
      greeting: "Good morning",
      message: "Hope you have a productive day ahead!",
      icon: <FaSun className="inline text-yellow-400 ml-2" />,
    };
  } else if (hours >= 12 && hours < 17) {
    return {
      greeting: "Good afternoon",
      message: "Keep up the great work!",
      icon: <FaCloudSun className="inline text-yellow-500 ml-2" />,
    };
  } else if (hours >= 17 && hours < 21) {
    return {
      greeting: "Good evening",
      message: "Time to wrap up and relax!",
      icon: <FaMoon className="inline text-purple-700 ml-2" />,
    };
  } else {
    return {
      greeting: "Good night",
      message: "Working late? Don't forget to rest!",
      icon: <FaBed className="inline text-blue-500 ml-2 size-5" />,
    };
  }
}

export default function CardWelcomeComponent() {
  const [time, setTime] = useState(null);
  const [greetingData, setGreetingData] = useState({
    greeting: "",
    message: "",
  });

  useEffect(() => {
    const updateTimeAndGreeting = () => {
      setTime(getTime());
      setGreetingData(getGreeting());
    };

    updateTimeAndGreeting();
    const intervalId = setInterval(updateTimeAndGreeting, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative rounded-large  mt-5 mb-2 overflow-hidden ">
      <img
        className="w-full h-[330px]"
        // src={backgroundImg}
        src={`https://i.pinimg.com/736x/49/98/82/499882ec269b59924a749ada5fb88dcf.jpg`}
        alt="background in workspace"
        // priority
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex items-center justify-between px-10">
        {/* Left: Greeting */}
        <div>
          <h1 className="text-h4 text-white font-bold mb-2 leading-tight">
            Hello, welcome to <br />
            <span>
              Zentrio System
            </span>
          </h1>

          <div className="text-white text-sm">
            <p className="flex items-center space-x-2">
              <span>{greetingData.greeting}</span>
              <span className="text-lg">{greetingData.icon}</span>
              <strong className="ml-2">{time}</strong>
            </p>
            <br />
            {greetingData.message}
          </div>
        </div>

        {/* Right: Animated Character */}
        <div className="absolute w-[250px] animate-float z-10 right-0 ">
          <Image className="w-full" src={happyWoman} alt="happy woman" />
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes textZoom {
          0% {
            transform: scale(1);
            opacity: 0.9;
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0.9;
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }

        @keyframes bgZoom {
          0% {
            transform: scale(1) translateX(0);
          }
          50% {
            transform: scale(1.03) translateX(-2%);
          }
          100% {
            transform: scale(1) translateX(0);
          }
        }

        .animate-textZoom {
          animation: textZoom 20s ease-in-out infinite;
          transform-origin: center;
          will-change: transform, opacity;
          display: inline-block;
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
          display: inline-block;
          will-change: transform;
        }
      `}</style>
    </div>
  );
}
