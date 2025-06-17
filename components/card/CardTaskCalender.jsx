"use client";

import { Card, CardHeader, CardBody } from "@heroui/react";
import Image from "next/image";
import tasklogo from "../../assets/task.png";
import { getAllNoteInCalendarAction, getChecklistByTaskIdAction } from "@/action/calendarV2.action";
import { useEffect, useState } from "react";

// Define color palette with count mappings
const colorMap = [
  { count: 12, value: "bg-red-500", textColor: "text-red-500" },
  { count: 2, value: "bg-blue-500", textColor: "text-blue-500" },
  { count: 4, value: "bg-green-500", textColor: "text-green-500" },
  { count: 5, value: "bg-purple-500", textColor: "text-purple-500" },
  { count: 22, value: "bg-orange-500", textColor: "text-orange-500" },
];

export default function CardTaskCalender({ tasks, onTaskClick, activeTaskId }) {
  const [checklistCounts, setChecklistCounts] = useState({});
  const [commentCounts, setCommentCounts] = useState({}); // <-- New
  console.log("Tasks in cardTaskCelendar: ", tasks);

  useEffect(() => {
    const fetchAllChecklistCounts = async () => {
      const counts = {};

      for (const task of tasks) {
        try {
          const checklists = await getChecklistByTaskIdAction(task.id);
          counts[task.id] = checklists?.payload?.length || 0;
        } catch (err) {
          console.error(`Checklist fetch failed for task ${task.id}`, err);
          counts[task.id] = 0;
        }
      }

      setChecklistCounts(counts);
    };

    const fetchAllCommentCounts = async () => {
      const counts = {};
      for (const task of tasks) {
        try {
          const comments = await getAllNoteInCalendarAction(task.id);
          counts[task.id] = comments?.payload?.length || 0;
        } catch (err) {
          console.error(`Comment fetch failed for task ${task.id}`, err);
          counts[task.id] = 0;
        }
      }
      setCommentCounts(counts);
    };

    if (tasks.length > 0) {
      fetchAllChecklistCounts();
      fetchAllCommentCounts();
    }

   
  }, [tasks]);

  return (
    <Card className="py-4 rounded-medium bg-white w-full mx-auto shadow-sm h-[350px]">
      <CardHeader className="pb-0 pt-2 px-6 flex-col items-start">
        <div className="flex items-center gap-3">
          <Image
            src={tasklogo}
            className="w-5 h-5 object-contain"
            alt="task-icon"
          />
          <h1 className="text-title text-h6 font-semibold">Tasks</h1>
        </div>
      </CardHeader>

      <CardBody className="overflow-y-auto scrollbar-hidden py-3 px-4 rounded-medium text-body-sm">
        {tasks.length > 0 ? (
          tasks.map((el, i) => {
            const color = colorMap[i % colorMap.length];
            const checklistCount = checklistCounts[el.id] ?? "-";
            const commentCount = commentCounts[el.id] ?? "-";
            const isActive = el.id === activeTaskId;

            return (
              <div
                key={el.id}
                onClick={() => {
                  if (el.start) {
                    onTaskClick?.(el.start, el.id);
                  }
                }}
                className={`py-3 px-3 flex items-center justify-between gap-2 rounded-xl cursor-pointer  transition-colors duration-200 ease-in-out ${
                  isActive
                    ? "bg-blue-100 shadow  "
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0 text-caption">
                  <span
                    className={`w-3 h-3 rounded-full ${color.value} flex-shrink-0`}
                  />
                  <span className={`${color.textColor} font-medium  truncate`}>
                    {el.title}
                  </span>
                </div>
                <small className="text-title font-medium text-xs flex-shrink-0">
                  {/* {checklistCount} */}
                  {commentCount} note{commentCount > 1 ? "s" : ""}
                </small>
              </div>
            );
          })
        ) : (
          <div className="text-title ">No tasks available</div>
        )}
      </CardBody>
    </Card>
  );
}
