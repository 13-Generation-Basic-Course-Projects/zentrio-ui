import { Card, CardHeader, CardBody } from "@heroui/react";
import Image from "next/image";
import commentlogo from "../../assets/Comment.png";
import profile from "../../public/image/minh.png";
import { SquarePen, AlarmClock } from "lucide-react";

// mock data user
const users = [
  {
    user_id: "u-1",
    username: "senghun123",
    email: "hoeumsenghun88@example.com",
    password: "hashed_pw_1", // hashed
    profile_image: "https://i.pravatar.cc/150?u=user1",
    created_at: "2025-05-10T09:00:00Z",
    updated_at: "2025-05-12T14:30:00Z",
    is_verified: false,
    is_reset: false,
  },
  {
    user_id: "u-2",
    username: "visajetlaor",
    email: "visa22@example.com",
    password: "hashed_pw_2",
    profile_image: "https://i.pravatar.cc/150?u=user2",
    created_at: "2025-05-09T11:15:00Z",
    updated_at: "2025-05-14T08:45:00Z",
    is_verified: false,
    is_reset: false,
  },
  {
    user_id: "u-3",
    username: "kdeypesith",
    email: "kdeypesith420@example.com",
    password: "hashed_pw_3",
    profile_image: "https://i.pravatar.cc/150?u=user3",
    created_at: "2025-05-08T16:20:00Z",
    updated_at: "2025-05-13T12:10:00Z",
    is_verified: false,
    is_reset: false,
  },
];

// function fomart date
const formatRelativeTime = (dateString) => {
  const commentDate = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - commentDate.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  } else if (diffInDays === 1) {
    return "1 day ago";
  } else {
    return commentDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }
};

export default function CardTCommentCalender() {
  const feedback = [
    {
      feedback_id: "f-1",
      created_at: "2025-05-01T10:30:00Z",
      comment:
        "Great job on the inittial design. Just tweak the navbar spacing.",
      task_id: "t-1",
      feedback_by: "u-1",
    },
    {
      feedback_id: "f-2",
      created_at: "2025-05-03T15:45:00Z",
      comment:
        "API response times are fast, but consider better error handling.",
      task_id: "t-2",
      feedback_by: "u-2",
    },
    {
      feedback_id: "f-3",
      created_at: "2025-05-05T12:15:00Z",
      comment: "Testing coverage is solid. Add edge cases for user roles.",
      task_id: "t-3",
      feedback_by: "u-3",
    },
  ];

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
      <CardBody className="py-3 px-4 space-y-3 overflow-y-auto flex-1">
        {feedback.map((fb) => {
          const user = users.find((u) => u.user_id === fb.feedback_by);
          return (
            <div
              key={fb.feedback_id}
              className="flex items-start gap-3 p-5 rounded-large bg-slate-100 transition-colors"
            >
              {/* Avatar */}
              <Image
                src={user?.profile_image || profile}
                className="w-7 h-7 object-cover rounded-full"
                alt={user?.username || "User"}
                width={28}
                height={28}
              />

              {/* Comment Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-sm text-gray-900">
                    {user?.username || "Unknown User"}
                  </h3>
                  <button className="text-green-500 hover:text-green-600 transition-colors">
                    <SquarePen size={15} />
                  </button>
                </div>

                <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                  {fb.comment}
                </p>

                <div className="flex items-center justify-end gap-1">
                  <AlarmClock className="text-green-500 w-5 h-5" />
                  <span className="text-xs text-green-500 font-medium">
                    {formatRelativeTime(fb.created_at)}
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
