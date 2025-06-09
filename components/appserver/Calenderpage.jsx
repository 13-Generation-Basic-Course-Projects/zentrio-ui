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

import BredCrum from "../bredcrum/MyBredcrum";
import ModalCreateGanttBar from "../modal/board/ModalCreateGanttBar";
import CardTaskCalender from "../card/CardTaskCalender";
import CardTCommentCalender from "../card/CardCommentCalender";

export default function MyCalender({ tasks }) {
  const calendarRef = useRef(null);
  const [currentTitle, setCurrentTitle] = useState("");

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
        if (uniqueIds.has(task.taskId)) return false;
        uniqueIds.add(task.taskId);
        return true;
      })
      .map((task, index) => {
        const color = colorList[index % colorList.length];
        return {
          id: task.taskId,
          title: task.title,
          start: task.createdAt,
          end: task.finishedAt ?? task.createdAt,
          extendedProps: {
            // type: "task",
            type: task.type || "task",
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
        <div>
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
          {/* at here for create comment */}
          <button
            onClick={() => {
              setNewEventData({ ...newEventData, type: "task" });
              setIsOpen(true);
            }}
            className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-4 shadow-md"
          >
            +
          </button>
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

  const handleDateNav = (action) => {
    const calendarApi = calendarRef.current?.getApi();
    if (!calendarApi) return;

    if (action === "today") calendarApi.today();
    else if (action === "prev") calendarApi.prev();
    else if (action === "next") calendarApi.next();

    setCurrentTitle(calendarApi.view.title);
  };


  /* use for handler modal comment */
  const [isOpen, setIsOpen] = useState(false);
  const [newEventData, setNewEventData] = useState({
    title: "",
    description: "",
    type: "task",
    start: "",
    end: "",
  });
  const handleDateSelect = (info) => {
    setNewEventData({
      title: "",
      description: "",
      type: "task", // or "comment"
      start: info.startStr,
      end: info.endStr,
    });
    setIsOpen(true);
  };

  const handleEventSubmit = () => {
    const color = colorList[Math.floor(Math.random() * colorList.length)];

    const newEvent = {
      id: Date.now().toString(),
      title: newEventData.title,
      start: newEventData.start,
      end: newEventData.end,
      extendedProps: {
        type: newEventData.type,
        content: newEventData.description,
        color,
      },
    };

    setEvents((prev) => [...prev, newEvent]);
  };
  
  


  return (
    <div className="p-4 h-screen flex flex-col overflow-hidden">
      <BredCrum board="Hikko Design" feature="Calender" header="Calender" />

      {/* Move header outside the grid */}
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

      {/* Full 12-col grid */}
      <div className="grid grid-cols-12 gap-4 h-full">
        <div className="col-span-9 max-h-[700px]  pr-2">
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
              
              /* it make comment can select */
              selectable={true}
              select={(info) => handleDateSelect(info)}
            />
          </div>
        </div>

        <div className="col-span-3 h-full pl-2 flex flex-col gap-5">
          <CardTaskCalender
            tasks={mappedTasks}
            onTaskClick={(dateStr, taskId) => handleTaskClick(dateStr, taskId)}
          />
          <CardTCommentCalender tasks={tasks} />
        </div>
      </div>

      {/* modal for create commemt when select at button */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-[400px] space-y-4">
            <h2 className="text-lg font-semibold">Create Event</h2>
            <input
              className="w-full border rounded px-3 py-1"
              placeholder="Title"
              value={newEventData.title}
              onChange={(e) =>
                setNewEventData({ ...newEventData, title: e.target.value })
              }
            />
            <textarea
              className="w-full border rounded px-3 py-1"
              placeholder="Description"
              value={newEventData.description}
              onChange={(e) =>
                setNewEventData({
                  ...newEventData,
                  description: e.target.value,
                })
              }
            />
            <select
              className="w-full border rounded px-3 py-1"
              value={newEventData.type}
              onChange={(e) =>
                setNewEventData({ ...newEventData, type: e.target.value })
              }
            >
              <option value="task">Task</option>
              <option value="comment">Comment</option>
            </select>

            <div className="flex gap-2">
              <input
                type="date"
                className="w-full border rounded px-3 py-1"
                value={newEventData.start}
                onChange={(e) =>
                  setNewEventData({ ...newEventData, start: e.target.value })
                }
              />
              <input
                type="date"
                className="w-full border rounded px-3 py-1"
                value={newEventData.end}
                onChange={(e) =>
                  setNewEventData({ ...newEventData, end: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-1 text-sm rounded bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleEventSubmit();
                  setIsOpen(false);
                }}
                className="px-4 py-1 text-sm rounded bg-blue-500 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
