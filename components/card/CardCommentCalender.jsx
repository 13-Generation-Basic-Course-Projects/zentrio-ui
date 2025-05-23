"use client";

import { Card, CardHeader, CardBody } from "@heroui/react";
import Image from "next/image";
import { MessageSquare, Clock, SquarePen } from "lucide-react";
import imgprofile from "../../assets/emptyMember.png";
// import { formatDistanceToNow } from "date-fns";

// Props: expects `comments` and a `users` array
export default function CardTCommentCalender({ comments, users }) {
  console.log(comments)
  console.log(users)
  return (
    <div className="space-y-4">
      {comments.map((comment) => {
        // const user = users.find((u) => u.commented_by === comment.commented_by);

        return (
          <Card key={comment.comment_id} className="rounded-2xl p-4 shadow-lg">
            <CardHeader className="flex items-center justify-between p-0">
              <div className="flex items-center gap-3">
                <Image
                  src={imgprofile}
                  width={36}
                  height={36}
                  className="rounded-full"
                  alt="user-avatar"
                />
                <div className="text-md font-semibold">{"Unknown"}</div>
              </div>
              <SquarePen className="w-4 h-4 text-green-400" />
            </CardHeader>

            <CardBody className="mt-2 p-0 text-sm text-gray-600">
              {comment.content}
              <div className="flex items-center gap-1 text-xs text-green-500 mt-2">
                <Clock className="w-4 h-4" />
                {"12/05/2025"}
              </div>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
}
