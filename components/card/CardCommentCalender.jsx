import { Card, CardHeader, CardBody } from "@heroui/react";
import Image from "next/image";
import commentlogo from "../../assets/Comment.png";
import profile from "../../public/image/minh.png";
import { SquarePen, AlarmClock } from 'lucide-react';

// mock data user
const users = {
  "a1b2c3d4-e5f6-7890-abcd-1234567890ab": { name: "Fong", avatar: "https://i.pinimg.com/736x/e6/a9/8a/e6a98a257565d829009a1c1735ee1589.jpg" },
  "b2a5a1cb-4de2-4b8e-b84e-613e5bd96dbe": { name: "Visa", avatar: "https://i.pinimg.com/736x/b2/5c/9e/b25c9ef93482fe428f1df4dbe4ae60a1.jpg" },
  "c3efbe9d-781b-4c2b-85b0-0f9a1e4b9e03": { name: "Skan", avatar: "https://i.pinimg.com/736x/ed/f0/2d/edf02dd0f05b7c249f35d3680f306497.jpg" },
}

// function fomart date
const formatRelativeTime = (dateString) => {
  const commentDate = new Date(dateString)
  const now = new Date()
  const diffInMs = now.getTime() - commentDate.getTime()
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInHours < 24) {
    return `${diffInHours} hours ago`
  } else if (diffInDays === 1) {
    return "1 day ago"
  } else {
    return commentDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }
}

export default function CardTCommentCalender() {
  const comments = [
    {
      comment_id: "c1d2e3f4-5678-9abc-def0-1234567890ab",
      content: "This task needs some updates, please review.",
      comment_date: "2025-05-10 14:23",
      checklist_id: "chk001-a1b2-c3d4-e5f6-123456789abc",
      commented_by: "a1b2c3d4-e5f6-7890-abcd-1234567890ab",
    },
    {
      comment_id: "d2e3f4g5-6789-abcd-ef01-2345678901bc",
      content: "Checked and approved the checklist items.",
      comment_date: "2025-05-11 09:45",
      checklist_id: "chk002-b2c3-d4e5-f6a7-23456789bcde",
      commented_by: "b2a5a1cb-4de2-4b8e-b84e-613e5bd96dbe",
    },
    {
      comment_id: "e3f4g5h6-789a-bcde-f012-3456789012cd",
      content: "Let's add a few more checkpoints here.",
      comment_date: "2025-05-12 16:30",
      checklist_id: "chk003-c3d4-e5f6-a7b8-3456789cdef0",
      commented_by: "c3efbe9d-781b-4c2b-85b0-0f9a1e4b9e03",
    },
  ]
  return (
    <Card className="py-4 h-[500px] flex flex-col">
      {/* Header */}
      <CardHeader className="pb-0 pt-2 px-6 flex-col items-start">
        <div className="flex items-center gap-2">
          <Image
            src={commentlogo}
            className="w-7 h-7 object-contain"
            alt="comment-icon"
          />
          <h1 className="text-title text-large font-semibold">All Comments</h1>
        </div>
      </CardHeader>

      {/* Body: Scrollable comments */}
      <CardBody className="py-3 px-4 space-y-3 overflow-y-auto flex-1 scrollbar-hidden">
        {comments.map((comment) => {
          const user = users[comment.commented_by];
          return (
            <div
              key={comment.comment_id}
              className="flex items-start gap-3 p-5 rounded-large bg-slate-100 transition-colors"
            >
              {/* Avatar */}
              <Image
                src={profile}
                className="w-7 h-7 object-cover rounded-full"
                alt={user?.name}
                width={28}
                height={28}
              />

              {/* Comment Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-sm text-gray-900">
                    {user?.name || "Unknown User"}
                  </h3>
                  <button className="text-green-500 hover:text-green-600 transition-colors">
                    <SquarePen size={15} />
                  </button>
                </div>

                <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                  {comment.content}
                </p>

                <div className="flex items-center justify-end gap-1">
                  <AlarmClock className="text-green-500 w-5 h-5" />
                  <span className="text-xs text-green-500 font-medium">
                    {formatRelativeTime(comment.comment_date)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </CardBody>
    </Card>

  );
}