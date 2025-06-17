"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Sun,
  CloudSun,
  Moon,
  Bed,
  Users,
  CheckSquare,
  Clock,
} from "lucide-react";

const formatTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
  return `${formattedHours}:${minutes} ${ampm}`;
};

const formatDate = () => {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return now.toLocaleDateString("en-US", options);
};

const getGreetingData = () => {
  const hours = new Date().getHours();

  if (hours >= 5 && hours < 12) {
    return {
      greeting: "Good Morning",
      message: "Let's start the day with your team goals!",
      icon: <Sun className="text-yellow-400 w-6 h-6" />,
      bgColor: "from-blue-50 via-indigo-50 to-purple-50",
      accentColor: "bg-yellow-100",
      textColor: "text-gray-800",
      timeColor: "text-indigo-700",
    };
  } else if (hours >= 12 && hours < 17) {
    return {
      greeting: "Good Afternoon",
      message: "Keep the team momentum strong!",
      icon: <CloudSun className="text-orange-400 w-6 h-6" />,
      bgColor: "from-orange-50 via-yellow-50 to-red-50",
      accentColor: "bg-orange-100",
      textColor: "text-gray-800",
      timeColor: "text-orange-700",
    };
  } else if (hours >= 17 && hours < 21) {
    return {
      greeting: "Good Evening",
      message: "Time to review today's achievements!",
      icon: <Moon className="text-purple-400 w-6 h-6" />,
      bgColor: "from-purple-50 via-pink-50 to-rose-50",
      accentColor: "bg-purple-100",
      textColor: "text-gray-800",
      timeColor: "text-purple-700",
    };
  } else {
    return {
      greeting: "Good Night",
      message: "Rest well, new tasks await tomorrow!",
      icon: <Bed className="text-blue-400 w-6 h-6" />,
      bgColor: "from-slate-50 via-blue-50 to-indigo-50",
      accentColor: "bg-blue-100",
      textColor: "text-gray-800",
      timeColor: "text-blue-700",
    };
  }
};

// Background images data
const backgroundImages = [
  {
    url: "https://images.unsplash.com/photo-1631972756622-b2d9164c0e53?q=80&w=705&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // overlay:
    //   "bg-gradient-to-br from-blue-500/60 via-purple-500/40 to-indigo-600/60",
  },
  {
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    // overlay:
    //   "bg-gradient-to-br from-green-500/60 via-teal-500/40 to-blue-600/60",
  },
  {
    url: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    // overlay:
    //   "bg-gradient-to-br from-orange-500/60 via-red-500/40 to-pink-600/60",
  },
];

