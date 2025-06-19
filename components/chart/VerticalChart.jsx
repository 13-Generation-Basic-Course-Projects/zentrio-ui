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

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Filler, } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Filler );

const WeeklyChartBar = () => {

}

const MonthyChartBar = () => {
  const labels = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug"];
  const datasets = [12, 45, 67, 43, 89, 34, 67, 43];
  const data = {
    labels: labels,
    datasets: [
      {
        // Title of Graph
        label: "My Bar Chart",
        data: datasets,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
        ],
        borderWidth: 1,
        barPercentage: 1,
        borderRadius: {
          topLeft: 5,
          topRight: 5,
        },
      },
      // insert similar in dataset object for making multi bar chart
    ],
  };
  const options = {
    scales: {
      y: {
        title: {
          display: true,
        },
        display: true,
        beginAtZero: true,
        max: 100,
      },
      x: {
        title: {
          display: true,
        },
        display: true,
      },
    },
  };

  return (
    <div style={{ width: "1000px", }}>
      <Bar data={data} options={options} />
    </div>
  );
};

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
          <div className="w-[97.5%] border-t h-[85%] flex justify-end ">
            <div className="w-[98.25%] h-[90%] flex justify-center items-center">
              <MonthyChartBar />
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
