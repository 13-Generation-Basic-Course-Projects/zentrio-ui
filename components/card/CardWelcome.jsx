"use client";

import { createSwapy } from "swapy";
import React, { useState, useRef, useEffect } from "react";
import {
  Calendar,
  FileText,
  Kanban,
  Workflow,
  ChevronLeft,
  ChevronRight,
  Plus,
  MoreHorizontal,
} from "lucide-react";
import ClockWeather from "../announcementCompo/ClockWheather";
import clearday from "@/assets/weathericon/clear-day.png";
import clearnight from "@/assets/weathericon/clear-night.png";
import cloudy from "@/assets/weathericon/cloudy.png";
import overcast from "@/assets/weathericon/Overcast.png";
import heavyrain from "@/assets/weathericon/heavy-showers.png";
import thunderstorm from "@/assets/weathericon/thunderstorm-showers.png";
import cloudyday from "@/assets/weathericon/partly-cloudy-day.png";
import cloudynight from "@/assets/weathericon/partly-cloudy-night.png";

import clock from "@/assets/clock.png";
import Image from "next/image";

// Format current day/time
function formatDateTime(date) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const d = new Date(date);
  const hours = d.getHours();
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  const ampm = hours >= 12 ? "PM" : "AM";

  return {
    day: days[d.getDay()],
    date: `${d.getMonth() + 1}/${d.getDate()}`,
    hour: hour12.toString().padStart(2, "0"),
    minute: d.getMinutes().toString().padStart(2, "0"),
    ampm,
    hour24: hours,
  };
}

// Return gradient background based on weather type and time
function getWeatherColor(condition, hour) {
  const isDay = hour >= 6 && hour < 18;

  switch (condition) {
    case "Clear":
    case "Sunny":
      return isDay
        ? "from-[#56CCF2] to-[#2F80ED]" // Bright sky blue to royal blue
        : "from-[#0F2027] via-[#203A43] to-[#2C5364]"; // Deep night gradient

    case "Clouds":
      return isDay
        ? "from-[#59BAD5] via-[#59BAD5] to-[#FFFFFF]" // Light cloudy to steel blue
        : "from-[#2C3E50] to-[#59BAD5]"; // Cool dusk shades

    case "Overcast":
      return "from-[#757F9A] to-[#59BAD5]"; // Overcast greyish-blue

    case "Rain":
    case "Drizzle":
      return "from-[#3a7bd5] to-[#59BAD5]"; // Fresh rain blue shades

    case "Thunderstorm":
    case "Lightning":
      return "from-[#59BAD5] to-[#59BAD5]"; // Dark stormy blues

    case "Snow":
      return "from-[#59BAD5] to-[#59BAD5]"; // Soft icy whites & blues

    default:
      return "from-[#59BAD5] to-[#59BAD5]"; // fallback: refreshing cyan shades
  }
}

// Return icon path based on weather condition
function getCustomWeatherIcon(condition, hour) {
  const isDay = hour >= 6 && hour < 18;

  switch (condition) {
    case "Clear":
    case "Sunny":
      return isDay ? clearday : clearnight;

    case "Clouds":
      return isDay ? cloudyday : cloudynight;

    case "Overcast":
      return overcast;

    case "Rain":
    case "Drizzle":
      return heavyrain;

    case "Thunderstorm":
    case "Lightning":
      return thunderstorm;

    default:
      return cloudy; // fallback for unknown condition
  }
}


