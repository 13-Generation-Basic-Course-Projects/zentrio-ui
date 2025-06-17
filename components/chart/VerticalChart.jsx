"use client";

// import React, { useState, useMemo, useRef, useEffect } from "react";
// import {
//   BarChart,
//   Bar,
//   CartesianGrid,
//   XAxis,
//   Tooltip,
//   YAxis,
//   Cell,
// } from "recharts";

import { useEffect, useState } from "react";

// this for call and prop to vertical chart component
// export default function VerticalChart({ weeknum, totalTask ,chartData }) {

//   console.log("ChartData: ", chartData)

//   // Fixed soft colors for 4 stages
//   const stageColors = {
//     Todo: "hsl(210, 70%, 85%)", // Soft blue
//     "On Progress": "hsl(40, 70%, 85%)", // Soft yellow
//     "Under Review": "hsl(260, 70%, 85%)", // Soft purple
//     Done: "hsl(160, 70%, 85%)", // Soft green
//   };

//   const [activeChart, setActiveChart] = useState("weekly");
//   const chartContainerRef = useRef(null);
//   const [chartWidth, setChartWidth] = useState(0);

//   // Group data by week/month and stage, accumulate counts for stacking
//   const groupedData = useMemo(() => {
//     const groups = {};

//     chartData.forEach(({ date, stage, weekly, monthly }) => {
//       const d = new Date(date);
//       const day = d.getDate();
//       const weekNum = Math.ceil(day / 7);

//       let groupKey = "";
//       if (activeChart === "weekly") {
//         groupKey = `Week ${weekNum}`;
//       } else {
//         const month = d.toLocaleString("default", { month: "long" });
//         groupKey = month;
//       }

//       if (!groups[groupKey]) {
//         groups[groupKey] = {
//           name: groupKey,
//           Todo: 0,
//           "On Progress": 0,
//           "Under Review": 0,
//           Done: 0,
//         };
//       }

//       groups[groupKey][stage] += activeChart === "weekly" ? weekly : monthly;
//     });

//     return Object.values(groups);
//   }, [activeChart]);

//   // Calculate total tasks for the active chart
//   const total = totalTask;
//   // const total = useMemo(() => {
//   //   return chartData.reduce(
//   //     (acc, item) =>
//   //       acc + (activeChart === "weekly" ? totalTask : item.monthly),
//   //     0
//   //   );
//   // }, [activeChart]);

//   console.log("Count Task: ", total)

//   // Update chart width on mount and resize
//   useEffect(() => {
//     const updateWidth = () => {
//       if (chartContainerRef.current) {
//         // Use getBoundingClientRect to account for padding/margins
//         setChartWidth(chartContainerRef.current.getBoundingClientRect().width);
//       }
//     };

//     // Run after layout is complete
//     const timeoutId = setTimeout(updateWidth, 0);
//     window.addEventListener("resize", updateWidth);
//     return () => {
//       clearTimeout(timeoutId);
//       window.removeEventListener("resize", updateWidth);
//     };
//   }, []);

