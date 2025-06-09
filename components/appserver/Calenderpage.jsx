"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
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
import { dropdown } from "@heroui/theme";
import { Button } from "@heroui/react";

/*
 * Use normalizeDateToDay to compare dates ignoring time.
 * Adjust selected end date by subtracting 1 day for inclusiveness.
 */

function normalizeDateToDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

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

  /*
   * for right click state
   */
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    eventId: null,
  });

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
          onContextMenu={(e) => {
            e.preventDefault();
            setContextMenu({
              visible: true,
              x: e.clientX,
              y: e.clientY,
              eventId: event.id,
            });
          }}
          className={`mt-1 h-[30px] text-[0.7rem] flex items-center gap-1 rounded border-2 border-dashed px-2 py-1 ${
            color?.text || "text-green-600"
          } ${color?.light || "bg-green-100"}`}
        >
          <MessageCircleMore className="w-4 h-4" />
          <span className="truncate">
            {event.extendedProps.noted || "No note"}
          </span>
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

  /* state use for comments dropdown */
  const [commentDropdown, setCommentDropdown] = useState({
    visible: false,
    x: 0,
    y: 0,
    eventData: {
      noted: "",
      start: "",
      end: "",
      type: "comment",
    },
  });

  const [newEventData, setNewEventData] = useState({
    noted: "",
    // description: "",
    type: "comment",
    start: "",
    end: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const handleDateSelect = (info) => {
    const selectedStart = new Date(info.startStr);
    const selectedEnd = new Date(info.endStr);

    const isWithinAnyTask = mappedTasks.some((task) => {
      const taskStart = normalizeDateToDay(task.start);
      const taskEnd = normalizeDateToDay(task.end);
      const selStart = normalizeDateToDay(selectedStart);
      const selEnd = normalizeDateToDay(
        new Date(selectedEnd.getTime() - 24 * 60 * 60 * 1000)
      );

      return selStart >= taskStart && selEnd <= taskEnd;
    });

    if (!isWithinAnyTask) {
      setShowPopup(true);
      return;
    }

    // Use cursor position if available (must pass via event)
    const x = info.jsEvent?.clientX || window.innerWidth / 2;
    const y = info.jsEvent?.clientY || window.innerHeight / 2;

    setCommentDropdown({
      visible: true,
      x,
      y,
      eventData: {
        noted: "",
        start: info.startStr,
        end: info.endStr,
        type: "comment",
      },
    });
  };

  const handleEventSubmit = () => {
    const color = colorList[Math.floor(Math.random() * colorList.length)];

    if (newEventData.id) {
      // update existing
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === newEventData.id
            ? {
                ...ev,
                noted: newEventData.noted,
                start: newEventData.start,
                end: newEventData.end,
                extendedProps: {
                  ...ev.extendedProps,
                  type: newEventData.type,
                  content: newEventData.description,
                  color,
                },
              }
            : ev
        )
      );
    } else {
      // create new
      const newEvent = {
        id: Date.now().toString(),
        title: "Comment",
        noted: newEventData.noted,
        start: newEventData.start,
        end: newEventData.end,
        extendedProps: {
          type: newEventData.type,
          content: newEventData.description,
          color,
        },
      };
      setEvents((prev) => [...prev, newEvent]);
    }

    setIsOpen(false);
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
              // select={(info) => handleDateSelect(info)}
              select={(info, jsEvent) => handleDateSelect({ ...info, jsEvent })}
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
      {/* {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[400px] space-y-4">
            <h2 className="text-lg font-semibold text-blue-600 flex items-center gap-2">
              <MessageCircleMore className="w-5 h-5" />
              Create Comment (Note)
            </h2>

            <input
              className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Write your note here ✍️"
              value={newEventData.noted}
              onChange={(e) =>
                setNewEventData({ ...newEventData, noted: e.target.value })
              }
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleEventSubmit();
                  setIsOpen(false);
                }}
                className="px-4 py-1 text-sm rounded bg-blue-500 text-white hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )} */}
      {/* alert popup range comment */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white px-6 py-4 rounded-xl shadow-xl w-[350px] space-y-3">
            <h3 className="text-red-600 font-semibold text-lg">
              ⚠️ Invalid Selection
            </h3>
            <p className="text-gray-700 text-sm">
              Comments can only be added within the duration of a task.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-1 text-sm rounded bg-blue-500 text-white hover:bg-blue-600"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Render the Context Menu (when right click it give this option) */}
      {contextMenu.visible && (
        <div
          style={{
            position: "fixed",
            top: contextMenu.y,
            left: contextMenu.x,
            backgroundColor: "white",
            // border: "1px solid #ccc",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            borderRadius: "15px",
            zIndex: 10000,
            width: "100px",
          }}
          onMouseLeave={() =>
            setContextMenu({ ...contextMenu, visible: false })
          }
        >
          <button
            className="w-full px-3 py-2 text-left hover:bg-gray-100 text-caption-tiny"
            onClick={() => {
              const comment = events.find((e) => e.id === contextMenu.eventId);
              if (comment) {
                setNewEventData({
                  ...comment,
                  noted: comment.noted || "",
                  start: comment.start,
                  end: comment.end,
                  type: comment.extendedProps.type,
                });
                setIsOpen(true); // open modal for update
                setContextMenu({ ...contextMenu, visible: false });
              }
            }}
          >
            Update
          </button>
          <button
            className="w-full px-3 py-2 text-left hover:bg-gray-100 text-red-600 text-caption-tiny"
            onClick={() => {
              setEvents((prev) =>
                prev.filter((e) => e.id !== contextMenu.eventId)
              );
              setContextMenu({ ...contextMenu, visible: false });
            }}
          >
            Delete
          </button>
        </div>
      )}
      {/* Render dropdown for comment input */}
      {commentDropdown.visible && (
        <div
          className="fixed bg-white p-4 rounded-medium shadow-xl border w-[300px] z-50"
          style={{ top: commentDropdown.y + 120 }}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-body-sm font-semibold text-blue-600 flex items-center gap-2 mb-2">
            <MessageCircleMore className="w-4 h-4" />
            Create Comment (Note)
          </h2>

          <input
            className="w-full border border-blue-300 rounded-medium px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-caption-tiny"
            placeholder="Write your note here ✍️"
            value={commentDropdown.eventData.noted}
            onChange={(e) =>
              setCommentDropdown({
                ...commentDropdown,
                eventData: {
                  ...commentDropdown.eventData,
                  noted: e.target.value,
                },
              })
            }
          />

          <div className="flex justify-end gap-2">
            <Button
              // color="primary"
              radius="full"
              type="submit"
              onClick={() =>
                setCommentDropdown((prev) => ({ ...prev, visible: false }))
              }
              className="px-3 py-1 text-btn-sm rounded-medium bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </Button>
            <Button
              color="primary"
              radius="full"
              type="submit"
              onClick={() => {
                const color =
                  colorList[Math.floor(Math.random() * colorList.length)];

                const newEvent = {
                  id: Date.now().toString(),
                  title: "Comment",
                  noted: commentDropdown.eventData.noted,
                  start: commentDropdown.eventData.start,
                  end: commentDropdown.eventData.end,
                  extendedProps: {
                    type: "comment",
                    color,
                  },
                };

                setEvents((prev) => [...prev, newEvent]);
                setCommentDropdown((prev) => ({ ...prev, visible: false }));
              }}
              className="px-3 py-1 text-btn-sm rounded-medium "
            >
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
