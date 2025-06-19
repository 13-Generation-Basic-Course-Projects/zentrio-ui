"use client";
import React, { useState } from "react";

export default function HeroUICalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const today = new Date();

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      days.push({
        date,
        day: date.getDate(),
        isCurrentMonth: date.getMonth() === month,
        isToday: date.toDateString() === today.toDateString(),
        isSelected: date.toDateString() === selectedDate.toDateString(),
      });
    }
    return days;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const days = generateCalendar();
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthYear = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="w-full  mx-auto ">
      <div className="bg-white shadow-lg rounded-2xl border border-gray-200 p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h2 className="text-lg font-semibold text-gray-700">{monthYear}</h2>
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Week Days */}
        <div className="grid grid-cols-7 mb-2">
          {weekDays.map((day) => (
            <div
              key={day}
              className="h-8 flex items-center justify-center text-sm font-medium text-gray-500"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="space-y-1">
          {Array.from({ length: 6 }, (_, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 gap-1">
              {days
                .slice(weekIndex * 7, (weekIndex + 1) * 7)
                .map((dayInfo, dayIndex) => (
                  <div key={dayIndex} className="relative">
                    <button
                      className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm font-normal transition-all
                      ${
                        dayInfo.isToday
                          ? "bg-primary text-white font-semibold shadow-md hover:bg-primary "
                          : dayInfo.isSelected
                          ? "bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700"
                          : dayInfo.isCurrentMonth
                          ? "text-gray-700 hover:bg-gray-100"
                          : "text-gray-300 cursor-default opacity-50"
                      }
                    `}
                      onClick={() =>
                        dayInfo.isCurrentMonth && setSelectedDate(dayInfo.date)
                      }
                      disabled={!dayInfo.isCurrentMonth}
                    >
                      {dayInfo.day}
                    </button>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
