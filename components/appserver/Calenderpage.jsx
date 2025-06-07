"use client";

import BredCrum from "../bredcrum/MyBredcrum";
import CardTaskCalender from "../card/CardTaskCalender";
import CardTCommentCalender from "../card/CardCommentCalender";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";

import { useRef, useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MessageCircleMore,
  ClipboardList,
} from "lucide-react";

export default function MyCalender({ tasks, note }) {
  console.log("duma tasks", tasks);

  const calendarRef = useRef(null);
  const [currentTitle, setCurrentTitle] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  // color random
  const colorList = [
    {
      bg: "bg-blue-500",
      text: "text-blue-500",
      light: "bg-blue-100",
      border: "border-blue-500",
    },
    {
      bg: "bg-red-500",
      text: "text-red-500",
      light: "bg-red-100",
      border: "border-red-500",
    },
    {
      bg: "bg-orange-500",
      text: "text-orange-500",
      light: "bg-orange-100",
      border: "border-orange-500",
    },
    {
      bg: "bg-green-500",
      text: "text-green-500",
      light: "bg-green-100",
      border: "border-green-500",
    },
    {
      bg: "bg-purple-500",
      text: "text-purple-500",
      light: "bg-purple-100",
      border: "border-purple-500",
    },
  ];

  // Create task color mapping for consistency
  const taskColorMap = useMemo(() => {
    const taskList = Array.isArray(tasks?.payload) ? tasks.payload : [];
    const uniqueIds = new Set();
    const filteredTasks = taskList.filter((task) => {
      if (uniqueIds.has(task.taskId)) return false;
      uniqueIds.add(task.taskId);
      return true;
    });

    const colorMap = {};
    filteredTasks.forEach((task, index) => {
      colorMap[task.taskId] = colorList[index % colorList.length];
    });
    return colorMap;
  }, [tasks]);

  // map task to calendar
  const mappedTasks = useMemo(() => {
    const taskList = Array.isArray(tasks?.payload) ? tasks.payload : [];

    const uniqueIds = new Set();
    return taskList
      .filter((task) => {
        if (uniqueIds.has(task.taskId)) return false;
        uniqueIds.add(task.taskId);
        return true;
      })
      .map((task) => {
        const color = taskColorMap[task.taskId];
        return {
          id: task.taskId,
          title: task.title,
          start: task.startedAt || task.createdAt,
          end: task.finishedAt || task.createdAt,
          extendedProps: {
            type: "task",
            content: task.description,
            color,
            taskData: task,
          },
        };
      });
  }, [tasks, taskColorMap]);

  // Map comments to calendar events - show only one "Comment" event per task that has comments
  const mappedComments = useMemo(() => {
    if (!note?.payload || !selectedTaskId) return [];
    
    const taskComments = note.payload.filter(comment => comment.taskId === selectedTaskId);
    
    if (taskComments.length === 0) return [];
    
    // Show only one "Comment" event for the task
    const firstComment = taskComments[0];
    const taskColor = taskColorMap[selectedTaskId];
    
    return [{
      id: `comment-${selectedTaskId}`,
      title: "Comment",
      start: firstComment.notedAt,
      end: firstComment.tillDate || firstComment.notedAt,
      extendedProps: {
        type: "comment",
        content: "Comment",
        color: taskColor,
        commentCount: taskComments.length,
      },
    }];
  }, [note, selectedTaskId, taskColorMap]);

  // Filter events based on selected task
  const filteredEvents = useMemo(() => {
    if (!selectedTaskId) return [];
    
    const selectedTask = mappedTasks.filter(task => task.id === selectedTaskId);
    return [...selectedTask, ...mappedComments];
  }, [mappedTasks, mappedComments, selectedTaskId]);

  const handleTaskClick = (taskId) => {
    console.log("Task clicked:", taskId);
    setSelectedTaskId(taskId);
    
    // Navigate to the task date
    const task = mappedTasks.find((t) => t.id === taskId);
    if (task) {
      calendarRef.current?.getApi().gotoDate(task.start);
    }
  };

  const handleShowAllTasks = () => {
    setSelectedTaskId(null);
  };

  const renderEventContent = ({ event }) => {
    const { type, content, color } = event.extendedProps;
    const baseStyle = `rounded border-2 font-bold gap-1 ${color?.text} ${color?.light}`;

    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      });
    };
    const formattedDate = `${formatDate(event.start)} - ${formatDate(
      event.end
    )}`;

    if (type === "task") {
      return (
        <div
          className={`${baseStyle} h-[90px] text-[0.95rem] ${color?.border} p-1 flex flex-col`}
        >
          <div className="text-[0.70rem] font-bold bg-opacity-80 bg-white w-fit px-2 py-[2px] rounded">
            {formattedDate}
          </div>
          <div className="flex items-center gap-1">
            <ClipboardList className="w-4 h-4" />
            <span className="truncate">{event.title}</span>
          </div>
        </div>
      );
    }

    if (type === "comment") {
      return (
        <div
          className={`${baseStyle} mt-2 h-[40px] text-[0.75rem] ${color?.border} p-1 flex items-center gap-1`}
        >
          <MessageCircleMore className="w-4 h-4" />
          <span className="truncate">Comment</span>
        </div>
      );
    }

    return null;
  };

  // handle action custom header calendar
  const handleDateNav = (action) => {
    const calendarApi = calendarRef.current?.getApi();
    if (!calendarApi) return;

    if (action === "today") calendarApi.today();
    else if (action === "prev") calendarApi.prev();
    else if (action === "next") calendarApi.next();

    setCurrentTitle(calendarApi.view.title);
  };

  return (
    <div className="p-4 h-screen flex flex-col overflow-hidden">
      {/* FullCalendar 12-col grid */}
      <div className="grid grid-cols-12 gap-4 h-full">
        <div className="col-span-9 h-full overflow-hidden">
          <BredCrum board="Hikko Design" feature="Calender" header="Calender" />

          {/* custom header calendar */}
          <div className="flex justify-between items-center mt-4 px-2 mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleDateNav("today")}
                className="rounded-full px-4 py-1 shadow-sm bg-white text-gray-600 font-medium border border-gray-200 hover:bg-gray-50 transition"
              >
                Today
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => handleDateNav("prev")}
                className="rounded-full p-2 shadow-sm bg-white text-gray-500 hover:bg-gray-100 transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <h2 className="text-lg font-semibold text-gray-600">
                {currentTitle}
              </h2>
              <button
                onClick={() => handleDateNav("next")}
                className="rounded-full p-2 shadow-sm bg-white text-gray-500 hover:bg-gray-100 transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <FullCalendar
            ref={calendarRef}
            plugins={[
              resourceTimelinePlugin,
              dayGridPlugin,
              interactionPlugin,
              timeGridPlugin,
            ]}
            headerToolbar={false}
            initialView="dayGridMonth"
            events={filteredEvents}
            eventContent={renderEventContent}
            datesSet={(arg) => setCurrentTitle(arg.view.title)}
            height="auto"
          />
        </div>

        <div className="col-span-3 h-full overflow-y-auto p-2 flex flex-col gap-4">
          <CardTaskCalender 
            tasks={tasks} 
            onTaskClick={handleTaskClick} 
            taskColorMap={taskColorMap}
            selectedTaskId={selectedTaskId}
          />
          <CardTCommentCalender 
            note={note} 
            selectedTaskId={selectedTaskId}
            taskColorMap={taskColorMap}
          />
        </div>
      </div>
    </div>
  );
}