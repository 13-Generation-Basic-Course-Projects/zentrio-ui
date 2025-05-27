"use client";

import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  Tooltip,
  YAxis,
  Cell,
} from "recharts";

const chartData = [
  { date: "2024-04-01", stage: "Todo", weekly: 3, monthly: 6 },
  { date: "2024-04-01", stage: "On Progress", weekly: 2, monthly: 6 },
  { date: "2024-04-01", stage: "Done", weekly: 1, monthly: 6 },

  { date: "2024-04-02", stage: "Todo", weekly: 2, monthly: 8 },
  { date: "2024-04-02", stage: "Under Review", weekly: 2, monthly: 12 },

  { date: "2024-04-09", stage: "Todo", weekly: 3, monthly: 0 },
  { date: "2024-04-09", stage: "On Progress", weekly: 2, monthly: 0 },
  { date: "2024-04-09", stage: "Done", weekly: 1, monthly: 0 },

  { date: "2024-04-17", stage: "Done", weekly: 5, monthly: 0 },

  { date: "2024-04-24", stage: "Todo", weekly: 2, monthly: 0 },
  { date: "2024-04-24", stage: "Done", weekly: 3, monthly: 0 },

  { date: "2024-04-28", stage: "On Progress", weekly: 4, monthly: 0 },
  { date: "2024-04-28", stage: "Under Review", weekly: 1, monthly: 0 },
  { date: "2024-04-28", stage: "Done", weekly: 2, monthly: 0 },

  { date: "2024-04-30", stage: "Todo", weekly: 1, monthly: 0 },
  { date: "2024-04-30", stage: "On Progress", weekly: 2, monthly: 0 },
];

// Fixed soft colors for 4 stages
const stageColors = {
  Todo: "hsl(210, 70%, 85%)", // Soft blue
  "On Progress": "hsl(40, 70%, 85%)", // Soft yellow
  "Under Review": "hsl(260, 70%, 85%)", // Soft purple
  Done: "hsl(160, 70%, 85%)", // Soft green
};

export default function VerticalChart() {
  const [activeChart, setActiveChart] = useState("weekly");

  // Group data by week/month and stage, accumulate counts for stacking
  const groupedData = useMemo(() => {
    const groups = {};

    chartData.forEach(({ date, stage, weekly, monthly }) => {
      const d = new Date(date);
      const day = d.getDate();
      const weekNum = Math.ceil(day / 7);

      let groupKey = "";
      if (activeChart === "weekly") {
        groupKey = `Week ${weekNum}`;
      } else {
        const month = d.toLocaleString("default", { month: "long" });
        groupKey = month;
      }

      if (!groups[groupKey]) {
        groups[groupKey] = {
          name: groupKey,
          Todo: 0,
          "On Progress": 0,
          "Under Review": 0,
          Done: 0,
        };
      }

      groups[groupKey][stage] += activeChart === "weekly" ? weekly : monthly;
    });

    return Object.values(groups);
  }, [activeChart]);

  // Calculate total tasks for the active chart
  const total = useMemo(() => {
    return chartData.reduce(
      (acc, item) =>
        acc + (activeChart === "weekly" ? item.weekly : item.monthly),
      0
    );
  }, [activeChart]);

  return (
    <div className="w-full p-4 bg-white rounded-xl shadow-md flex flex-row space-x-6">
      {/* Left chart area */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-600">
            <p>Detail</p>
            Total task: <span className="font-semibold">{total}</span>
          </div>
          <div className="flex gap-2 bg-title/5 p-2 rounded-small">
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

        <BarChart width={600} height={350} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => {
              const d = new Date(date);
              if (activeChart === "weekly") {
                // Calculate week number of the month
                const weekNum = Math.ceil(d.getDate() / 7);
                return `Week ${weekNum}`;
              } else {
                // Monthly: show abbreviated month name
                return d.toLocaleDateString("en-US", { month: "short" }); // Jan, Feb...
              }
            }}
            tick={{ fontSize: 10 }}
          />

          <Tooltip
            content={({ active, payload, label }) => {
              if (!active || !payload || payload.length === 0) return null;
              return (
                <div
                  style={{
                    border: "1px solid #ccc",
                    padding: 8,
                    borderRadius: 8,
                  }}
                >
                  <div style={{ fontWeight: "semibold", marginBottom: 6 }}>
                    Date: {label}
                  </div>
                  {payload.map((entry) => (
                    <div
                      key={entry.dataKey}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 4,
                      }}
                    >
                      <span style={{ color: entry.color, fontWeight: 300 }}>
                        {entry.payload.stage || entry.name}
                      </span>
                      <span>{entry.value} tasks</span>
                    </div>
                  ))}
                </div>
              );
            }}
          />

          <Bar dataKey={activeChart} radius={[5, 5, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={stageColors[entry.stage] || "#ccc"}
              />
            ))}
          </Bar>
        </BarChart>
      </div>

      {/* Right side 4 stage container */}
      <div className="w-[25%] border-l-1 rounded flex justify-center items-center flex-col">
        <p className="mb-2 font-semibold text-title text-caption bg-bgColor p-2 border-primary border-1 rounded-full">
          All Category
        </p>
        <ul className="space-y-3 text-title/50 text-caption-tiny">
          {Object.entries(stageColors).map(([stage, color]) => (
            <li key={stage} className="flex items-center gap-2">
              <span
                className="inline-block w-4 h-4 rounded-full"
                style={{ border: `2px solid ${color}` }}
              ></span>
              {stage}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
