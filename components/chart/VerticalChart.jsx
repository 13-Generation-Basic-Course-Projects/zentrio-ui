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
        <div className="w-[30%] border-gray-200 flex justify-center items-center mb-8 scale-[1.2]">
          {}
          <div className="w-[140px] text-[11px] flex flex-col justify-end item-center gap-[7.5%] h-[50%]">
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
                    stroke={
                      weeklyClick ? `hsl(194, 54%, 60%)` : `hsl(201, 52%, 59%)`
                    }
                    strokeWidth="1.19098"
                  />
                </svg>
                <p className="pl-[7.5%] text-[9px]">To Do</p>
              </div>
              <p className="w-[40%] text-right text-[9px]">{task.todo}</p>
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
                    stroke={
                      weeklyClick ? `hsl(215, 89%, 69%)` : `hsl(201, 52%, 59%)`
                    }
                    strokeWidth="1.19098"
                  />
                </svg>
                <p className="pl-[7.5%] text-[9px]">In Progress</p>
              </div>
              <p className="w-[40%] text-right text-[9px]">{task.progress}</p>
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
                    stroke={
                      weeklyClick ? `hsl(16, 89%, 66%)` : `hsl(201, 52%, 59%)`
                    }
                    strokeWidth="1.19098"
                  />
                </svg>
                <p className="pl-[7.5%] text-[9px]">Under Review</p>
              </div>
              <p className="w-[40%] text-right text-[9px]">{task.review}</p>
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
                    stroke={
                      weeklyClick ? `hsl(145, 53%, 67%)` : `hsl(201, 52%, 59%)`
                    }
                    strokeWidth="1.19098"
                  />
                </svg>
                <p className="pl-[7.5%] text-[9px]">Done</p>
              </div>
              <p className="w-[40%] text-right text-[9px]">{task.done}</p>
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

  const generateMonthlyStageData = (report) => {
    const monthlyStageData = {
      "TO DO": Array(12).fill(0),
      IN_PROGRESS: Array(12).fill(0),
      UNDER_REVIEW: Array(12).fill(0),
      COMPLETED: Array(12).fill(0),
    };

    if (!report || !report.groupedTasks) {
      console.warn("generateMonthlyStageData: No groupedTasks found");
      return monthlyStageData;
    }

    report.groupedTasks.forEach((group) => {
      const stage = group?.stage;
      if (!stage || !(stage in monthlyStageData)) {
        console.warn(`Unknown stage encountered: "${stage}"`);
        return; // skip unknown stages
      }

      if (!group.tasks || !Array.isArray(group.tasks)) {
        console.warn(`No tasks array found for stage: "${stage}"`);
        return;
      }

      group.tasks.forEach((task) => {
        const date = new Date(task.finishedAt);
        if (isNaN(date)) {
          console.warn(`Invalid finishedAt date: "${task.finishedAt}"`);
          return; // skip invalid dates
        }

        const monthIndex = date.getMonth(); // 0-11 for Jan-Dec
        monthlyStageData[stage][monthIndex]++;
      });
    });

    return monthlyStageData;
  };

  const monthlyStageData = generateMonthlyStageData(report?.payload);

  console.log("Monthly: ", monthlyStageData);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext("2d");

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
        datasets: Object.entries(monthlyStageData).map(([stage, data]) => ({
          label: stage,
          data,
          borderWidth: 2,
          borderColor: "rgba(0,0,0,0%)",
          backgroundColor: function (context) {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) return null;

            const { datasetIndex, dataIndex } = context;
            const meta = chart.getDatasetMeta(datasetIndex);
            const bar = meta.data[dataIndex];

            // Check if bar exists and has x & width
            if (
              !bar ||
              typeof bar.x !== "number" ||
              typeof bar.width !== "number"
            ) {
              return "#59BAD5"; // fallback solid color
            }

            const { x, width } = bar;
            const gradient = ctx.createLinearGradient(
              x - width / 2,
              0,
              x + width / 2,
              0
            );
            gradient.addColorStop(0, "#FFFFFF");
            gradient.addColorStop(0.5, "#59BAD5");
            gradient.addColorStop(1, "#59BAD5");

            return gradient;
          },
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          bar: {
            borderRadius: 6,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            border: {
              display: false,
              color: "#333",
              width: 2,
              dash: [5, 5],
            },
            grid: {
              display: true,
              color: function (context) {
                if (context.tick.value === context.chart.scales.y.min) {
                  return "transparent";
                }
                return "#e0e0e0";
              },
              lineWidth: 1,
              drawBorder: false,
            },
          },
          x: {
            grid: {
              display: false,
            },
            stacked: true,
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
  }, [report]);

  return (
    <div className="w-full h-[350px] flex mb-[2.5%]">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export const WeeklyChart = ({ report }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  const getFixedWeekNumber = (date, baseDate) => {
    const d = new Date(date);
    const start = new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
    const end = new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 0);

    const totalDays = end.getDate();
    const daysPerWeek = Math.ceil(totalDays / 4);
    const day = d.getDate();

    return Math.min(4, Math.ceil(day / daysPerWeek));
  };

  const processWeeklyData = () => {
    const weeklyData = {};

    const allDates = (report?.payload?.groupedTasks || [])
      .flatMap((group) =>
        (group.tasks || []).map(
          (task) =>
            new Date(task.finishedAt || task.updatedAt || task.createdAt)
        )
      )
      .filter(Boolean);

    if (allDates.length === 0) return { weeklyData: {}, maxWeek: 4 };

    const baseDate = new Date(
      allDates[0].getFullYear(),
      allDates[0].getMonth(),
      1
    );

    const maxWeek = 4;

    (report?.payload?.groupedTasks || []).forEach((group) => {
      (group.tasks || []).forEach((task) => {
        const taskDate = new Date(
          task.finishedAt || task.updatedAt || task.createdAt
        );
        const weekNum = getFixedWeekNumber(taskDate, baseDate);

        if (weekNum >= 1 && weekNum <= maxWeek) {
          if (!weeklyData[weekNum]) weeklyData[weekNum] = {};
          const stage = task.stage || "Unknown";
          weeklyData[weekNum][stage] = (weeklyData[weekNum][stage] || 0) + 1;
        }
      });
    });

    return { weeklyData, maxWeek };
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
    "TO DO": "hsl(194, 54%, 60%)",
    IN_PROGRESS: "hsl(215, 89%, 69%)",
    UNDER_REVIEW: "hsl(16, 89%, 66%)",
    COMPLETED: "hsl(145, 53%, 67%)",
  };

  const datasets = allStages.map((stage, index) => {
    const defaultColors = [
      "hsl(194, 54%, 60%)",
      "hsl(215, 89%, 69%)",
      "hsl(16, 89%, 66%)",
      "hsl(145, 53%, 67%)",
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
      borderWidth: 0,
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
        elements: {
          bar: {
            borderRadius: 12,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            border: {
              display: false,
              color: "#333",
              width: 2,
              dash: [5, 5],
            },
            grid: {
              display: true,
              color: function (context) {
                if (context.tick.value === context.chart.scales.y.min) {
                  return "transparent";
                }
                return "#e0e0e0";
              },
              lineWidth: 1,
              drawBorder: false,
            },
          },
          x: {
            grid: {
              display: false,
            },
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
