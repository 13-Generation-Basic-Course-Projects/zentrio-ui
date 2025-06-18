"use client";

import { Card, CardHeader, CardBody } from "@heroui/react";
import Image from "next/image";
import tasklogo from "../../assets/task.png";
import {
  getAllNoteInCalendarAction,
  getChecklistByTaskIdAction,
} from "@/action/calendarV2.action";
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";

// Define color palette with count mappings - moved outside component to prevent recreation
const colorMap = [
  { count: 12, value: "bg-red-500", textColor: "text-red-500" },
  { count: 2, value: "bg-blue-500", textColor: "text-blue-500" },
  { count: 4, value: "bg-green-500", textColor: "text-green-500" },
  { count: 5, value: "bg-purple-500", textColor: "text-purple-500" },
  { count: 22, value: "bg-orange-500", textColor: "text-orange-500" },
];

export default function CardTaskCalender({ tasks, onTaskClick, activeTaskId }) {
  const [checklistCounts, setChecklistCounts] = useState({});
  const [commentCounts, setCommentCounts] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Use ref to track previous tasks to avoid unnecessary API calls
  const prevTasksRef = useRef();
  const loadingRef = useRef(false);

  // Memoize task IDs to detect actual changes
  const taskIds = useMemo(
    () =>
      tasks
        .map((task) => task.id)
        .sort()
        .join(","),
    [tasks]
  );

  // Memoized function to fetch data for a single task
  const fetchTaskData = useCallback(async (taskId) => {
    try {
      const [checklistResult, commentResult] = await Promise.all([
        getChecklistByTaskIdAction(taskId),
        getAllNoteInCalendarAction(taskId),
      ]);

      return {
        taskId,
        checklistCount: checklistResult?.payload?.length || 0,
        commentCount: commentResult?.payload?.length || 0,
      };
    } catch (err) {
      console.error(`Data fetch failed for task ${taskId}:`, err);
      return {
        taskId,
        checklistCount: 0,
        commentCount: 0,
      };
    }
  }, []);

  // Optimized data fetching with batching and deduplication
  useEffect(() => {
    if (tasks.length === 0) {
      setChecklistCounts({});
      setCommentCounts({});
      return;
    }

    // Prevent multiple simultaneous fetches
    if (loadingRef.current) return;

    // Check if tasks actually changed (not just reference)
    const currentTaskIds = tasks
      .map((t) => t.id)
      .sort()
      .join(",");
    const prevTaskIds = prevTasksRef.current
      ?.map((t) => t.id)
      .sort()
      .join(",");

    if (currentTaskIds === prevTaskIds) return;

    prevTasksRef.current = tasks;
    loadingRef.current = true;
    setIsLoading(true);

    const fetchAllData = async () => {
      try {
        // Fetch only new tasks that we don't have data for
        const newTasks = tasks.filter(
          (task) => !(task.id in checklistCounts) || !(task.id in commentCounts)
        );

        if (newTasks.length === 0) {
          loadingRef.current = false;
          setIsLoading(false);
          return;
        }

        // Batch fetch all new task data
        const results = await Promise.all(
          newTasks.map((task) => fetchTaskData(task.id))
        );

        // Update state in batches to minimize re-renders
        const newChecklistCounts = {};
        const newCommentCounts = {};

        results.forEach(({ taskId, checklistCount, commentCount }) => {
          newChecklistCounts[taskId] = checklistCount;
          newCommentCounts[taskId] = commentCount;
        });

        // Batch state updates
        setChecklistCounts((prev) => ({ ...prev, ...newChecklistCounts }));
        setCommentCounts((prev) => ({ ...prev, ...newCommentCounts }));
      } catch (error) {
        console.error("Failed to fetch task data:", error);
      } finally {
        loadingRef.current = false;
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [taskIds, fetchTaskData]); // Use taskIds instead of tasks array

  // Memoized task click handler
  const handleTaskClick = useCallback(
    (task) => {
      if (task.start) {
        onTaskClick?.(task.start, task.id);
      }
    },
    [onTaskClick]
  );

  // Memoized task list to prevent unnecessary re-renders
  const taskList = useMemo(() => {
    if (tasks.length === 0) {
      return <div className="text-title">No tasks available</div>;
    }

    return tasks.map((task, index) => {
      const color = colorMap[index % colorMap.length];
      const checklistCount = checklistCounts[task.id] ?? 0;
      const commentCount = commentCounts[task.id] ?? 0;
      const isActive = task.id === activeTaskId;

      return (
        <TaskItem
          key={task.id}
          task={task}
          color={color}
          checklistCount={checklistCount}
          commentCount={commentCount}
          isActive={isActive}
          onTaskClick={handleTaskClick}
        />
      );
    });
  }, [tasks, checklistCounts, commentCounts, activeTaskId, handleTaskClick]);

  return (
    <Card className="py-4 rounded-medium bg-white w-full mx-auto shadow-sm h-[350px]">
      <CardHeader className="pb-0 pt-2 px-6 flex-col items-start">
        <div className="flex items-center gap-3">
          <Image
            src={tasklogo}
            className="w-5 h-5 object-contain"
            alt="task-icon"
          />
          <h1 className="text-title text-h6 font-semibold">Tasks</h1>
        </div>
      </CardHeader>

      <CardBody className="overflow-y-auto scrollbar-hidden py-3 px-4 rounded-medium text-body-sm">
        {taskList}
      </CardBody>
    </Card>
  );
}

// Separate memoized component for each task item
const TaskItem = React.memo(
  ({ task, color, checklistCount, commentCount, isActive, onTaskClick }) => {
    const handleClick = useCallback(() => {
      onTaskClick(task);
    }, [task, onTaskClick]);

    return (
      <div
        onClick={handleClick}
        className={`py-3 px-3 flex items-center justify-between gap-2 rounded-xl cursor-pointer transition-colors duration-200 ease-in-out ${
          isActive ? "bg-blue-100 shadow" : "bg-white hover:bg-gray-50"
        }`}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0 text-caption">
          <span
            className={`w-3 h-3 rounded-full ${color.value} flex-shrink-0`}
          />
          <span className={`${color.textColor} font-medium truncate`}>
            {task.title}
          </span>
        </div>
        <small className="text-title font-medium text-xs flex-shrink-0">
          {commentCount} note{commentCount !== 1 ? "s" : ""}
        </small>
      </div>
    );
  }
);

TaskItem.displayName = "TaskItem";
