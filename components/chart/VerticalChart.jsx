"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  Tooltip,
  YAxis,
  Cell,
} from "recharts";

// Fixed soft colors for 4 stages
const stageColors = {
  "TO DO": "hsl(210, 70%, 85%)", // Soft blue
  "On Progress": "hsl(40, 70%, 85%)", // Soft yellow
  "Under Review": "hsl(260, 70%, 85%)", // Soft purple
  Done: "hsl(160, 70%, 85%)", // Soft green
};

export default function VerticalChart({ weeknum, totalTask ,chartData }) {

  const [activeChart, setActiveChart] = useState("weekly");
  const chartContainerRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(0);

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

    console.log("ChartData: ", chartData)
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

  // Update chart width on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      if (chartContainerRef.current) {
        // Use getBoundingClientRect to account for padding/margins
        setChartWidth(chartContainerRef.current.getBoundingClientRect().width);
      }
    };

    // Run after layout is complete
    const timeoutId = setTimeout(updateWidth, 0);
    window.addEventListener("resize", updateWidth);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return (
    <div className="w-full p-2 bg-white shadow-sm rounded-xl shadow-md grid grid-cols-12 gap-2">
      {/* Left chart area */}
      <div className="flex-1 col-span-10">
        <div className="grid grid-cols-1 gap-2">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-description">Detail</p>
              <div className="text-h5 font-bold">
                Total task: <span className="font-semibold">{total}</span>
              </div>
            </div>
            <div className="flex gap-2 bg-title/5 p-2 rounded-small">
              <button
                className={`px-3 py-1 rounded ${
                  activeChart === "weekly"
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
                onClick={() => setActiveChart("weekly")}
              >
                weekly
              </button>
              <button
                className={`px-3 py-1 rounded ${
                  activeChart === "monthly"
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
                onClick={() => setActiveChart("monthly")}
              >
                monthly
              </button>
            </div>
          </div>
          {/* Chart */}
          <div ref={chartContainerRef} className="w-full">
            <BarChart
              width={chartWidth}
              height={350}
              data={chartData}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="50%" stopColor="#59BAD5" />
                  <stop offset="100%" stopColor="#59BAD5" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <YAxis />
              <XAxis
                dataKey="date"
                tickFormatter={(date) => {
                  const d = new Date(date);
                  if (activeChart === "weekly") {
                    const weekNum = Math.ceil(d.getDate() / 7);;
                    return `Week ${weekNum}`;
                  } else {
                    return d.toLocaleDateString("en-US", { month: "short" });
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
                    fill={
                      activeChart === "monthly"
                        ? "url(#barGradient)"
                        : stageColors[entry.stage]
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </div>
        </div>
      </div>

      {/* Right side 4 stage container */}
      <div className="col-span-2 border-l-1 rounded flex justify-center items-center flex-col">
        <div className="relative mb-2 font-semibold text-primary text-caption bg-bgColor py-2.5 ps-11 pe-8 border-primary border-1 rounded-full flex items-center">
          <div className="absolute left-5 w-3 h-3 bg-primary rounded-full"></div>
          All Category
        </div>
        <ul className="space-y-3 text-title text-caption-tiny">
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