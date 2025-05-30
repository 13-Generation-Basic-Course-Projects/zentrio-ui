// components/card/CardCommentCalender.jsx

import { Card, CardHeader, CardBody } from "@heroui/react";
import Image from "next/image";
import commentlogo from "../../assets/comment.png";

export default function CardCommentCalender({ tasks = [] }) {
  return (
    <Card className="py-4 rounded-large w-full mx-auto shadow-sm">
      <CardHeader className="pb-0 pt-2 px-6 flex-col items-start">
        <div className="flex items-center gap-3">
          <Image
            src={commentlogo}
            className="w-6 h-6 object-contain"
            alt="comment-icon"
          />
          <h1 className="text-title text-large font-semibold">Comments</h1>
        </div>
      </CardHeader>
      <CardBody className="overflow-visible py-3 px-4 rounded-lg">
        {tasks.length > 0 ? (
          tasks.map((el, i) => (
            <div key={i} className="py-2 px-2 hover:bg-gray-100 rounded-xl">
              <span className="font-medium text-sm">{el.title}</span>
            </div>
          ))
        ) : (
          <div className="text-title text-sm">No comments available</div>
        )}
      </CardBody>
    </Card>
  );
}
