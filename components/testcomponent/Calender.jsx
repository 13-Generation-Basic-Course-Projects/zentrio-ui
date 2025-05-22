"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import CardTaskCalender from "../card/CardTaskCalender";
import CardTCommentCalender from "../card/CardCommentCalender";

export default function GanttChart({ tasks }) {
  const events = [
    {
      title: "Today's Event",
      date: new Date().toISOString().split("T")[0], // "YYYY-MM-DD"
    },
  ];

  return (
    <>
      <div className="p-4 max-w-full overflow-x-auto ">
        <div className=" sm:min-w-full max-w-none ">
          <FullCalendar
            plugins={[
              dayGridPlugin,
              interactionPlugin,
              timeGridPlugin,
              listPlugin,
            ]}
            initialView="dayGridMonth"
            selectable={true}
            editable={true}
            events={events}
            headerToolbar={{
              left: "today",
              center: "prev,next",
              right: "",
            }}
          />
        </div>
      </div>
    </>
  );
}
