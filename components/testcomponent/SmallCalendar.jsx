"use client";

import { Calendar } from "@heroui/calendar";
import { parseDate } from "@internationalized/date";

export default function SmallCalendar() {
  return (
    <div className="w-full h-full">
      <Calendar
        aria-label="Date"
        defaultValue={parseDate("2020-02-03")}
        className="w-full text-primary text-sm rounded-xl shadow-md p-4"
      />
    </div>
  );
}
