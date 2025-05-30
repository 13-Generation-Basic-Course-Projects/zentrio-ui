"use client";

import React, { useRef, useState, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";

import BredCrum from "../bredcrum/Bredcrum";
import ModalCreateGanttBar from "../modal/board/ModalCreateGanttBar";
import CardTaskCalender from "../card/CardTaskCalender";
import CardTCommentCalender from "../card/CardCommentCalender";
import { MessageCircleMore, ClipboardList } from "lucide-react";

export default function MyCalender({ tasks }) {
  const calendarRef = useRef(null);

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

  const [events, setEvents] = useState([]);

  const handleTaskClick = (dateStr, taskId) => {
    const task = mappedTasks.find((t) => t.id === taskId);
    if (task) {
      setEvents([task]);
      calendarRef.current?.getApi().gotoDate(dateStr);
    }
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
          <span>comment</span>
          <MessageCircleMore className="w-4 h-4" />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="p-4 h-screen flex flex-col overflow-hidden">
      <BredCrum board="Hikko Design" feature="Calender" header="Calender" />
      <div className="grid grid-cols-12 gap-4 h-full">
        <div className="col-span-9 h-full overflow-hidden pr-2">
          <FullCalendar
            ref={calendarRef}
            plugins={[
              resourceTimelinePlugin,
              dayGridPlugin,
              interactionPlugin,
              timeGridPlugin,
            ]}
            headerToolbar={{
              left: "today",
              center: "prev,title,next",
              right: "",
            }}
            initialView="dayGridMonth"
            events={events}
            eventContent={renderEventContent}
            height="auto"
          />
        </div>

        <div className="col-span-3 h-full overflow-y-auto p-2 flex flex-col gap-5">
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