export default function TeamCardWelcome() {
  const swapy = useRef(null);
  const container = useRef(null);
  const [time, setTime] = useState(new Date());
    const [weather, setWeather] = useState(null);
  
    useEffect(() => {
      const interval = setInterval(() => setTime(new Date()), 1000);
      return () => clearInterval(interval);
    }, []);
  
    useEffect(() => {
      const apiKey = "247a59dc9dfeb4159eb6e357fc7d0e41"; // replace with your API key
      const city = "Phnom Penh";
  
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.cod !== 200) {
            console.error("Weather API error:", data.message);
            return;
          }
          setWeather(data);
        })
        .catch((err) => console.error("Weather fetch error:", err));
    }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (container.current) {
        swapy.current = createSwapy(container.current);
        swapy.current.onSwap((event) => {
          console.log("swap", event);
        });
      }
    }, 100);

    return () => {
      clearTimeout(timeout);
      swapy.current?.destroy();
    };
  }, []);

  // Components

  const FourStageWorkflow = () => (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rounded-large h-full">
      {/* <div className="flex items-center gap-2 mb-4">
        <Workflow className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-blue-800">Project Workflow</h3>
      </div> */}
    </div>
  );

  const CalendarView = () => {
    const today = new Date();

    const formattedDate = today.toLocaleDateString("en-US", {
      weekday: "long", // e.g., Monday
      year: "numeric", // e.g., 2025
      month: "long", // e.g., June
      day: "numeric", // e.g., 23
    });

    return (
      <div className="bg-gradient-to-br from-purple-50 to-violet-100 p-4 rounded-large h-full">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-8 h-8 text-green-600 mb-2" />
          <h3 className="text-lg font-semibold text-green-800 mb-1">Today</h3>
        </div>
        <div className="flex flex-col">
          <p className="text-green-700 text-sm">{today.getDay()}</p>
        </div>
      </div>
    );
  };

  const DocumentManager = () => (
    <div className="bg-gradient-to-br from-purple-50 to-violet-100 p-4 rounded-large h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-purple-800">Documents</h3>
        </div>
      </div>
    </div>
  );

  const { day, date, hour, minute, ampm, hour24 } = formatDateTime(time);
  const temperature = weather?.main?.temp;
  const weatherDesc = weather?.weather?.[0]?.description;
  const weatherMain = weather?.weather?.[0]?.main;
  const feelsLike = weather?.main?.feels_like;
  const humidity = weather?.main?.humidity;

  const weatherGradient = getWeatherColor(weatherMain, hour24);
  const weatherIcon = getCustomWeatherIcon(weatherMain, hour24);
  return (
    <div
      ref={container}
      className="grid grid-cols-4 grid-rows-2 gap-4 p-4 mt-2"
    >
      <div  className="rounded-large col-span-3">
        <div  className="rounded-large h-44">
          {/* Weather Card */}
          <div
            className={`col-span-2 row-span-2 bg-gradient-to-br ${weatherGradient} rounded-2xl p-4 text-white flex flex-col justify-between shadow-lg transition-all duration-500`}
          >
            <div className="flex items-center justify-between text-sm">
              <span>{`${day}, ${date}`}</span>
              {weather?.name && weather?.sys?.country && (
                <span className="ml-2 text-xs bg-white/20 px-3 py-0.5 rounded-full">
                  {weather.name}, {weather.sys.country}
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 mt-2">
              <Image
                src={weatherIcon}
                alt={weatherDesc || "Weather"}
                height={106}
                className="drop-shadow-md"
              />
              <div>
                <div className="text-4xl font-bold leading-tight">
                  {temperature ? `${Math.round(temperature)}°C` : "--"}
                </div>
                <div className="text-xl capitalize">
                  {weatherDesc || "Loading..."}
                </div>
                {feelsLike && humidity && (
                  <div className="text-sm mt-1">
                    {`Feels like: ${Math.round(
                      feelsLike
                    )}°C | Humidity: ${humidity}%`}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div data-swapy-slot="b" className="rounded-large">
        <div data-swapy-item="b" className="rounded-large h-44">
          <DocumentManager />
        </div>
      </div>
      <div className="rounded-large">
        <div className="rounded-large h-44">
          <CalendarView />
        </div>
      </div>

      <div data-swapy-slot="d" className="rounded-large col-span-3">
        <div data-swapy-item="d" className="rounded-large h-44">
          <FourStageWorkflow/>
        </div>
      </div>
    </div>
  );
}
