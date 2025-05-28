"use client";

import { Calendar } from "@heroui/calendar";
import { parseDate } from "@internationalized/date";

export default function SmallCalendar() {
  // return (
  //   <Calendar
  //     aria-label="Date"
  //     defaultValue={parseDate("2020-02-03")}
  //     className="flex-1 w-full h-full text-primary text-sm rounded-xl shadow-md p-4"
  //   />
  // );
  return (
    <div className="w-full">
      <Calendar
        aria-label="Date"
        className="bg-white h-[250px] min-h-0"
        pageBehavior="single"
        firstDayOfWeek="sun"
      />
    </div>
  );
}
