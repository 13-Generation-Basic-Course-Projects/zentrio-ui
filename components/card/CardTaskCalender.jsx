import { Card, CardHeader, CardBody } from "@heroui/react";
import Image from "next/image";
import tasklogo from "../../assets/task.png";

// Define color palette with count mappings
const colorMap = [
  { count: 12, value: "bg-red-500", textColor: "text-red-500" },
  { count: 2, value: "bg-blue-500", textColor: "text-blue-500" },
  { count: 4, value: "bg-green-500", textColor: "text-green-500" },
  { count: 5, value: "bg-purple-500", textColor: "text-purple-500" },
  { count: 22, value: "bg-orange-500", textColor: "text-orange-500" },
];

export default function CardTaskCalender({ tasks, onTaskClick }) {
  return (
    <Card className="py-4 rounded-medium bg-white w-full mx-auto shadow-sm h-[350px]">
      <CardHeader className="pb-0 pt-2 px-6 flex-col items-start">
        <div className="flex items-center gap-3">
          <Image
            src={tasklogo}
            className="w-6 h-6 object-contain"
            alt="task-icon"
          />
          <h1 className="text-title text-h5 font-semibold">Tasks</h1>
        </div>
      </CardHeader>

      <CardBody className="overflow-y-auto scrollbar-hidden py-3 px-4 rounded-medium text-body-sm">
        {tasks.length > 0 ? (
          tasks.map((el, i) => {
            const color = colorMap[i % colorMap.length];
            return (
              <div
                key={el.id}
                onClick={() => {
                  if (el.start) {
                    onTaskClick?.(el.start, el.id);
                  }
                }}
                className="py-3 px-3 flex items-center justify-between gap-2 hover:bg-gray-100 rounded-xl cursor-pointer active:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0 text-body-sm">
                  <span
                    className={`w-4 h-4 rounded-full ${color.value} flex-shrink-0`}
                  />
                  <span
                    className={`${color.textColor} font-medium text-large truncate`}
                  >
                    {el.title}
                  </span>
                </div>
                <small className="text-title font-medium text-xs flex-shrink-0">
                  {color.count}
                </small>
              </div>
            );
          })
        ) : (
          <div className="text-title text-sm">No tasks available</div>
        )}
      </CardBody>
    </Card>
  );
}
