import React from "react";
import MyCalendar from "@/components/appserver/Calenderpage";

import { calendarAction, calendarNoteAction } from "@/action/calendar.action";

// import { tasks } from "@/data/allDataV2";

export default async function Calender() {
  const boardId = "d4f6ed17-3f68-48b4-9cbb-fa141a2d2000"; //custom your board id here
  const tasks = await calendarAction({ boardId });
  console.log("may task: ",tasks)
  
  const taskId = "277f6217-2f73-4241-a0b4-d40c60877cd1";  //custom your task id here
  const note = await calendarNoteAction({ taskId });
  console.log("my note: ", note)

  return (<>
    {/* <MyCalendar tasks={tasks} /> */}
    <MyCalendar tasks={tasks} note={note} />
  </>);
  ;
}