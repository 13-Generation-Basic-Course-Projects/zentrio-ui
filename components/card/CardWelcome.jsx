"use client";

import { createSwapy } from "swapy";
import React, { useState, useRef, useEffect } from "react";

import clearday from "@/assets/weathericon/clear-day.png";
import clearnight from "@/assets/weathericon/clear-night.png";
import cloudy from "@/assets/weathericon/cloudy.png";
import overcast from "@/assets/weathericon/overcast.png";
import heavyrain from "@/assets/weathericon/heavy-showers.png";
import thunderstorm from "@/assets/weathericon/thunderstorm-showers.png";
import cloudyday from "@/assets/weathericon/partly-cloudy-day.png";
import cloudynight from "@/assets/weathericon/partly-cloudy-night.png";
import zentrioLogo from "@/public/image/Zentrio-Logo.svg";
import calendarIcon from "@/public/image/calendar.svg";
import kanbanIcon from "@/public/image/kanban.svg";
import docsIcon from "@/public/image/docs.svg";
import reportIcon from "@/assets/report.png";
import { Sparkles } from "lucide-react";

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
        ? "from-primary/80 via-primary/50 to-[#FFFFFF]" // Light cloudy to steel blue
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

  const FourStageWorkflow = () => {
    return (
      <div className="bg-gradient-to-br from-primary/10 via-primary/20 to-primary/60 p-3 rounded-3xl h-full shadow-lg  -white/20 flex items-center justify-center">
        <div>
          <p>Make your work keep in one place</p>
        </div>
      </div>
    );
  };

 
 

  const CalendarView = () => {
    const today = new Date();

    return (
      <div className="relative bg-gradient-to-bl from-primary/10 via-primary/20 to-primary/80 p-6 rounded-3xl h-full shadow-lg  -white/20">
        {/* Month and Year */}
        <div className="flex flex-row items-start space-x-3 mb-3">
          <p className="text-xl uppercase font-semibold text-gray-700">
            {today.toLocaleDateString("en-US", { month: "long" })}
          </p>
          <p className="text-lg font-bold text-gray-700">
            {today.getFullYear()}
          </p>
        </div>

        {/* Day and Weekday */}
        <div className="absolute left-[8%] top-[36%] flex items-baseline space-x-2 justify-center">
          <p className="text-[50px] font-bold text-white">{today.getDate()}</p>
          <p className="text-h5 uppercase text-white">
            {today.toLocaleDateString("en-US", { weekday: "short" })}
          </p>
        </div>

        {/* Hour at Top-Right */}
        <div className="absolute top-36 right-6 text-right">
          <p className="text-lg font-semibold text-gray-700">
            {today.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    );
  };


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
      <div className="rounded-large col-span-3">
        <div className="rounded-large h-44">
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
      <div data-swapy-slot="b" className="rounded-3xl">
        <div
          data-swapy-item="b"
          className="rounded-3xl h-44 hover:scale-[1.01] transition-transform duration-300"
        >
          <div className="bg-gradient-to-tr from-primary/20 via-primary/30 to-primary/90 p-6 rounded-3xl h-full shadow-xl ">
            <div className="flex flex-col items-center justify-center h-full space-y-3">
              <Image
                src={zentrioLogo}
                alt="Zentrio Logo"
                width={150}
                height={150}
                className="drop-shadow-md"
              />
              <p className="text-center text-white font-semibold text-lg tracking-wide">
                Click in. Chill out. Work better.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-large">
        <div className="rounded-large h-44">
          <CalendarView />
        </div>
      </div>

      <div data-swapy-slot="d" className="rounded-large col-span-3">
        <div
          data-swapy-item="d"
          className="w-full rounded-large h-44 overflow-hidden border-1 border-primary"
        >
          {/* <FourStageWorkflow /> */}
          <img
            src="https://www.bitrix24.com/upload/optimizer/converted/images/content_en/tools/tasks_and_projects/index/tasks_and_projects-img-block-1.jpg.webp?1749567480869"
            alt="img promote"
            className="h-full w-full object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}
