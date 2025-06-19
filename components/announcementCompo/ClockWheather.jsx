"use client";

import Image from "next/image";
import clock from "@/assets/clock.png"
import React, { useState, useEffect } from "react";

// formatting time
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
  };
}

// weather condition gradient
function getWeatherColor(condition) {
  switch (condition) {
    case "Clear":
      return "from-yellow-300 to-yellow-500";
    case "Clouds":
      return "from-gray-300 to-gray-600";
    case "Rain":
    case "Drizzle":
      return "from-blue-400 to-blue-700";
    case "Thunderstorm":
      return "from-purple-500 to-purple-800";
    case "Snow":
      return "from-blue-100 to-blue-300";
    case "Mist":
    case "Fog":
    case "Haze":
      return "from-gray-300 to-gray-500";
    default:
      return "from-blue-300 to-blue-500";
  }
}

export default function ClockWeather() {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const apiKey = "247a59dc9dfeb4159eb6e357fc7d0e41"; // Phnom Penh API key
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

  const { day, date, hour, minute, ampm } = formatDateTime(time);
  const temperature = weather?.main?.temp;
  const weatherDesc = weather?.weather?.[0]?.description;
  const weatherMain = weather?.weather?.[0]?.main;
  const weatherIcon = weather?.weather?.[0]?.icon;
  const feelsLike = weather?.main?.feels_like;
  const humidity = weather?.main?.humidity;

  const weatherGradient = getWeatherColor(weatherMain);

  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-4 p-7">
      {/* Weather */}
      <div
        className={`col-span-2 row-span-2 bg-gradient-to-br ${weatherGradient} rounded-2xl p-4 text-white flex flex-col justify-between shadow-sm transition-all duration-500`}
      >
        <div className="text-sm">{`${day} ${date}`}</div>
        <div className="flex items-center gap-4">
          {weatherIcon && (
            <img
              src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
              alt={weatherDesc}
              className="w-16 h-16"
            />
          )}
          <div>
            <div className="text-4xl font-bold leading-tight">
              {temperature ? `${Math.round(temperature)}°C` : "--"}
            </div>
            <div className="text-xl capitalize">
              {weatherDesc || "Loading..."}
            </div>
            {feelsLike && humidity && (
              <div className="text-sm mt-1">{`Feels like: ${Math.round(
                feelsLike
              )}°C | Humidity: ${humidity}%`}</div>
            )}
          </div>
        </div>
      </div>

      {/* Clock */}
      <div className="bg-white rounded-2xl flex flex-col items-center justify-center shadow-sm p-4 text-2xl font-bold">
        {hour}:{minute}
        <span className="text-sm font-normal">{ampm}</span>
      </div>

      {/* Date */}
      <div className="bg-white rounded-2xl text-center shadow-sm p-4">
        <div className="text-red-500 text-sm font-medium">{day}</div>
        <div className="text-2xl font-bold">{date.split("/")[1]}</div>
      </div>

      {/* time + date */}
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
