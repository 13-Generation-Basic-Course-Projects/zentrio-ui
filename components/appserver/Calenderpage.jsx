"use client";

import { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import timeGridPlugin from "@fullcalendar/timegrid";

// import BredCrum from "@/components/ui/BredCrum";
import CardTaskCalender from "@/components/card/CardTaskCalender";
import CardCommentCalender from "@/components/card/CardCommentCalender";
import BredCrum from "../bredcrum/Bredcrum";

export default function CalendarPage() {
  const calendarRef = useRef(null);

  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Task",
      start: "2025-05-02",
      end: "2025-05-05",
      extendedProps: {
        type: "task",
        content: "UX Design",
      },
    },
    {
      id: "2",
      title: "Comment",
      start: "2025-05-07",
      end: "2025-05-10",
      extendedProps: {
        type: "comment",
        content: "Frontend",
      },
    },
  ]);

  const handleDateSelect = (info) => {
    const commentText = prompt("Enter your comment:");
    if (commentText) {
      const newTask = {
        id: `${Date.now()}`,
        title: "Comment",
        start: info.startStr,
        end: info.endStr,
        extendedProps: {
          type: "comment",
          content: commentText,
        },
      };
      setTasks((prev) => [...prev, newTask]);
    }
  };

  const renderEventContent = ({ event }) => {
    const { type, content } = event.extendedProps;
    const baseStyle =
      "rounded border-2 px-2 font-bold text-green-600 bg-green-100";

    if (type === "task") {
      return (
        <div
          className={`${baseStyle} h-[70px] text-[0.95rem] border-green-500`}
        >
          {content}
        </div>
      );
    }

    if (type === "comment") {
      return (
        <div
          className={`${baseStyle} mt-1 h-[25px] text-[0.7rem] border-green-500`}
        >
          {content}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="p-4 h-screen flex flex-col">
      <BredCrum board="Hikko Design" feature="Calender" header="Calender" />

      <div className="grid grid-cols-12 gap-2 pt-6 h-full">
        {/* Calendar Scroll Section */}
        <div className="col-span-9 h-full overflow-y-auto pr-2 scrollbar-hidden">
          <div className="h-full scrollbar-hidden">
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
              selectable
              select={handleDateSelect}
              events={tasks}
              eventContent={renderEventContent}
            />
          </div>
        </div>

        {/* Sidebar Scroll Section */}
        <div className="col-span-3 h-full scrollbar-hidden bg-transparent overflow-y-auto pl-2 flex flex-col gap-[20px]">
          <CardTaskCalender tasks={tasks} calendarRef={calendarRef} />
          <CardCommentCalender tasks={tasks} calendarRef={calendarRef} />
        </div>
      </div>
    </div>
  );
}
