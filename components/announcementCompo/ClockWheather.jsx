"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

import clearday from "@/assets/weathericon/clear-day.png";
import clearnight from "@/assets/weathericon/clear-night.png";
import cloudy from "@/assets/weathericon/cloudy.png";
import overcast from "@/assets/weathericon/overcast.png";
import heavyrain from "@/assets/weathericon/heavy-showers.png";
import thunderstorm from "@/assets/weathericon/thunderstorm-showers.png";
import cloudyday from "@/assets/weathericon/partly-cloudy-day.png";
import cloudynight from "@/assets/weathericon/partly-cloudy-night.png";
import clock from "@/assets/clock.png";

// Format current time
function formatDateTime(date) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
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

// Get background gradient
function getWeatherColor(condition, hour) {
  const isDay = hour >= 6 && hour < 18;
  switch (condition) {
    case "Clear":
    case "Sunny":
      return isDay ? "from-[#A8EDFF] to-[#4FB4FF]" : "from-[#14415A] to-[#1C5A7A]";
    case "Clouds":
    case "Broken Clouds":
      return isDay ? "from-[#B3E5F6] to-[#5CB8F0]" : "from-[#1C3D59] to-[#2D628A]";
    case "Overcast":
      return isDay ? "from-[#A0D6E9] to-[#4D9FD6]" : "from-[#173548] to-[#2C5F80]";
    case "Rain":
    case "Drizzle":
      return isDay ? "from-[#7AD3F2] to-[#369DDC]" : "from-[#0F2E44] to-[#235B82]";
    case "Thunderstorm":
    case "Lightning":
      return isDay ? "from-[#5AB4E0] to-[#2479C3]" : "from-[#0B263A] to-[#1E4F7A]";
    case "Snow":
      return isDay ? "from-[#D4F5FF] to-[#9DDCF9]" : "from-[#2A4D65] to-[#5A9BC3]";
    default:
      return isDay ? "from-[#A8EDFF] to-[#4FB4FF]" : "from-[#14415A] to-[#1C5A7A]";
  }
}

// Get icon based on condition and time
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
      return cloudy;
  }
}

export default function ClockWeather() {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState(null);
  const [tomorrowForecast, setTomorrowForecast] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const apiKey = "247a59dc9dfeb4159eb6e357fc7d0e41";
    const city = "Phnom Penh";

    // Current weather
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.cod !== 200) {
          console.error("Weather API error:", data.message);
          return;
        }
        setWeather(data);
      })
      .catch((err) => console.error("Weather fetch error:", err));

    // 5-day forecast (every 3 hours)
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        const now = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(now.getDate() + 1);
        const tomorrowStr = tomorrow.toISOString().split("T")[0];

        const forecast = data.list.find((entry) =>
          entry.dt_txt.startsWith(tomorrowStr)
        );

        setTomorrowForecast(forecast);
      })
      .catch((err) => console.error("Forecast fetch error:", err));
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
                {`Feels like: ${Math.round(feelsLike)}°C`}
                <br />
                {`Humidity: ${humidity}%`}
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

      {/* Footer - Tomorrow's Forecast */}
      <div className="col-span-3 bg-gradient-to-r from-primary to-white shadow-sm rounded-2xl p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {tomorrowForecast?.weather?.[0]?.main && (
            <Image
              src={getCustomWeatherIcon(tomorrowForecast.weather[0].main, 12)}
              alt="Tomorrow Icon"
              width={36}
              height={36}
            />
          )}
          <div className="text-sm">
            <div className="text-gray-800 font-semibold">Tomorrow</div>
            <div className="text-white capitalize">
              {tomorrowForecast?.weather?.[0]?.description || "--"}
            </div>
          </div>
        </div>
        <div className="text-right text-gray-700 text-lg font-bold">
          {tomorrowForecast?.main?.temp
            ? `${Math.round(tomorrowForecast.main.temp)}°C`
            : "--"}
        </div>
      </div>
    </div>
  );
}
