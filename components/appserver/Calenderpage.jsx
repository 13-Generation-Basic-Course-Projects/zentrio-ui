"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import CardTaskCalender from "../card/CardTaskCalender";
export default function MyCalendar({ tasks }) {
  const events = [
    {
      title: "Today's Event",
      date: new Date().toISOString().split("T")[0], // "YYYY-MM-DD"
    },
  ];

  return (
    <>
      <div className="p-4 max-w-full overflow-x-auto grid grid-cols-1 sm:grid-cols-4">
        <div className="min-w-[300px] sm:min-w-full col-span-3">
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
        {/* display task */}
        <div className="flex flex-col p-3">
          <div className="h-32 w-full">
            <CardTaskCalender tasks={tasks} />
          </div>
          <div className="h-32 w-full">2</div>
        </div>
      </div>
    </>
  );
}