//   return (
//     <div className="w-full p-2 bg-white shadow-sm rounded-xl shadow-md grid grid-cols-12 gap-2">
//       {/* Left chart area */}
//       <div className="flex-1 col-span-10">
//         <div className="grid grid-cols-1 gap-2">
//           {/* Header */}
//           <div className="flex justify-between items-center mb-4">
//             <div>
//               <p className="text-sm text-description">Detail</p>
//               <div className="text-h5 font-bold">
//                 Total task: <span className="font-semibold">{total}</span>
//               </div>
//             </div>
//             <div className="flex gap-2 bg-title/5 p-2 rounded-small">
//               <button
//                 className={`px-3 py-1 rounded ${
//                   activeChart === "weekly"
//                     ? "bg-black text-white"
//                     : "bg-gray-200 text-gray-800"
//                 }`}
//                 onClick={() => setActiveChart("weekly")}
//               >
//                 weekly
//               </button>
//               <button
//                 className={`px-3 py-1 rounded ${
//                   activeChart === "monthly"
//                     ? "bg-black text-white"
//                     : "bg-gray-200 text-gray-800"
//                 }`}
//                 onClick={() => setActiveChart("monthly")}
//               >
//                 monthly
//               </button>
//             </div>
//           </div>
//           {/* Chart */}
//           <div ref={chartContainerRef} className="w-full">
//             <BarChart
//               width={chartWidth}
//               height={350}
//               data={chartData}
//               margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
//             >
//               <defs>
//                 <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
//                   <stop offset="0%" stopColor="#FFFFFF" />
//                   <stop offset="50%" stopColor="#59BAD5" />
//                   <stop offset="100%" stopColor="#59BAD5" />
//                 </linearGradient>
//               </defs>
//               <CartesianGrid strokeDasharray="3 3" vertical={false} />
//               <YAxis />
//               <XAxis
//                 dataKey="date"
//                 tickFormatter={(date) => {
//                   const d = new Date(date);
//                   if (activeChart === "weekly") {
//                     const weekNum = Math.ceil(d.getDate() / 7);;
//                     return `Week ${weekNum}`;
//                   } else {
//                     return d.toLocaleDateString("en-US", { month: "short" });
//                   }
//                 }}
//                 tick={{ fontSize: 10 }}
//               />
//               <Tooltip
//                 content={({ active, payload, label }) => {
//                   if (!active || !payload || payload.length === 0) return null;
//                   return (
//                     <div
//                       style={{
//                         border: "1px solid #ccc",
//                         padding: 8,
//                         borderRadius: 8,
//                       }}
//                     >
//                       <div style={{ fontWeight: "semibold", marginBottom: 6 }}>
//                         Date: {label}
//                       </div>
//                       {payload.map((entry) => (
//                         <div
//                           key={entry.dataKey}
//                           style={{
//                             display: "flex",
//                             justifyContent: "space-between",
//                             marginBottom: 4,
//                           }}
//                         >
//                           <span style={{ color: entry.color, fontWeight: 300 }}>
//                             {entry.payload.stage || entry.name}
//                           </span>
//                           <span>{entry.value} tasks</span>
//                         </div>
//                       ))}
//                     </div>
//                   );
//                 }}
//               />
//               <Bar dataKey={activeChart} radius={[5, 5, 0, 0]}>
//                 {chartData.map((entry, index) => (
//                   <Cell
//                     key={`cell-${index}`}
//                     fill={
//                       activeChart === "monthly"
//                         ? "url(#barGradient)"
//                         : stageColors[entry.stage]
//                     }
//                   />
//                 ))}
//               </Bar>
//             </BarChart>
//           </div>
//         </div>
//       </div>

//       {/* Right side 4 stage container */}
//       <div className="col-span-2 border-l-1 rounded flex justify-center items-center flex-col">
//         <div className="relative mb-2 font-semibold text-primary text-caption bg-bgColor py-2.5 ps-11 pe-8 border-primary border-1 rounded-full flex items-center">
//           <div className="absolute left-5 w-3 h-3 bg-primary rounded-full"></div>
//           All Category
//         </div>
//         <ul className="space-y-3 text-title text-caption-tiny">
//           {Object.entries(stageColors).map(([stage, color]) => (
//             <li key={stage} className="flex items-center gap-2">
//               <span
//                 className="inline-block w-4 h-4 rounded-full"
//                 style={{ border: `2px solid ${color}` }}
//               ></span>
//               {stage}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

