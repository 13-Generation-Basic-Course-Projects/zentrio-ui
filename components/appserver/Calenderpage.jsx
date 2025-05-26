"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import CardTaskCalender from "../card/CardTaskCalender";
import CardTCommentCalender from "../card/CardCommentCalender";
import BredCrum from "../bredcrum/Bredcrum";

export default function MyCalendar({ tasks }) {
  const events = [
    {
      title: "Today's Event",
      date: new Date().toISOString().split("T")[0], // "YYYY-MM-DD"
    },
  ];

  return (
    <>
      <div className="p-4  h-screen flex flex-col ">
        <BredCrum
          board={"Hikko Design"}
          feature={"Calender"}
          header={"Calender"}
        />

        <div className="p-4 max-w-full overflow-x-auto grid grid-cols-1 sm:grid-cols-4">
          {/* calender */}
          <div className="min-w-[300px] sm:min-w-full col-span-3 overflow-y-auto scrollbar-hidden pb-40 pt-10">
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
          <div className="flex flex-col gap-5 p-4 overflow-y-auto scrollbar-hidden pb-40 pt-10">
            <div className=" w-full ">
              <CardTaskCalender tasks={tasks} />
              <CardTaskCalender tasks={tasks} />
              <CardTaskCalender tasks={tasks} />
            </div>
            <div className="flex flex-col  w-full overflow-y-auto scrollbar-hidden pb-40 pt-10">
              {/* <CardTCommentCalender tasks={tasks} / >*/}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
