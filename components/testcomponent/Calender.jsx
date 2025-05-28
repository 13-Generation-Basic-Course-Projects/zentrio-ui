"use client";

import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

export default function GanttChart() {
  const [tasks, setTasks] = useState([
    {
      title: "Meeting",
      startDate: "2025-04-16",
      endDate: "2025-04-20",
      duration: "4 Days",
    },
    {
      title: "Frontend",
      startDate: "2025-04-18",
      endDate: "2025-04-22",
      duration: "4 Days",
    },
    {
      title: "UX Researchs",
      startDate: "2025-04-20",
      endDate: "2025-04-23",
      duration: "3 Days",
    },
    {
      title: "UI Design",
      startDate: "2025-04-21",
      endDate: "2025-04-26",
      duration: "5 Days",
    },
    {
      title: "Web Team Progress Update",
      startDate: "2025-04-23",
      endDate: "2025-04-27",
      duration: "4 Days",
    },
  ]);

  const handleEventDrop = (info) => {
    const { event } = info;
    const newTasks = tasks.map((task) =>
      task.title === event.title.split("\n")[0]
        ? {
            ...task,
            startDate: event.startStr,
            endDate: event.endStr,
          }
        : task
    );
    setTasks(newTasks);
  };

  const events = tasks.map((task) => ({
    title: `${task.title}\nPlanning - Phase\n${task.duration}`,
    start: task.startDate,
    end: task.endDate,
    allDay: true,
  }));

  return (
    <>
      <div className="p-4 max-w-full overflow-x-auto">
        <div className="sm:min-w-full max-w-none">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
            initialView="dayGridMonth"
            initialDate="2025-04-16"
            visibleRange={{
              start: "2025-04-16",
              end: "2025-04-29",
            }}
            editable={true}
            eventDrop={handleEventDrop}
            events={events}
            headerToolbar={{
              left: "title",
              center: "",
              right: "today prev,next",
            }}
            titleFormat={{ year: "numeric", month: "long" }}
            dayHeaderContent={({ date }) => {
              const weekday = date.toLocaleDateString("en-US", {
                weekday: "short",
              });
              return (
                <div className="flex flex-col items-center">
                  <span className="text-sm font-medium text-gray-600">
                    {weekday}
                  </span>
                </div>
              );
            }}
            dayHeaderClassNames={() => "bg-gray-100 rounded-md py-2"}
            dayCellContent={() => null}
            dayCellClassNames={() =>
              "hover:bg-gray-50 border border-gray-100 transition rounded-lg"
            }
            eventClassNames={(arg) => {
              const title = arg.event.title.toLowerCase();
              let base =
                "whitespace-pre-line text-left font-medium leading-tight text-xs px-2 py-1 rounded shadow mb-1";
              if (title.includes("meeting"))
                return `bg-green-100 text-green-800 border-l-4 border-green-400 ${base}`;
              if (title.includes("frontend"))
                return `bg-orange-100 text-orange-800 border-l-4 border-orange-300 ${base}`;
              if (title.includes("ux"))
                return `bg-red-100 text-red-800 border-l-4 border-red-300 ${base}`;
              if (title.includes("ui"))
                return `bg-purple-100 text-purple-800 border-l-4 border-purple-300 ${base}`;
              if (title.includes("web team"))
                return `bg-cyan-100 text-cyan-800 border-l-4 border-cyan-300 ${base}`;
              return `bg-blue-100 text-blue-800 border-l-4 border-blue-300 ${base}`;
            }}
            buttonText={{
              today: "Today",
            }}
            eventDisplay="block"
          />
        </div>
      </div>

      <style jsx global>{`
        .fc-event-title {
          white-space: pre-line !important;
        }
        .fc-daygrid-event-harness {
          margin-top: 6px !important;
        }
        .fc-daygrid-event {
          width: 100% !important;
        }
        
        .fc-daygrid-day-number {
          display: none !important;
        }
      `}</style>
    </>
  );
}
