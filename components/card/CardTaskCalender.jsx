import Image from "next/image";
import tasklogo from "../../assets/task.png";

import { Card, CardHeader, CardBody } from "@heroui/react";


export default function CardTaskCalender({ tasks }) {
  console.log("this is tasks :",tasks)
  return (
    <Card className="py-4 rounded-large h-[400px] bg-white w-full mx-auto shadow-sm">
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
        {tasks?.payload.map((task, index) => (
          <div
            key={index}
            className="py-3 px-3 flex items-center justify-between gap-2 hover:bg-gray-100 rounded-xl cursor-pointer active:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span
                className="w-4 h-4 rounded-full bg-blue-500 flex-shrink-0"
              />
              <span className="text-blue-500 font-medium text-large truncate">
                {task.title}
              </span>
            </div>
            {/* Display created date as example */}
            <small className="text-title font-medium text-xs flex-shrink-0">
              0
            </small>
          </div>
        ))}
      </CardBody>

    </Card>
  );
}
