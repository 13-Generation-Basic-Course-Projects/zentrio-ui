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

export default function CardTaskCalender({ tasks = [] }) {
  const data = [...tasks];

  return (
    <Card className="py-4 rounded-large   w-full mx-auto shadow-sm">
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
      <CardBody className="overflow-visible py-3 px-4 rounded-lg">
        {data.length > 0 ? (
          data.map((el, i) => {
            // Cycle through colors based on index
            const colorIndex = i % colorMap.length;
            const color = colorMap[colorIndex];
            return (
              <div
                key={i}
                className="py-3 px-3 flex items-center justify-between gap-2 hover:bg-gray-100 rounded-xl  active:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span
                    className={`w-4 h-4 rounded-full ${color.value} flex-shrink-0`}
                    aria-label={`${color.count} indicator`}
                  ></span>
                  <span
                    className={`${color.textColor} font-medium text-body-sm truncate`}
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
