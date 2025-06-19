"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
// import {
//   BarChart,
//   Bar,
//   CartesianGrid,
//   XAxis,
//   Tooltip,
//   YAxis,
//   Cell,
// } from "recharts";
import { Chart } from "chart.js/auto";
// import { Chart } from "chart.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Filler
);

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
            <div className="w-[98.25%] h-[90%] flex justify-center items-center pt-[12.5%] pr-[5%]">
              {/* <p className="text-slate-400">No Data</p> */}
              {monthlyClick ? (
                <MonthlyChart report={report} />
              ) : (
                <WeeklyChart report={report} />
              )}
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
                <p className="w-[40%] text-right text-[9px]">{task.todo}</p>
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
                <p className="w-[40%] text-right text-[9px]">{task.progress}</p>
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
                <p className="w-[40%] text-right text-[9px]">{task.review}</p>
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
                <p className="w-[40%] text-right text-[9px]">{task.done}</p>
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

export const MonthlyChart = ({ report }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    // Destroy existing chart if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Get canvas context using ref instead of getElementById
    const ctx = canvasRef.current.getContext("2d");

    // Create new chart and store reference
    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            data: [66, 144, 146, 116, 107, 131, 43, 89, 75, 120, 95, 110],
            label: "Applied",
            borderColor: "rgb(109, 253, 181)",
            backgroundColor: "rgb(109, 253, 181, 0.5)",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
            position: "top",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Cleanup function
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, []);

  return (
    <>
      {/* Bar chart */}
      <div className="w-full h-[350px] flex mb-[2.5%]">
        <canvas ref={canvasRef}></canvas>
      </div>
    </>
  );
};

export const WeeklyChart = ({ report }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  const task = {
    todo: 0,
    progress: 0,
    review: 0,
    done: 0,
  };

  report?.payload?.groupedTasksreport?.payload?.groupedTasks.forEach((item) => {
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

  const getWeekDates = (date) => {
    const inputDate = new Date(date);
    const dayOfWeek = inputDate.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // Calculate how many days to subtract to get to Monday
    const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    // Get Monday of the week
    const monday = new Date(inputDate);
    monday.setDate(inputDate.getDate() - daysToMonday);

    // Generate all 7 days from Monday to Sunday
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(monday);
      currentDay.setDate(monday.getDate() + i);
      weekDates.push(currentDay);
    }

    return weekDates;
  };

  // This IS an array - map() returns an array of 7 objects
  const chartData = (week, stage, inputDate) => {
    const weekDates = getWeekDates(inputDate);

    return weekDates.map((date, index) => ({
      week: week || `Week ${index + 1}`,
      stage,
      date: date.toISOString().split("T")[0],
    }));
  };

  const chartData2 = {
    week: 0,
    stage: "",
    date: null,
  };

  // report?.payload?.groupedTasksreport.forEach((item) => {
  report?.payload?.groupedTasks.forEach((item) => {
    console.log("Weekly: ", item);
    chartData2.stage = item.stage;
    item?.tasks.forEach((subItem) => {
      console.log("Sub Item: ", subItem);
      chartData2.date = subItem.startAt;
      chartData2.date = new Date(subItem.startAt); // Ensure it's a Date object

      if (chartData2.date && !isNaN(chartData2.date.getTime())) {
        chartData2.date = chartData2.date.toISOString().split("T")[0];
        console.log("Formatted date:", chartData2.date);

        const getWeekDates = (date) => {
          const inputDate = new Date(date);
          const dayOfWeek = inputDate.getDay(); // 0 = Sunday, 1 = Monday, etc.

          // Calculate how many days to subtract to get to Monday
          const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

          // Get Monday of the week
          const monday = new Date(inputDate);
          monday.setDate(inputDate.getDate() - daysToMonday);

          // Generate all 7 days from Monday to Sunday
          const weekDates = [];
          for (let i = 0; i < 7; i++) {
            const currentDay = new Date(monday);
            currentDay.setDate(monday.getDate() + i);
            weekDates.push(currentDay.toISOString().split("T")[0]);
          }

          return weekDates;
        };

        const allDate = getWeekDates(chartData2.date);

        console.log("All Date: ", allDate);
      }
    });
  });
  // })

  console.log("Chart Data: ", chartData2);

  useEffect(() => {
    // Destroy existing chart if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Get canvas context using ref instead of getElementById
    const ctx = canvasRef.current.getContext("2d");

    // Create new chart and store reference
    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Week 1",
          "Week 2",
          "Week 3",
          "Week 4",
          "Week 5",
          "Week 6",
          "Week 7",
        ],
        datasets: [
          {
            data: [66, 144, 146, 116, 107, 131, 43],
            label: "Applied",
            borderColor: "rgb(109, 253, 181)",
            backgroundColor: "rgb(109, 253, 181, 0.5)",
            borderWidth: 2,
          },
          {
            data: [40, 100, 44, 70, 63, 30, 10],
            label: "Accepted",
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgb(75, 192, 192, 0.5)",
            borderWidth: 2,
          },
          {
            data: [20, 24, 50, 34, 33, 23, 12],
            label: "Pending",
            borderColor: "rgb(255, 205, 86)",
            backgroundColor: "rgb(255, 205, 86, 0.5)",
            borderWidth: 2,
          },
          {
            data: [6, 20, 52, 12, 11, 78, 21],
            label: "Rejected",
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgb(255, 99, 132, 0.5)",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
            position: "top",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Cleanup function
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, []);

  return (
    <>
      {/* Bar chart */}
      <div className="w-full h-[350px] flex mb-[2.5%]">
        <canvas ref={canvasRef}></canvas>
      </div>
    </>
  );
};
