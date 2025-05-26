"use client";

import React, { useState, useMemo } from "react";
import { BarChart, Bar, CartesianGrid, XAxis, Tooltip, YAxis } from "recharts";

// Original data
const chartData = [
  { date: "2024-04-01", weekly: 5, monthly: 7 },
  { date: "2024-04-02", weekly: 2, monthly: 9 },
  { date: "2024-04-03", weekly: 4, monthly: 6 },
  { date: "2024-04-04", weekly: 5, monthly: 12 },
  { date: "2024-04-05", weekly: 8, monthly: 14 },
  { date: "2024-04-06", weekly: 7, monthly: 16 },
  { date: "2024-04-07", weekly: 5, monthly: 9 },
  { date: "2024-04-08", weekly: 9, monthly: 15 },
  { date: "2024-04-09", weekly: 1, monthly: 5 },
  { date: "2024-04-10", weekly: 6, monthly: 9 },
  { date: "2024-04-11", weekly: 7, monthly: 17 },
  { date: "2024-04-12", weekly: 6, monthly: 10 },
  { date: "2024-04-13", weekly: 8, monthly: 18 },
  { date: "2024-04-14", weekly: 3, monthly: 11 },
  { date: "2024-04-15", weekly: 3, monthly: 8 },
  { date: "2024-04-16", weekly: 3, monthly: 9 },
  { date: "2024-04-17", weekly: 10, monthly: 17 },
  { date: "2024-04-18", weekly: 8, monthly: 20 },
  { date: "2024-04-19", weekly: 5, monthly: 9 },
  { date: "2024-04-20", weekly: 2, monthly: 7 },
  { date: "2024-04-21", weekly: 3, monthly: 10 },
  { date: "2024-04-22", weekly: 5, monthly: 8 },
  { date: "2024-04-23", weekly: 3, monthly: 11 },
  { date: "2024-04-24", weekly: 9, monthly: 14 },
  { date: "2024-04-25", weekly: 5, monthly: 12 },
  { date: "2024-04-26", weekly: 2, monthly: 6 },
  { date: "2024-04-27", weekly: 8, monthly: 20 },
  { date: "2024-04-28", weekly: 3, monthly: 9 },
  { date: "2024-04-29", weekly: 7, monthly: 11 },
  { date: "2024-06-30", weekly: 10, monthly: 30 },
  { date: "2024-05-30", weekly: 10, monthly: 18 },
];
  

export default function VerticalChart() {
  const [activeChart, setActiveChart] = useState("weekly");

  const groupedData = useMemo(() => {
    const groups = {};
    const maxDisplay = activeChart === "weekly" ? 10 : 20;

    let maxActual = 0;

    chartData.forEach((item) => {
      const dateObj = new Date(item.date);
      let groupKey = "";

      if (activeChart === "weekly") {
        const day = dateObj.getDate();
        const weekNum = Math.ceil(day / 7);
        groupKey = `Week ${weekNum}`;
      } else {
        const month = dateObj.toLocaleString("default", { month: "long" });
        groupKey = month;
      }

      if (!groups[groupKey]) {
        groups[groupKey] = 0;
      }
      groups[groupKey] += item[activeChart];
    });

    maxActual = Math.max(...Object.values(groups));

    return Object.entries(groups).map(([name, total]) => ({
      name,
      total,
      display: Math.round((total / maxActual) * maxDisplay),
    }));
  }, [activeChart]);

  const total = useMemo(() => {
    return {
      weekly: chartData.reduce((sum, item) => sum + item.weekly, 0),
      monthly: chartData.reduce((sum, item) => sum + item.monthly, 0),
    };
  }, []);

  return (
    <div className="w-full p-4 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-600">
          <p>Detail</p>
          Total task:{" "}
          <span className="font-semibold">{total[activeChart]}</span>
        </div>
        <div className="flex gap-2 bg-title/20 p-2 rounded-small">
          <button
            className={`px-3 py-1 rounded ${
              activeChart === "weekly"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setActiveChart("weekly")}
          >
            weekly
          </button>
          <button
            className={`px-3 py-1 rounded ${
              activeChart === "monthly"
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setActiveChart("monthly")}
          >
            monthly
          </button>
        </div>
      </div>

      <BarChart width={700} height={350} data={groupedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <Tooltip
          formatter={(value, name, props) =>
            `${props.payload.total} actual tasks`
          }
        />
        <Bar
          dataKey="display"
          fill={activeChart === "weekly" ? "#3b82f6" : "#10b981"}
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="display"
          fill={activeChart === "weekly" ? "#3b82f6" : "#10b981"}
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="display"
          fill={activeChart === "weekly" ? "#3b82f6" : "#10b981"}
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="display"
          fill={activeChart === "weekly" ? "#3b82f6" : "#10b981"}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </div>
  );
}
