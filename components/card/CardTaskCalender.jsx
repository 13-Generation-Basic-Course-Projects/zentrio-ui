import Image from "next/image";
import tasklogo from "../../assets/task.png";

import { Card, CardHeader, CardBody } from "@heroui/react";

export default function CardTaskCalender({
  tasks,
  onTaskClick,
  taskColorMap,
  selectedTaskId,
}) {
  console.log("this is tasks :", tasks);

  const handleTaskClick = (task) => {
    if (onTaskClick) {
      onTaskClick(task.taskId);
    }
  };

  return (
    <Card className="py-4 rounded-large h-[400px] bg-white w-full mx-auto shadow-sm flex flex-col">
      <CardHeader className="pb-0 pt-2 px-6 flex-col items-start">
        <div className="flex items-center gap-3">
          <Image
            src={tasklogo}
            className="w-6 h-6 object-contain"
            alt="task-icon"
          />
          <h1 className="text-title text-large font-semibold">Tasks</h1>
        </div>
      </CardHeader>

      <CardBody className="py-3 px-4 rounded-lg overflow-y-auto flex-1">
        {tasks?.payload.map((task, index) => {
          const taskColor = taskColorMap[task.taskId];
          const isSelected = selectedTaskId === task.taskId;

          return (
            <div
              key={index}
              onClick={() => handleTaskClick(task)}
              className={`py-3 px-3 flex items-center justify-between gap-2 rounded-xl cursor-pointer transition-colors ${
                isSelected
                  ? "bg-gray-200"
                  : "hover:bg-gray-100 active:bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span
                  className={`w-4 h-4 rounded-full ${
                    taskColor?.bg || "bg-blue-500"
                  } flex-shrink-0`}
                />
                <span
                  className={`${
                    taskColor?.text || "text-blue-500"
                  } font-medium text-large truncate`}
                >
                  {task.title}
                </span>
              </div>
              <small className="text-title font-medium text-xs flex-shrink-0">
                {task.taskOrder || "0"}
              </small>
            </div>
          );
        })}
      </CardBody>
    </Card>
  );
}
