"use client";

import { Chart } from "chart.js/auto";

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
import { useEffect, useRef, useState } from "react";

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
  const [weeklyClick, setWeeklyClick] = useState(true);
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
              {}
              {monthlyClick ? (
                <MonthlyChart report={report} />
              ) : (
                <WeeklyChart report={report} />
              )}
            </div>
          </div>
        </div>
        <div className="w-[30%] border-l-1 border-gray-200 flex justify-center items-center">
          {}
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
            {}
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
            {}

            {}
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
            {}

            {}
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
                    stroke="hsl(260, 70%, 85%)"
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
            {}

            {}
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
                    stroke="hsl(160, 70%, 85%)"
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
            {}
          </div>
          {}
        </div>
      </div>
    </>
  );
}

export const MonthlyChart = ({ report }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext("2d");

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ],
        datasets: [
          {
            data: [66, 144, 146, 116, 107, 131, 43, 89, 75, 120, 95, 110],
            label: "Applied",
            borderColor: "rgb(109, 253, 181)",
            backgroundColor: function(context) {
              const chart = context.chart;
              const {ctx, chartArea} = chart;
              
              if (!chartArea) return null;
              
              const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
              gradient.addColorStop(0, "rgb(109, 253, 181)");
              gradient.addColorStop(0.5, "rgb(34, 197, 94)");
              gradient.addColorStop(1, "rgb(22, 101, 52)");
              
              return gradient;
            },
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

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full h-[350px] flex mb-[2.5%]">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export const WeeklyChart = ({ report }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  const getWeekStart = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };

  const getWeekNumber = (date, baseDate) => {
    const weekStart = getWeekStart(date);
    const baseWeekStart = getWeekStart(baseDate);
    const diffTime = weekStart.getTime() - baseWeekStart.getTime();
    const diffWeeks = Math.floor(diffTime / (7 * 24 * 60 * 60 * 1000));
    return diffWeeks + 1;
  };

  const processWeeklyData = () => {
    const weeklyData = {};

    let earliestDate = null;

    (report?.payload?.groupedTasks || []).forEach((group) => {
      (group.tasks || []).forEach((task) => {
        const taskDate = task.finishedAt || task.updatedAt || task.createdAt;
        if (taskDate) {
          const date = new Date(taskDate);
          if (!earliestDate || date < earliestDate) {
            earliestDate = date;
          }
        }
      });
    });

    if (!earliestDate) return { weeklyData: {}, maxWeek: 7 };

    (report?.payload?.groupedTasks || []).forEach((group) => {
      (group.tasks || []).forEach((task) => {
        const taskDate = task.finishedAt || task.updatedAt || task.createdAt;
        if (taskDate) {
          const date = new Date(taskDate);
          const weekNum = getWeekNumber(date, earliestDate);

          if (weekNum > 0 && weekNum <= 7) {
            if (!weeklyData[weekNum]) {
              weeklyData[weekNum] = {};
            }

            const stage = task.stage || "Unknown";
            if (!weeklyData[weekNum][stage]) {
              weeklyData[weekNum][stage] = 0;
            }
            weeklyData[weekNum][stage]++;
          }
        }
      });
    });

    return { weeklyData, maxWeek: 7 };
  };

  const { weeklyData, maxWeek } = processWeeklyData();

  const dataStages = [
    ...new Set(
      Object.values(weeklyData).flatMap((weekData) => Object.keys(weekData))
    ),
  ];

  const allStages = dataStages.includes("DONE")
    ? dataStages
    : [...dataStages, "DONE"];

  const stageColors = {
    TO_DO: "hsl(210, 70%, 85%)",
    TODO: "hsl(210, 70%, 85%)",
    IN_PROGRESS: "hsl(40, 70%, 85%)",
    UNDER_REVIEW: "hsl(260, 70%, 85%)",
    DONE: "hsl(160, 70%, 85%)",
    COMPLETED: "hsl(160, 70%, 85%)",
  };

  const datasets = allStages.map((stage, index) => {
    const defaultColors = [
      "hsl(210, 70%, 85%)",
      "hsl(210, 70%, 85%)",
      "hsl(40, 70%, 85%)",
      "hsl(260, 70%, 85%)",
      "hsl(160, 70%, 85%)",
      "hsl(160, 70%, 85%)",
    ];

    return {
      label: stage.replace("_", " "),
      data: Array.from({ length: maxWeek }, (_, i) => {
        const week = i + 1;
        return weeklyData[week]?.[stage] || 0;
      }),
      backgroundColor:
        stageColors[stage] || defaultColors[index % defaultColors.length],
      borderColor:
        stageColors[stage]?.replace("0.8", "1") ||
        defaultColors[index % defaultColors.length].replace("0.8", "1"),
      borderWidth: 1,
    };
  });

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: Array.from({ length: maxWeek }, (_, i) => `Week ${i + 1}`),
        datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "point",
          intersect: true,
        },
        elements: {
          bar: {
            borderRadius: 6,
          },
        },
        plugins: {
          legend: {
            display: false,
            position: "top",
            labels: {
              padding: 20,
              usePointStyle: true,
              font: {
                size: 12,
              },
            },
          },
          tooltip: {
            mode: "point",
            intersect: true,
            filter: function (tooltipItem) {
              return tooltipItem.datasetIndex === 0 || tooltipItem.parsed.y > 0;
            },
            callbacks: {
              title: (tooltipItems) => {
                return tooltipItems[0].label;
              },
              label: (context) => {
                return `${context.dataset.label}: ${context.parsed.y}`;
              },
            },
          },
        },
        scales: {
          x: {
            stacked: false,
            grid: {
              display: false,
              color: "rgba(0,0,0,0.1)",
            },
            ticks: {
              font: {
                size: 12,
              },
            },
          },
          y: {
            stacked: false,
            beginAtZero: true,
            grid: {
              display: true,
              color: "rgba(0,0,0,0.1)",
            },
            ticks: {
              stepSize: 20,
              font: {
                size: 12,
              },
            },
          },
        },
        layout: {
          padding: {
            top: 10,
            bottom: 10,
            left: 10,
            right: 10,
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [datasets, maxWeek]);

  return (
    <div className="w-full h-[350px] flex mb-[2.5%]">
      <canvas ref={canvasRef} />
    </div>
  );
};
