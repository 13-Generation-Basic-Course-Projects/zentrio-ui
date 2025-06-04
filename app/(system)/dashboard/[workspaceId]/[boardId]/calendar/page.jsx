import React from "react";
import MyCalendar from "@/components/appserver/Calenderpage";

import { calendarAction } from "@/action/calendar.action";

// import { tasks } from "@/data/allDataV2";

export default async function Calender() {
  const boardId = "d4f6ed17-3f68-48b4-9cbb-fa141a2d2000";
  const tasks = await calendarAction({ boardId });
  console.log("may task",tasks)

  return (<>
    {/* <MyCalendar tasks={tasks} /> */}
    <MyCalendar tasks={tasks} />
  </>);
  ;
}