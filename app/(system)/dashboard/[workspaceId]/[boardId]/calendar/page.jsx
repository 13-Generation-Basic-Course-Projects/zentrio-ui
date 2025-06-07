import React from "react";
import MyCalendar from "@/components/appserver/Calenderpage";

import { calendarAction, calendarNoteAction } from "@/action/calendar.action";

export default async function Calender({ params }) {
  const boardId = params?.boardId;
  const tasks = await calendarAction({ boardId });
  // console.log("may task: ",tasks)

  const taskId = "0a3d4af8-d4dd-4a67-88cc-7bd7cc06a59f"; //custom your task id here
  const note = await calendarNoteAction({ taskId });
  // console.log("my note: ", note)

  return (
    <>
      <MyCalendar tasks={tasks} note={note} />
    </>
  );
}
