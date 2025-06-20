"use client";

import Image from "next/image";

import clearday from "@/assets/weathericon/clear-day.png";
import clearnight from "@/assets/weathericon/clear-night.png";
import cloudy from "@/assets/weathericon/cloudy.png";
import overcast from "@/assets/weathericon/Overcast.png";
import heavyrain from "@/assets/weathericon/heavy-showers.png";
import thunderstorm from "@/assets/weathericon/thunderstorm-showers.png";
import cloudyday from "@/assets/weathericon/partly-cloudy-day.png";
import cloudynight from "@/assets/weathericon/partly-cloudy-night.png";

import clock from "@/assets/clock.png";
import React, { useState, useEffect } from "react";

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
        ? "from-[#BBD2C5] via-[#536976] to-[#292E49]" // Light cloudy to steel blue
        : "from-[#2C3E50] to-[#4CA1AF]"; // Cool dusk shades

    case "Overcast":
      return "from-[#757F9A] to-[#D7DDE8]"; // Overcast greyish-blue

    case "Rain":
    case "Drizzle":
      return "from-[#3a7bd5] to-[#00d2ff]"; // Fresh rain blue shades

    case "Thunderstorm":
    case "Lightning":
      return "from-[#141E30] to-[#243B55]"; // Dark stormy blues

    case "Snow":
      return "from-[#E0EAFC] to-[#CFDEF3]"; // Soft icy whites & blues

    default:
      return "from-[#B2FEFA] to-[#0ED2F7]"; // fallback: refreshing cyan shades
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

export default function ClockWeather() {
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

  const { day, date, hour, minute, ampm, hour24 } = formatDateTime(time);
  const temperature = weather?.main?.temp;
  const weatherDesc = weather?.weather?.[0]?.description;
  const weatherMain = weather?.weather?.[0]?.main;
  const feelsLike = weather?.main?.feels_like;
  const humidity = weather?.main?.humidity;

  const weatherGradient = getWeatherColor(weatherMain, hour24);
  const weatherIcon = getCustomWeatherIcon(weatherMain, hour24);

  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-4 p-7">
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
            width={64}
            height={64}
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

      {/* Clock Card */}
      <div className="bg-white rounded-2xl flex flex-col items-center justify-center shadow-sm p-4 text-2xl font-bold">
        {hour}:{minute}
        <span className="text-sm font-normal">{ampm}</span>
      </div>

      {/* Day Card */}
      <div className="bg-white rounded-2xl text-center shadow-sm p-4">
        <div className="text-red-500 text-sm font-medium">{day}</div>
        <div className="text-2xl font-bold">{date.split("/")[1]}</div>
      </div>

      {/* Footer */}
      <div className="col-span-3 bg-white shadow-sm rounded-2xl p-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <Image src={clock} alt="clock" width={30} height={30} />
          {hour}:{minute} <span className="text-base font-normal">{ampm}</span>
        </div>
        <div className="text-sm text-right text-gray-600">
          <div>{date}</div>
          <div className="text-primary">{day}</div>
        </div>
      </div>
    </div>
  );
}
