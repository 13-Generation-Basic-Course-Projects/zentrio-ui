import React from "react";

const FeedbackDisplay = ({ taskTitle, matchingFeedback }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  const getInitials = (username) => {
    return username
      .split(" ")
      .map((name) => name.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              Feedback for {taskTitle}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {matchingFeedback.length}{" "}
              {matchingFeedback.length === 1 ? "comment" : "comments"}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {matchingFeedback.length > 0 ? (
          <div className="space-y-4">
            {matchingFeedback.map((feedback, index) => (
              <div
                key={feedback.feedbackId}
                className={`group relative bg-gray-50 hover:bg-gray-100 rounded-xl p-5 transition-all duration-200 hover:shadow-md ${
                  index === 0 ? "ring-2 ring-blue-100" : ""
                }`}
              >
                {/* User Info Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 relative">
                    {feedback.user.imageUrl ? (
                      <img
                        src={feedback.user.imageUrl}
                        alt={feedback.user.username}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                        {getInitials(feedback.user.username)}
                      </div>
                    )}
                    {index === 0 && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900 truncate">
                        {feedback.user.username}
                      </h4>
                      {index === 0 && (
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          Latest
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {formatDate(feedback.createAt)}
                    </p>
                  </div>
                </div>

                {/* Comment */}
                <div className="ml-16">
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                    <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                      {feedback.comment}
                    </p>
                  </div>
                </div>

                {/* Hover Actions */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition-colors duration-200">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 12h.01M12 12h.01M19 12h.01"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              No feedback yet
            </h4>
            <p className="text-gray-500 max-w-sm mx-auto">
              Be the first to share your thoughts on this task. Your feedback
              helps improve collaboration.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      {matchingFeedback.length > 0 && (
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Total feedback received</span>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {matchingFeedback.slice(0, 3).map((feedback, index) => (
                  <div key={index} className="relative">
                    {feedback.user.imageUrl ? (
                      <img
                        src={feedback.user.imageUrl}
                        alt={feedback.user.username}
                        className="w-6 h-6 rounded-full border-2 border-white object-cover"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-white flex items-center justify-center text-white text-xs font-medium">
                        {getInitials(feedback.user.username)}
                      </div>
                    )}
                  </div>
                ))}
                {matchingFeedback.length > 3 && (
                  <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-gray-600 text-xs font-medium">
                    +{matchingFeedback.length - 3}
                  </div>
                )}
              </div>
              <span className="font-medium text-gray-700">
                {matchingFeedback.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackDisplay;