export default function TeamWelcomeCard() {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [mounted, setMounted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const greetingData = useMemo(() => getGreetingData(), []);

  useEffect(() => {
    setMounted(true);

    const updateTime = () => {
      setCurrentTime(formatTime());
      setCurrentDate(formatDate());
    };

    updateTime();
    const timeIntervalId = setInterval(updateTime, 60000); // Update every minute

    // Slideshow effect - change image every 5 seconds
    const slideshowIntervalId = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 5000);

    return () => {
      clearInterval(timeIntervalId);
      clearInterval(slideshowIntervalId);
    };
  }, []);

  if (!mounted) {
    return (
      <div className="rounded-2xl mt-6 mb-4 h-[240px] bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse shadow-sm" />
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl mt-6 mb-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
      {/* Background Images Slideshow */}
      <div className="h-[320px] w-full relative overflow-hidden">
        {backgroundImages.map((bg, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${bg.url})` }}
            />
            <div className={`absolute inset-0 ${bg.overlay}`} />
          </div>
        ))}

        {/* Animated Stars */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl z-10">
          <div className="star star-1 w-3 h-3"></div>
          <div className="star star-2 w-2 h-2"></div>
          <div className="star star-3 w-4 h-4"></div>
          <div className="star star-4 w-3 h-3"></div>
          <div className="star star-5 w-4 h-4"></div>
          <div className="star star-6 w-2 h-2"></div>
          <div className="star star-7 w-3 h-3"></div>
          <div className="star star-8 w-2 h-2"></div>
          <div className="star star-9 w-3 h-3"></div>
          <div className="star star-10 w-4 h-4"></div>
          <div className="star star-11 w-2 h-2"></div>
          <div className="star star-12 w-3 h-3"></div>
        </div>

        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-30 z-10">
          <div className="absolute top-10 left-10 w-2 h-2 bg-white/40 rounded-full"></div>
          <div className="absolute top-20 right-20 w-1 h-1 bg-white/60 rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-white/50 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-2 h-2 bg-white/40 rounded-full"></div>
        </div>

        {/* Content */}
        <div className="relative flex items-center justify-between px-8 py-8 h-full z-20">
          {/* Left Content */}
          <div className="flex-1 space-y-4">
            {/* Header Section */}
            <div>
              <h1 className="text-h2 md:text-4xl font-bold text-white mb-2 leading-tight drop-shadow-lg">
                Welcome to{" "}
                <span className="text-h1 bg-gradient-to-r from-[#59BAD5]/90 to-[#59BAD5]/80 bg-clip-text text-transparent">
                  Zentrio
                </span>
              </h1>
              <div className="flex items-center space-x-2 text-white/90">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium drop-shadow">
                  Team Task Management
                </span>
              </div>
            </div>

            {/* Greeting & Time Section */}
            <div className="space-y-3">
              {/* Greeting with Icon */}
              <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                {greetingData.icon}
                <span className="text-lg font-semibold text-white drop-shadow">
                  {greetingData.greeting}
                </span>
              </div>

              {/* Date & Time */}
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-white" />
                  <span className="text-xl font-mono text-white font-bold drop-shadow">
                    {currentTime}
                  </span>
                </div>
                <p className="text-white/90 text-sm font-medium drop-shadow">
                  {currentDate}
                </p>
              </div>

              {/* Message */}
              <p className="text-white text-base max-w-md leading-relaxed font-medium drop-shadow">
                {greetingData.message}
              </p>
            </div>
          </div>

          {/* Right Side - Team Icon */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative">
              {/* Main Circle */}
              <div className="w-32 h-32 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/30">
                <CheckSquare className="w-12 h-12 text-indigo-600" />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shadow-md">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center shadow-md">
                <Users className="w-3 h-3 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Mobile Right Side */}
          <div className="lg:hidden flex items-center">
            <div className="w-16 h-16 bg-white/60 rounded-full flex items-center justify-center backdrop-blur-sm shadow-md">
              <CheckSquare className="w-8 h-8 text-indigo-600" />
            </div>
          </div>
        </div>

        {/* Slideshow Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Star Animation Styles */}
      <style jsx>{`
        .star {
          position: absolute;
          background: white;
          clip-path: polygon(
            50% 0%,
            61% 35%,
            98% 35%,
            68% 57%,
            79% 91%,
            50% 70%,
            21% 91%,
            32% 57%,
            2% 35%,
            39% 35%
          );
          animation: twinkle 3s ease-in-out infinite;
        }

        .star-1 {
          top: 15%;
          left: 10%;
          animation-delay: 0s;
        }
        .star-2 {
          top: 25%;
          left: 80%;
          animation-delay: 0.5s;
        }
        .star-3 {
          top: 40%;
          left: 15%;
          animation-delay: 1s;
        }
        .star-4 {
          top: 60%;
          left: 70%;
          animation-delay: 1.5s;
        }
        .star-5 {
          top: 80%;
          left: 20%;
          animation-delay: 2s;
        }
        .star-6 {
          top: 30%;
          left: 60%;
          animation-delay: 2.5s;
        }
        .star-7 {
          top: 70%;
          left: 85%;
          animation-delay: 0.3s;
        }
        .star-8 {
          top: 50%;
          left: 40%;
          animation-delay: 0.8s;
        }
        .star-9 {
          top: 20%;
          left: 45%;
          animation-delay: 1.3s;
        }
        .star-10 {
          top: 85%;
          left: 55%;
          animation-delay: 1.8s;
        }
        .star-11 {
          top: 35%;
          left: 90%;
          animation-delay: 2.3s;
        }
        .star-12 {
          top: 65%;
          left: 5%;
          animation-delay: 0.6s;
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}
