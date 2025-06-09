import React from "react";
import MyCalendar from "@/components/appserver/Calenderpage";
import { tasks } from "@/data/allDataV2";
export default function Calender() {
  console.log("object,", tasks);
  return <MyCalendar tasks={tasks} />;
}
