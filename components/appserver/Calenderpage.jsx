"use client";

import React, { useState, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { CalendarDays, MessageCircleMore } from "lucide-react";

// TaskCard UI component for events/tasks
const TaskCard = ({
  event,
  onTaskClick,
  isStacked = false,
  stackCount = 0,
}) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
  };

  if (isStacked) {
    return (
      <div className="group relative">
        <div className="absolute top-0.5 left-0.5 bg-green-200 rounded-md w-full h-full opacity-60 shadow-sm"></div>
        <div className="relative bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-md p-2 cursor-pointer hover:shadow-lg hover:from-green-100 hover:to-green-200 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <CalendarDays className="w-3 h-3 text-green-700" />
              <span className="font-semibold text-green-800 text-xs">
                {stackCount} Tasks
              </span>
            </div>
            <div className="bg-green-200 text-green-800 px-2 py-0.5 rounded-full text-xs font-medium">
              {formatDate(event.start)}
              {event.end &&
                event.start !== event.end &&
                ` - ${formatDate(event.end)}`}
            </div>
          </div>
          <div className="absolute top-full left-0 mt-1 w-64 bg-white border-2 border-green-200 rounded-lg shadow-xl p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="text-sm font-semibold text-green-800 mb-2 flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-green-600" />
              Tasks for {formatDate(event.start)}
              {event.end &&
                event.start !== event.end &&
                ` - ${formatDate(event.end)}`}
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {event.extendedProps.tasks?.map((task) => (
                <div
                  key={task.id}
                  className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 rounded-md p-2 hover:from-green-100 hover:to-green-200 hover:border-green-300 cursor-pointer transition-all duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    onTaskClick(task, e);
                  }}
                >
                  <div className="flex items-center gap-1 mb-1">
                    <CalendarDays className="w-3 h-3 text-green-600" />
                    <span className="font-semibold text-xs text-green-800">
                      {task.title}
                    </span>
                  </div>
                  {task.comment && (
                    <div className="flex items-center gap-1 text-xs text-green-700">
                      <MessageCircleMore className="w-3 h-3" />
                      <span className="truncate">{task.comment}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-md p-2 cursor-pointer hover:shadow-md transition-all duration-200">
      <div className="flex justify-between items-center mb-1">
        <div className="bg-green-200 text-green-800 px-2 py-0.5 rounded text-xs font-medium">
          {formatDate(event.start)}
          {event.end &&
            event.start !== event.end &&
            ` - ${formatDate(event.end)}`}
        </div>
      </div>
      <div className="flex items-center gap-1 mb-1">
        <CalendarDays className="w-3 h-3 text-green-600" />
        <span className="font-medium text-gray-800 text-sm">{event.title}</span>
      </div>
      {event.extendedProps.comment && (
        <div
          className="bg-white bg-opacity-80 border border-green-300 rounded p-2 cursor-pointer hover:bg-opacity-100 transition-all duration-200"
          onClick={(e) => {
            e.stopPropagation();
            onTaskClick(
              {
                id: event.id,
                title: event.title,
                start: event.start,
                end: event.end,
                comment: event.extendedProps.comment,
                type: event.extendedProps.type,
              },
              e
            );
          }}
        >
          <div className="flex items-start gap-1">
            <MessageCircleMore className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
            <span className="text-xs text-gray-700 leading-relaxed">
              {event.extendedProps.comment}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default function MyCalendar() {
  const [selectedTask, setSelectedTask] = useState(null);

  // Initial dummy events
  const [events, setEvents] = useState(() => {
    const initialEvents = [
      {
        title: "Meeting",
        start: "2025-05-05",
        end: "2025-05-08",
        type: "meeting",
        comment:
          "Important meeting about project planning and timeline discussion.",
      },
      {
        title: "Cooking",
        start: "2025-05-29",
        end: "2025-05-29",
        type: "cooking",
        comment:
          "Prepare special dinner for the family gathering this weekend.",
      },
      {
        title: "Shopping",
        start: "2025-05-05",
        end: "2025-05-08",
        type: "shopping",
        comment: "Buy groceries for the week.",
      },
      {
        title: "Gym",
        start: "2025-05-05",
        end: "2025-05-08",
        type: "exercise",
        comment: "Morning workout session.",
      },
      // add more if needed
    ].map((event) => ({ ...event, id: uuidv4() }));
    return initialEvents;
  });

  // Helper to convert date input to YYYY-MM-DD string
  const normalizeDate = (date) => {
    if (!date) return null;
    if (typeof date === "string") {
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) return date;
      return parsedDate.toISOString().split("T")[0];
    }
    if (date instanceof Date && !isNaN(date.getTime())) {
      return date.toISOString().split("T")[0];
    }
    return null;
  };

  // Group events by same start and end dates for stacking
  const groupedEvents = useMemo(() => {
    const grouped = {};

    events.forEach((event) => {
      const startDate = normalizeDate(event.start);
      const endDate = normalizeDate(event.end) || startDate;
      if (!startDate) return;

      const key = `${startDate}|${endDate}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push({ ...event, start: startDate, end: endDate });
    });

    return Object.entries(grouped).map(([key, items]) => {
      const [startDate, endDate] = key.split("|");
      if (items.length === 1) {
        return { ...items[0], start: startDate, end: endDate };
      }
      return {
        id: `stacked-${startDate}-${endDate}-${uuidv4()}`,
        title: `${items.length} Tasks`,
        start: startDate,
        end: endDate,
        extendedProps: { tasks: items },
        backgroundColor: "#DCFCE7",
        borderColor: "#22C55E",
      };
    });
  }, [events]);

  // Click handler to show task details popup
  const handleTaskClick = (task, jsEvent) => {
    if (task.comment) {
      setSelectedTask({
        ...task,
        position: { x: jsEvent?.clientX || 0, y: jsEvent?.clientY || 0 },
      });
    }
  };

  // Handle drag & drop event update
  const handleEventDrop = (info) => {
    const { event } = info;
    const eventId = event.id;

    setEvents((prevEvents) => {
      let updatedEvents = [];
      let draggedEvent = null;

      prevEvents.forEach((evt) => {
        if (evt.id === eventId) {
          draggedEvent = {
            ...evt,
            start: normalizeDate(event.start),
            end: normalizeDate(event.end) || normalizeDate(event.start),
          };
        } else {
          updatedEvents.push(evt);
        }
      });

      if (!draggedEvent) return prevEvents;

      // Remove dragged event from old group
      // Add it back to updatedEvents
      updatedEvents.push(draggedEvent);

      return updatedEvents;
    });
  };

  // Close comment popup
  const closePopup = () => setSelectedTask(null);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        events={groupedEvents}
        eventContent={(arg) => {
          const { event } = arg;
          const isStacked =
            event.extendedProps.tasks && event.extendedProps.tasks.length > 1;
          const stackCount = isStacked ? event.extendedProps.tasks.length : 0;

          return (
            <TaskCard
              event={event}
              isStacked={isStacked}
              stackCount={stackCount}
              onTaskClick={handleTaskClick}
            />
          );
        }}
        eventDrop={handleEventDrop}
        height="auto"
        dayMaxEventRows={3}
      />

      {/* Comment Popup */}
      {selectedTask && (
        <div
          onClick={closePopup}
          className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-lg max-w-sm max-h-[300px] overflow-y-auto shadow-lg relative"
            style={{ minWidth: 280 }}
          >
            <h3 className="text-lg font-semibold mb-2">{selectedTask.title}</h3>
            <p className="whitespace-pre-wrap text-gray-700">
              {selectedTask.comment}
            </p>
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 transition"
              aria-label="Close popup"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
// aa