export default function VerticalChart({ report }) {
  const [weeklyClick, setWeeklyClick] = useState(false);
  const [monthlyClick, setMonthlyClick] = useState(false);

  const task = {
    todo: 0,
    progress: 0,
    review: 0,
    done: 0,
  };

  report?.payload?.groupedTasks.forEach((item) => {
    if (item.stage == "TO DO") {
        task.todo = task.todo + item.count;
      } else if (item.stage == "IN_PROGRESS") {
        task.progress = task.progress + item.count;
      } else if (item.stage == "UNDER_REVIEW") {
        task.review = task.review + item.count;
      } else {
        task.done = task.done + item.count;
      }
  });

  const calculateTasksBySimpleWeekWithDateFilter = (
    allDataOfTask,
    filterMonth = "current"
  ) => {
    const weeklyTasks = {};

    const isValidDate = (date) => {
      const d = new Date(date);
      return d instanceof Date && !isNaN(d.getTime());
    };

    const isInTargetMonth = (date) => {
      const taskDate = new Date(date);
      const currentDate = new Date();

      if (filterMonth === "current") {
        return (
          taskDate.getFullYear() === currentDate.getFullYear() &&
          taskDate.getMonth() === currentDate.getMonth()
        );
      } else if (filterMonth === "all") {
        return true; // No filtering
      } else if (
        typeof filterMonth === "object" &&
        filterMonth.year &&
        typeof filterMonth.month === "number"
      ) {
        // Custom month filter: { year: 2024, month: 5 } (month is 0-indexed)
        return (
          taskDate.getFullYear() === filterMonth.year &&
          taskDate.getMonth() === filterMonth.month
        );
      }

      return true; // Default: no filtering
    };

    const getWeekNumber = (date) => {
      const d = new Date(date);

      if (!isValidDate(date)) {
        throw new Error(`Invalid date: ${date}`);
      }

      const year = d.getFullYear();
      const firstDay = new Date(year, 0, 1);
      const daysSinceFirstDay = Math.floor(
        (d - firstDay) / (24 * 60 * 60 * 1000)
      );
      const weekNumber = Math.ceil(
        (daysSinceFirstDay + firstDay.getDay() + 1) / 7
      );

      return `${year}-WEEK${weekNumber}`;
    };

    // Process all tasks first
    allDataOfTask?.forEach((item, index) => {
      const taskDate = item.startAt;

      if (!taskDate || !isValidDate(taskDate) || !isInTargetMonth(taskDate)) {
        return;
      }

      try {
        const weekKey = getWeekNumber(taskDate);

        if (!weeklyTasks[weekKey]) {
          weeklyTasks[weekKey] = {
            todo: 0,
            progress: 0,
            review: 0,
            done: 0,
            total: 0,
          };
        }

        const taskStatus = (item.task || item.status || item.state || "")
          .toLowerCase()
          .trim();

        if (
          taskStatus.includes("todo") ||
          taskStatus.includes("to_do") ||
          taskStatus.includes("to do")
        ) {
          weeklyTasks[weekKey].todo++;
        } else if (
          taskStatus.includes("progress") ||
          taskStatus.includes("in_progress") ||
          taskStatus.includes("in progress")
        ) {
          weeklyTasks[weekKey].progress++;
        } else if (
          taskStatus.includes("review") ||
          taskStatus.includes("under_review") ||
          taskStatus.includes("under review")
        ) {
          weeklyTasks[weekKey].review++;
        } else if (
          taskStatus.includes("done") ||
          taskStatus.includes("completed") ||
          taskStatus.includes("complete")
        ) {
          weeklyTasks[weekKey].done++;
        } else {
          weeklyTasks[weekKey].done++;
        }

        weeklyTasks[weekKey].total++;
      } catch (error) {
        console.error(`Error processing task at index ${index}:`, error);
      }
    });

    // Get the date range for the filter
    const getDateRange = () => {
      const currentDate = new Date();

      if (filterMonth === "current") {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        return {
          startDate: new Date(year, month, 1),
          endDate: new Date(year, month + 1, 0),
        };
      } else if (filterMonth === "all") {
        // For "all", we'll use the range of existing tasks
        const taskDates = allDataOfTask
          ?.filter((item) => item.startAt && isValidDate(item.startAt))
          .map((item) => new Date(item.startAt))
          .sort((a, b) => a - b);

        if (taskDates && taskDates.length > 0) {
          return {
            startDate: taskDates[0],
            endDate: taskDates[taskDates.length - 1],
          };
        }
        return null;
      } else if (
        typeof filterMonth === "object" &&
        filterMonth.year &&
        typeof filterMonth.month === "number"
      ) {
        return {
          startDate: new Date(filterMonth.year, filterMonth.month, 1),
          endDate: new Date(filterMonth.year, filterMonth.month + 1, 0),
        };
      }

      return null;
    };

    // Generate all weeks in the date range
    const dateRange = getDateRange();
    if (dateRange) {
      const { startDate, endDate } = dateRange;
      const current = new Date(startDate);

      while (current <= endDate) {
        const weekKey = getWeekNumber(current);

        if (!weeklyTasks[weekKey]) {
          weeklyTasks[weekKey] = {
            todo: 0,
            progress: 0,
            review: 0,
            done: 0,
            total: 0,
          };
        }

        // Move to next week
        current.setDate(current.getDate() + 7);
      }
    }

    // Sort weeks chronologically and renumber them sequentially
    const sortedWeeks = Object.keys(weeklyTasks).sort();
    const renumberedTasks = {};

    // Limit to only 4 weeks
    sortedWeeks.slice(0, 4).forEach((weekKey, index) => {
      renumberedTasks[`WEEK${index + 1}`] = weeklyTasks[weekKey];
    });

    // If less than 4 weeks exist, fill the remaining with empty weeks
    for (let i = sortedWeeks.length; i < 4; i++) {
      renumberedTasks[`WEEK${i + 1}`] = {
        todo: 0,
        progress: 0,
        review: 0,
        done: 0,
        total: 0,
      };
    }

    return renumberedTasks;
  };

  // Usage examples:
  const currentMonthTasks = calculateTasksBySimpleWeekWithDateFilter(
    report?.payload?.groupedTasks,
    "current"
  );

  const groupedTasks = calculateTasksBySimpleWeekWithDateFilter(
    report?.payload?.groupedTasks,
    "all"
  );

  const specificMonthTasks = calculateTasksBySimpleWeekWithDateFilter(
    report?.payload?.groupedTasks,
    { year: 2024, month: 5 } // June 2024 (month is 0-indexed)
  );

  const calculateTasksByMonthWithDateFilter = (
    allDataOfTask,
    filterYear = "current"
  ) => {
    const monthlyTasks = {};

    const isValidDate = (date) => {
      const d = new Date(date);
      return d instanceof Date && !isNaN(d.getTime());
    };

    const isInTargetYear = (date) => {
      const taskDate = new Date(date);
      const currentDate = new Date();

      if (filterYear === "current") {
        return taskDate.getFullYear() === currentDate.getFullYear();
      } else if (filterYear === "all") {
        return true; // No filtering
      } else if (typeof filterYear === "number") {
        // Specific year filter: 2024
        return taskDate.getFullYear() === filterYear;
      }

      return true; // Default: no filtering
    };

    const getMonthKey = (date) => {
      const d = new Date(date);

      if (!isValidDate(date)) {
        throw new Error(`Invalid date: ${date}`);
      }

      const year = d.getFullYear();
      const month = d.getMonth();

      return `${year}-${month}`;
    };

    const getMonthName = (monthIndex) => {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return months[monthIndex];
    };

    // Get the date range for the filter
    const getDateRange = () => {
      const currentDate = new Date();

      if (filterYear === "current") {
        const year = currentDate.getFullYear();
        return {
          startDate: new Date(year, 0, 1),
          endDate: new Date(year, 11, 31),
        };
      } else if (filterYear === "all") {
        // For "all", we'll use the range of existing tasks
        const taskDates = allDataOfTask
          ?.filter((item) => item.startAt && isValidDate(item.startAt))
          .map((item) => new Date(item.startAt))
          .sort((a, b) => a - b);

        if (taskDates && taskDates.length > 0) {
          return {
            startDate: taskDates[0],
            endDate: taskDates[taskDates.length - 1],
          };
        }
        return null;
      } else if (typeof filterYear === "number") {
        return {
          startDate: new Date(filterYear, 0, 1),
          endDate: new Date(filterYear, 11, 31),
        };
      }

      return null;
    };

    // Generate all months in the date range
    const dateRange = getDateRange();
    if (dateRange) {
      const { startDate, endDate } = dateRange;
      const current = new Date(startDate);

      while (current <= endDate) {
        const monthKey = getMonthKey(current);

        if (!monthlyTasks[monthKey]) {
          monthlyTasks[monthKey] = {
            todo: 0,
            progress: 0,
            review: 0,
            done: 0,
            total: 0,
          };
        }

        // Move to next month
        current.setMonth(current.getMonth() + 1);
      }
    }

    // Process all tasks
    allDataOfTask?.forEach((item, index) => {
      const taskDate = item.startAt;

      if (!taskDate || !isValidDate(taskDate) || !isInTargetYear(taskDate)) {
        return;
      }

      try {
        const monthKey = getMonthKey(taskDate);

        if (!monthlyTasks[monthKey]) {
          monthlyTasks[monthKey] = {
            todo: 0,
            progress: 0,
            review: 0,
            done: 0,
            total: 0,
          };
        }

        const taskStatus = (item.task || item.status || item.state || "")
          .toLowerCase()
          .trim();

        if (
          taskStatus.includes("todo") ||
          taskStatus.includes("to_do") ||
          taskStatus.includes("to do")
        ) {
          monthlyTasks[monthKey].todo++;
        } else if (
          taskStatus.includes("progress") ||
          taskStatus.includes("in_progress") ||
          taskStatus.includes("in progress")
        ) {
          monthlyTasks[monthKey].progress++;
        } else if (
          taskStatus.includes("review") ||
          taskStatus.includes("under_review") ||
          taskStatus.includes("under review")
        ) {
          monthlyTasks[monthKey].review++;
        } else if (
          taskStatus.includes("done") ||
          taskStatus.includes("completed") ||
          taskStatus.includes("complete")
        ) {
          monthlyTasks[monthKey].done++;
        } else {
          monthlyTasks[monthKey].done++;
        }

        monthlyTasks[monthKey].total++;
      } catch (error) {
        console.error(`Error processing task at index ${index}:`, error);
      }
    });

    // Sort months chronologically and use real month names
    const sortedMonths = Object.keys(monthlyTasks).sort();
    const renumberedTasks = {};

    sortedMonths.slice(0, 12).forEach((monthKey) => {
      const [year, monthIndex] = monthKey.split("-");
      const monthName = getMonthName(parseInt(monthIndex));
      renumberedTasks[monthName] = monthlyTasks[monthKey];
    });

    // If we need to fill remaining months (for current year view)
    if (filterYear === "current" || typeof filterYear === "number") {
      const targetYear =
        filterYear === "current" ? new Date().getFullYear() : filterYear;

      for (let i = 0; i < 12; i++) {
        const monthName = getMonthName(i);
        if (!renumberedTasks[monthName]) {
          renumberedTasks[monthName] = {
            todo: 0,
            progress: 0,
            review: 0,
            done: 0,
            total: 0,
          };
        }
      }
    }

    return renumberedTasks;
  };

  // Usage examples:
  const currentYearTasks = calculateTasksByMonthWithDateFilter(
    report?.payload?.groupedTasks,
    "current"
  );

  const specificYearTasks = calculateTasksByMonthWithDateFilter(
    report?.payload?.groupedTasks,
    2024
  );

  // console.log("Current year monthly tasks:", currentYearTasks);  
  // console.log("ChartData: ", chartDataMonth)


  // Data matching the image exactly
  const [chartData] = useState([
    {
      week: "WEEK1",
      values: [
        0,
        currentMonthTasks.WEEK1.todo,
        currentMonthTasks.WEEK1.progress,
        currentMonthTasks.WEEK1.review,
        currentMonthTasks.WEEK1.done,
        0,
      ],
    },
    {
      week: "WEEK2",
      values: [
        0,
        currentMonthTasks.WEEK2.todo,
        currentMonthTasks.WEEK2.progress,
        currentMonthTasks.WEEK2.review,
        currentMonthTasks.WEEK2.done,
        0,
      ],
    },
    {
      week: "WEEK3",
      values: [
        0,
        currentMonthTasks.WEEK3.todo,
        currentMonthTasks.WEEK3.progress,
        currentMonthTasks.WEEK3.review,
        currentMonthTasks.WEEK3.done,
        0,
      ],
    },
    {
      week: "WEEK4",
      values: [
        0,
        currentMonthTasks.WEEK4.todo,
        currentMonthTasks.WEEK4.progress,
        currentMonthTasks.WEEK4.review,
        currentMonthTasks.WEEK4.done,
        0,
      ],
    },
  ]);

  const [animationTriggered, setAnimationTriggered] = useState(false);
  const [hoveredBar, setHoveredBar] = useState(null);

  //   const stageColors = {
  //     Todo: "hsl(210, 70%, 85%)", // Soft blue
  //     "On Progress": "hsl(40, 70%, 85%)", // Soft yellow
  //     "Under Review": "hsl(260, 70%, 85%)", // Soft purple
  //     Done: "hsl(160, 70%, 85%)", // Soft green
  //   };

  // Exact colors from the image
  const colors = [
    "", // Light blue
    "hsl(210, 70%, 85%)", // Soft blue
    "hsl(40, 70%, 85%)", // Soft yellow
    "hsl(260, 70%, 85%)", // Soft purple
    "hsl(160, 70%, 85%)", // Soft green
    "", // Light yellow
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationTriggered(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const allValues = chartData.flatMap((week) => week.values);
  const rawMax = Math.max(...allValues);
  const minValue = 0; // start chart from 0

  const maxValue = Math.ceil((rawMax * 1.1) / 10) * 10;

  const steps = 4;
  const stepSize = (maxValue - minValue) / steps;

  const values = Array.from({ length: steps + 1 }, (_, i) =>
    Math.round(minValue + i * stepSize)
  );

  const chartHeight = 320;
  const barWidth = 18;
  const barSpacing = 3;
  const groupSpacing = 45;
  const leftPadding = 50;
  const bottomPadding = 60;

  return (
    <>
      <div className="w-full h-[426px] flex pb-[1.50%]">
        <div className="w-[70%]">
          <div className="w-full h-[17.5%] flex items-center">
            <div className="w-[70%]">
              <p className="text-[14px] text-black/40">Detail</p>
              <p className="text-[17px] text-black font-bold">Total Task</p>
            </div>
            <div className="flex rounded-[16px] bg-black/5 px-[1.5%] py-[1%]">
              <p
                className={`px-[11px] pt-[7px] cursor-pointer pb-[8px] ${
                  weeklyClick ? "bg-black text-white" : "text-black/40"
                } text-[11px] rounded-[10px]`}
                onClick={() => {
                  setWeeklyClick(true);
                  setMonthlyClick(false);
                }}
              >
                Weekly
              </p>
              <p
                className={`px-[11px] pt-[7px] cursor-pointer pb-[8px] ${
                  monthlyClick ? "bg-black text-white" : "text-black/40"
                } text-[11px] rounded-[10px]`}
                onClick={() => {
                  setMonthlyClick(true);
                  setWeeklyClick(false);
                }}
              >
                Monthly
              </p>
            </div>
          </div>
          <div className="w-[97.5%] border-t h-[85%] flex justify-end">
            <div className="w-[98.25%] h-[90%] flex justify-end">
              {/* This is Chart */}
            </div>
          </div>
        </div>
        <div className="w-[30%] border-l-1 border-gray-200 flex justify-center items-center">
          {/* Start code line amount of all task */}
          <div className="w-[140px] text-[11px] flex flex-col justify-center gap-[7.5%] h-[50%]">
            <div className="text-primary h-[35px] bg-[#59BAD5]/10 rounded-full w-full border-primary border flex items-center justify-center">
              <svg
                width="12"
                height="13"
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="6.05255" cy="6.92951" r="5.9549" fill="#59BAD5" />
              </svg>
              <p className="pl-[7.5%]">All Categories</p>
            </div>
            {/* Start code line amount of todo task */}
            <div className="flex items-center w-full px-[10%]">
              <div className="flex items-center w-[60%]">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="6.42755"
                    cy="6.50373"
                    r="5.35941"
                    stroke="hsl(210, 70%, 85%)"
                    strokeWidth="1.19098"
                  />
                </svg>
                <p className="pl-[7.5%] text-[9px]">To Do</p>
              </div>
              {weeklyClick ? (
                <p className="w-[40%] text-right text-[9px]">
                  {task.todo}
                </p>
              ) : (
                <p className="w-[40%] text-right text-[9px]">0</p>
              )}
            </div>
            {/* End code line amount of todo task */}

            {/* Start code line amount of todo task */}
            <div className="flex items-center w-full px-[10%]">
              <div className="flex items-center w-[60%]">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="6.42755"
                    cy="6.50373"
                    r="5.35941"
                    stroke="hsl(40, 70%, 85%)"
                    strokeWidth="1.19098"
                  />
                </svg>
                <p className="pl-[7.5%] text-[9px]">In Progress</p>
              </div>
              {weeklyClick ? (
                <p className="w-[40%] text-right text-[9px]">
                  {task.progress}
                </p>
              ) : (
                <p className="w-[40%] text-right text-[9px]">0</p>
              )}
            </div>
            {/* End code line amount of todo task */}

            {/* Start code line amount of todo task */}
            <div className="flex items-center w-full px-[10%]">
              <div className="flex items-center w-[100%]">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="6.42755"
                    cy="6.50373"
                    r="5.35941"
                    stroke="hsl(160, 70%, 85%)"
                    strokeWidth="1.19098"
                  />
                </svg>
                <p className="pl-[7.5%] text-[9px]">Under Review</p>
              </div>
              {weeklyClick ? (
                <p className="w-[40%] text-right text-[9px]">
                  {task.review}
                </p>
              ) : (
                <p className="w-[40%] text-right text-[9px]">0</p>
              )}
            </div>
            {/* End code line amount of todo task */}

            {/* Start code line amount of todo task */}
            <div className="flex items-center w-full px-[10%]">
              <div className="flex items-center w-[60%]">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="6.42755"
                    cy="6.50373"
                    r="5.35941"
                    stroke="hsl(260, 70%, 85%)"
                    strokeWidth="1.19098"
                  />
                </svg>
                <p className="pl-[7.5%] text-[9px]">Done</p>
              </div>
              {weeklyClick ? (
                <p className="w-[40%] text-right text-[9px]">
                  {task.done}
                </p>
              ) : (
                <p className="w-[40%] text-right text-[9px]">0</p>
              )}
            </div>
            {/* End code line amount of todo task */}
          </div>
          {/* End code line amount of all task */}
        </div>
      </div>
    </>
  );
}
