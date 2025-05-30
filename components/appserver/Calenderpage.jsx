"use client";

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
import { MessageCircleMore, ClipboardList } from "lucide-react";

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

  // handle add a comment
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
    const baseStyle =
      "rounded border-2 px-2 font-bold text-green-600 bg-green-100";
    // Format date
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

    // card task
    if (type === "task") {
      return (
        <div
          className={`${baseStyle} h-[70px] text-[0.95rem] border-green-500 p-1 flex flex-col`}
        >
          <div className="text-[0.65rem] font-medium text-green-600 bg-green-300 w-fit px-2 py-[2px] rounded">
            {formattedDate}
          </div>
          <div className="flex items-center gap-1">
            <ClipboardList className="w-4 h-4" />
            <span>{content}</span>
          </div>
        </div>
      );
    }
    // card comment
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

  return (
    <div className="p-4 h-screen flex flex-col overflow-hidden">
      <BredCrum
        board="Hikko Design"
        feature="Calender"
        header="Calender"
        modal={[<ModalCreateGanttBar key="modal" />]}
      />

      <div className="grid grid-cols-12 gap-4 h-full">
        {/* Calendar Scroll Section */}
        <div className="col-span-9 h-full overflow-hidden pr-2">
          <div className="h-full flex flex-col">
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
              height="auto"
            />
          </div>
        </div>

        {/* Sidebar Scroll Section */}
        <div className="col-span-3 h-full overflow-y-auto pl-2 flex flex-col gap-5">
          <CardTaskCalender tasks={tasks} />
          <CardTCommentCalender tasks={tasks} />
        </div>
      </div>
    </div>
  );
}
