"use client";

import React, { useRef, useState, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import {
  ChevronLeft,
  ChevronRight,
  MessageCircleMore,
  ClipboardList,
} from "lucide-react";

import BredCrum from "../bredcrum/Bredcrum";
import ModalCreateGanttBar from "../modal/board/ModalCreateGanttBar";
import CardTaskCalender from "../card/CardTaskCalender";
import CardTCommentCalender from "../card/CardCommentCalender";

export default function MyCalender({ tasks }) {
  const calendarRef = useRef(null);
  const [currentTitle, setCurrentTitle] = useState("");
  const [events, setEvents] = useState([]);

  const [showCommentForm, setShowCommentForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [commentText, setCommentText] = useState("");

  const colorList = [
    {
      bg: "bg-red-500",
      text: "text-red-500",
      light: "bg-red-100",
      border: "border-red-500",
    },
    {
      bg: "bg-blue-500",
      text: "text-blue-500",
      light: "bg-blue-100",
      border: "border-blue-500",
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
    {
      bg: "bg-orange-500",
      text: "text-orange-500",
      light: "bg-orange-100",
      border: "border-orange-500",
    },
  ];

  const mappedTasks = useMemo(() => {
    const uniqueIds = new Set();
    return tasks
      .filter((task) => {
        if (uniqueIds.has(task.task_id)) return false;
        uniqueIds.add(task.task_id);
        return true;
      })
      .map((task, index) => {
        const color = colorList[index % colorList.length];
        return {
          id: task.task_id,
          title: task.title,
          start: task.created_at,
          end: task.finished_at ?? task.created_at,
          extendedProps: {
            type: "task",
            content: task.description,
            color,
          },
        };
      });
  }, [tasks]);

  React.useEffect(() => {
    setEvents(mappedTasks);
  }, [mappedTasks]);

  const handleTaskClick = (dateStr, taskId) => {
    const task = mappedTasks.find((t) => t.id === taskId);
    if (task) {
      setEvents([task]);
      calendarRef.current?.getApi().gotoDate(dateStr);
    }
  };

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setShowCommentForm(true);
  };

  const renderEventContent = ({ event }) => {
    const { type, content, color } = event.extendedProps;
    const baseStyle = `rounded border-2 px-2 font-bold ${
      color?.text || "text-green-600"
    } ${color?.light || "bg-green-100"}`;

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
          className={`${baseStyle} h-[70px] text-[0.9rem] ${
            color?.border || "border-green-500"
          } p-1 flex flex-col`}
        >
          <div className="text-[0.65rem] font-medium bg-opacity-80 bg-white w-fit px-2 py-[2px] rounded">
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
          className={`${baseStyle} mt-2 h-[30px] text-[0.7rem] flex items-center gap-1 border-green-500`}
        >
          <span>Comment</span>
          <MessageCircleMore className="w-4 h-4" />
        </div>
      );
    }

    return null;
  };

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
      <BredCrum board="Hikko Design" feature="Calendar" header="Calendar" />

      <div className="flex space-x-[500px] items-center mt-4 px-2 mb-6">
        <button
          onClick={() => handleDateNav("today")}
          className="rounded-full px-4 py-1 shadow-sm bg-white text-gray-600 font-medium border border-gray-200 hover:bg-gray-50 transition"
        >
          Today
        </button>

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

      <div className="grid grid-cols-12 gap-4 h-full">
        <div className="col-span-9 max-h-[700px] pr-2">
          <div className="h-full overflow-y-auto scrollbar-hidden">
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
              events={events}
              eventContent={renderEventContent}
              datesSet={(arg) => setCurrentTitle(arg.view.title)}
              height="auto"
              dateClick={handleDateClick}
            />
          </div>
        </div>

        <div className="col-span-3 h-full overflow-y-auto pl-2 flex flex-col gap-5">
          <CardTaskCalender
            tasks={mappedTasks}
            onTaskClick={(dateStr, taskId) => handleTaskClick(dateStr, taskId)}
          />
          <CardTCommentCalender tasks={tasks} />
        </div>
      </div>
    </div>
  );
}
