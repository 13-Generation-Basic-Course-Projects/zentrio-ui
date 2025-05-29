'use client';

import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";

import BredCrum from "../bredcrum/Bredcrum";
import ModalCreateGanttBar from "../modal/board/ModalCreateGanttBar";
import CardTaskCalender from "../card/CardTaskCalender";
import CardTCommentCalender from "../card/CardCommentCalender";

export default function MyCalender({ tasks }) {
  const initialEvents = [
    {
      title: "Comment",
      start: "2025-05-02",
      end: "2025-05-05",
      extendedProps: {
        type: "task",
        content: "UX Design",
      },
    },
    {
      title: "Comment",
      start: "2025-05-07",
      end: "2025-05-10",
      extendedProps: {
        type: "task",
        content: "Frontend",
      },
    },
  ];

  const [comments, setComments] = useState(initialEvents);

  const handleDateSelect = (info) => {
    const commentText = prompt("Enter your comment:");
    if (commentText) {
      const newComment = {
        title: "Comment",
        start: info.startStr,
        end: info.endStr,
        extendedProps: {
          type: "comment",
          content: commentText,
        },
      };
      setComments((prev) => [...prev, newComment]);
    }
  };

  const renderEventContent = ({ event }) => {
    const { type, content } = event.extendedProps;
    const baseStyle = "rounded border-2 px-2 font-bold text-green-600 bg-green-100";

    if (type === "task") {
      return (
        <div className={`${baseStyle} h-[70px] text-[0.95rem] border-green-500`}>
          {content}
        </div>
      );
    }

    if (type === "comment") {
      return (
        <div className={`${baseStyle} mt-1 h-[25px] text-[0.7rem] border-green-500`}>
          {content}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="p-4 h-screen flex flex-col">
      <BredCrum
        board="Hikko Design"
        feature="Calender"
        header="Calender"
        modal={[<ModalCreateGanttBar key="modal" />]}
      />

      <div className="grid grid-cols-12 gap-4 pt-6 h-full">
        {/* Calendar Scroll Section */}
        <div className="col-span-9 h-full overflow-y-auto pr-2 scrollbar-hidden">
          <div className=" h-full">
            <FullCalendar
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
              events={comments}
              eventContent={renderEventContent}
            />
          </div>
        </div>

        {/* Sidebar Scroll Section */}
        <div className="col-span-3 h-full bg-transparent overflow-y-auto pl-2 flex flex-col gap-[20px]">
          <CardTaskCalender tasks={tasks} />
          <CardTCommentCalender tasks={tasks} />
        </div>
      </div>
    </div>
  );
}
