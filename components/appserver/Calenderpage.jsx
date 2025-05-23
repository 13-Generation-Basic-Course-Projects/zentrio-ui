"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import CardTaskCalender from "../card/CardTaskCalender";
import CardTCommentCalender from "../card/CardCommentCalender";
import { CalendarDays, MessageCircleMore } from 'lucide-react';
// import { Tooltip } from "react-tooltip";


export default function MyCalendar({ tasks, comments }) {
  const renderEventContent = (eventInfo) => {
    const { event } = eventInfo;
    const { comment } = event.extendedProps;

    const formatDate = (dateStr) =>
      new Date(dateStr).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
    });

  return (
    <div className="bg-green-50 border border-green-300 rounded-xl p-2 h-auto">
      <div className="flex text-green-600 mb-1 gap-2 text-body-sm ">
        <div className="bg-green-200 p-2 rounded-xl">
          {formatDate(event.start)} - {formatDate(event.end)}
        </div>
      </div>
      <div className="text-gray-600 flex items-center gap-3 font-bold text-body-lg mb-2">
        <CalendarDays className="w-5 h-5 text-green-600" />
        <span>{event.title}</span>
      </div>
      {comment && (
        <div className="flex items-start gap-2 text-xs text-gray-500 ">
          <div className=" flex rounded-xl gap-1 border p-1">
            <span>{comment}</span>
            <MessageCircleMore className="w-4 h-4"/>
          </div>
        </div>
      )}
    </div>
  );
};

  const events = [
    {
      title: "Meeting",
      start: "2025-05-27",
      end: "2025-05-30",
      type: "meeting",
      comment: "comment",
      backgroundColor: "#E6F9EC",
      borderColor: "#4ADE80",
    },
    {
      title: "Cooking",
      start: "2025-05-29",
      end: "2025-06-01",
      type: "cooking",
      comment: "comment",
      backgroundColor: "#E6F9EC",
      borderColor: "#4ADE80",
    },
  ];

  return (
    <>
      <div className="p-4 max-w-full overflow-x-auto grid grid-cols-1 sm:grid-cols-4">
        <div className="min-w-[300px] sm:min-w-full col-span-3">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
            initialView="dayGridMonth"
            selectable
            editable
            events={events}
            eventContent={renderEventContent}
            headerToolbar={{
              left: "today",
              center: "prev,title,next",
              right: "",
            }}
          />
        </div>
        {/* display task */}
        <div className="flex flex-col gap-5 p-4">
          <div className=" w-full">
            <CardTaskCalender tasks={tasks} />
          </div>
          <div className=" w-full">
            <CardTCommentCalender comments={comments} / >
          </div>
        </div>
      </div>
    </>
  );
}
