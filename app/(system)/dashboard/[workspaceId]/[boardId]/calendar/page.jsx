import React from "react";
import MyCalendar from "@/components/appserver/Calenderpage";
import { tasks, comments } from "@/data/allDataV2";
export default function Calender() {
  return <MyCalendar tasks={tasks}  comments={comments}/>;
}
