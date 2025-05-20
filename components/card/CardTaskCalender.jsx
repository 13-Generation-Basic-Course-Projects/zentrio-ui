import { Card, CardHeader, CardBody } from "@heroui/react";
import Image from "next/image";
import tasklogo from "../../assets/task.png";
export default function CardTaskCalender({ tasks }) {
  const data = [...tasks];
  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <div className="flex items-center gap-2">
          <Image
            src={tasklogo}
            className="w-5 h-5 object-contain"
            alt="task-icon"
          />
          <small className="text-default-500">Tasks</small>
        </div>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        {data.map((el, i) => (
          <p key={i} className="py-2">
            {el.title}
          </p>
        ))}
      </CardBody>
    </Card>
  );
}
