import React from "react";
import MyCalendar from "@/components/appserver/Calenderpage";

import { 
  getCalendarByBoardIdAndUserIdAction,
  getAllNotesFromCalendarByCurrentUserAction,
  
 } from "@/action/calendar.action";

export default async function Calender({ params }) {
  const boardId = params?.boardId;

  const tasks = await getCalendarByBoardIdAndUserIdAction(boardId);

  return (
    <>
      <MyCalendar 
        boardId={boardId}
        tasks={tasks}
      />
    </>
  );
}
