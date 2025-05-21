import { Card, CardHeader, CardBody } from "@heroui/react";
import Image from "next/image";
import tasklogo from "../../assets/task.png";

// Define color palette with count mappings
const colorMap = [
  { count: 12, value: "bg-red-500" },
  { count: 2, value: "bg-blue-500" },
  { count: 4, value: "bg-green-500" },
  { count: 5, value: "bg-purple-500" },
  { count: 22, value: "bg-orange-500" },
];

export default function CardTaskCalender({ tasks }) {
  const data = [...tasks];

  return (
    <Card className="py-4 rounded-xl border border-gray-200 shadow-sm bg-white max-w-md mx-auto">
      <CardHeader className="pb-0 pt-3 px-4 flex-col items-start ">
        <div className="flex items-center gap-3">
          <Image
            src={tasklogo}
            className="w-6 h-6 object-contain"
            alt="task-icon"
          />
          <small className="text-gray-500 font-medium">Tasks</small>
        </div>
      </CardHeader>
      <CardBody className="overflow-visible py-3 px-4 rounded-lg">
        {data.map((el, i) => {
          // Cycle through colors based on index
          const color = colorMap[i % colorMap.length];
          return (
            <div
              key={i}
              className="py-2 px-3 flex items-center justify-between gap-2 hover:rounded-xl hover:bg-gray-100 active:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span
                  className={`w-4 h-4 rounded-full ${color.value} flex-shrink-0`}
                  aria-label={`${color.count} indicator`}
                ></span>
                <span className="text-gray-800 font-medium text-sm truncate">
                  {el.title}
                </span>
              </div>
              <small className="text-gray-500 font-medium text-xs flex-shrink-0">
                {color.count}
              </small>
            </div>
          );
        })}
      </CardBody>
    </Card>
  );
}
