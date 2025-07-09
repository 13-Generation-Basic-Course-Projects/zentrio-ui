import React from "react";
import { IconEllipsisVertical } from "../icon/everyicon";
import ProgressBar from "./ProgressBar";

export default function ActiveBoardsOther({
  userAchievement,
  MemberDetails,
  userId,
}) {
  // Find the specific user from MemberDetails array based on userId
  const userDetails =
    MemberDetails?.find((member) => member.userId === userId) || {};
  const userTasks = userDetails.tasks || [];
  const userRoles = userDetails.roles || [];
  const createdAt = userAchievement?.payload?.createdAt?.split("T")[0] || "";

  // Define a set of base colors for task cards
  const colorPairs = [
    {
      avatar: "bg-slate-green",
      progress: "bg-green-400",
      text: "text-green-400",
    },
    {
      avatar: "bg-slate-orange",
      progress: "bg-orange-200",
      text: "text-orange-300",
    },
    {
      avatar: "bg-slate-purple",
      progress: "bg-gray-400",
      text: "text-gray-400",
    },
    {
      avatar: "bg-slate-blue",
      progress: "bg-blue-300",
      text: "text-blue-300",
    },
  ];

  // Define task categories and their properties
  const taskCategories = {
    frontend: {
      keywords: [
        "Frontend",
        "UI",
        "Component",
        "Page",
        "responsiveness",
        "dark mode",
      ],
      display: "Frontend",
      showProgress: true,
      priority: "high",
    },
    backend: {
      keywords: ["API", "Auth", "Database", "cron", "notification", "OAuth"],
      display: "Backend",
      showProgress: true,
      priority: "high",
    },
    integration: {
      keywords: ["Connect", "Integration", "Gantt", "Kanban"],
      display: "Integration",
      showProgress: true,
      priority: "medium",
    },
    setup: {
      keywords: ["Setup", "Repository", "Diagram"],
      display: "Setup",
      showProgress: false,
      priority: "low",
    },
    bug_fix: {
      keywords: ["Fix", "bug", "Optimize"],
      display: "Bug Fix",
      showProgress: true,
      priority: "high",
    },
    feature: {
      keywords: ["Feature", "toggle", "access", "filtering", "spinners"],
      display: "Feature",
      showProgress: true,
      priority: "medium",
    },
  };

  // Function to categorize tasks
  const categorizeTask = (taskName) => {
    for (const [category, config] of Object.entries(taskCategories)) {
      if (
        config.keywords.some((keyword) =>
          taskName.toLowerCase().includes(keyword.toLowerCase())
        )
      ) {
        return { category, ...config };
      }
    }
    return {
      category: "general",
      display: "General",
      showProgress: false,
      priority: "low",
    };
  };

  // Stable hash function based on task name
  const getStableColor = (taskName) => {
    const hash = Array.from(taskName || "").reduce(
      (acc, char) => acc + char.charCodeAt(0),
      0
    );
    return colorPairs[hash % colorPairs.length];
  };

  // Get primary role for display
  const getPrimaryRole = (roles) => {
    if (roles.includes("ROLE_LEADER")) return "Leader";
    if (roles.includes("ROLE_MANAGER")) return "Manager";
    if (roles.includes("ROLE_MEMBER")) return "Member";
    return "Unknown";
  };

  // Process each task to add derived properties for UI display
  const processedTasks = userTasks.map((task, index) => {
    const taskCategory = categorizeTask(task);
    const initial = task.charAt(0).toUpperCase() || "T";
    const selectedColorPair = getStableColor(task);

    // Generate realistic progress based on task type and user role
    const baseProgress =
      taskCategory.priority === "high"
        ? 60
        : taskCategory.priority === "medium"
        ? 40
        : 20;
    const roleBonus = userRoles.includes("ROLE_LEADER")
      ? 20
      : userRoles.includes("ROLE_MANAGER")
      ? 10
      : 0;
    const randomVariation = Math.floor(Math.random() * 20) - 10;
    // Force 0% for specific tasks (e.g., for testing)
    const percent = task.toLowerCase().includes("test-zero") // Example condition
      ? 0
      : Math.min(100, Math.max(0, baseProgress + roleBonus + randomVariation));

    return {
      id: `task-${index}`,
      name: task,
      category: taskCategory.category,
      categoryDisplay: taskCategory.display,
      color: selectedColorPair.avatar,
      progressColor: taskCategory.showProgress
        ? selectedColorPair.progress
        : null,
      textColor: selectedColorPair.text,
      initial,
      showProgress: taskCategory.showProgress,
      priority: taskCategory.priority,
      percent,
      assignedDate: createdAt,
    };
  });

  // Group tasks by category for better organization
  const groupedTasks = processedTasks.reduce((acc, task) => {
    if (!acc[task.category]) {
      acc[task.category] = [];
    }
    acc[task.category].push(task);
    return acc;
  }, {});

  const primaryRole = getPrimaryRole(userRoles);

  //////  ("ActiveBoardsOther", MemberDetails, userId);
  //////  ("User tasks:", userTasks);
  //////  ("Processed tasks:", processedTasks);

  return (
    <div className="rounded-xl shadow bg-white flex flex-col min-h-screen">
      {/* Sticky Header Section */}
      <div className="sticky top-0 bg-white z-10 ">
        {/* Title Header */}
        <div className="flex justify-between py-0 px-4 border-b-1 border-stroke">
          <h3 className="text-body font-semibold">Active Tasks</h3>
        </div>

        {/* User Info Header */}
        <div className="px-4 py-3 bg-gray-50 ">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">
                {userDetails.username || "Unknown User"}
              </p>
              <p className="text-xs text-gray-500">
                Role: {primaryRole} • {userTasks.length} tasks assigned
              </p>
            </div>
            {userDetails.profileImage && (
              <img
                src={userDetails.profileImage}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            )}
          </div>
        </div>

        {/* Summary Section */}
        {userTasks.length > 0 && (
          <div className="px-4 py-3 bg-gray-50 ">
            <div className="flex justify-between text-xs text-gray-600">
              <span>Total Tasks: {userTasks.length}</span>
              <span>Categories: {Object.keys(groupedTasks).length}</span>
              <span>
                Avg Progress:{" "}
                {Math.round(
                  processedTasks.reduce((sum, task) => sum + task.percent, 0) /
                    processedTasks.length
                )}
                %
              </span>
            </div>
          </div>
        )}

        {/* Column Headers */}
        <div className="hidden grid grid-cols-2 text-body-sm font-semibold text-description bg-gray-100 p-4">
          <span>Task Name</span>
          <span>Progress</span>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 min-h-0">
          {userTasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">No tasks assigned</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {processedTasks.map((task) => (
                <li
                  key={task.id}
                  className="grid grid-cols-12 items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3 col-span-4 ">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${task.textColor} font-semibold ${task.color} flex-shrink-0`}
                    >
                      {task.initial}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm truncate">
                        {task.name}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-description">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                          {task.categoryDisplay}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full ${
                            task.priority === "high"
                              ? "bg-red-100 text-red-700"
                              : task.priority === "medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>
                      {task.assignedDate && (
                        <p className="text-xs text-gray-500 mt-1">
                          Assigned: {task.assignedDate}
                        </p>
                      )}
                    </div>
                  </div>
                  {task.showProgress && (
                    <div className="col-span-8">
                      <ProgressBar
                        percent={task.percent}
                        color={task.progressColor}
                      />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
