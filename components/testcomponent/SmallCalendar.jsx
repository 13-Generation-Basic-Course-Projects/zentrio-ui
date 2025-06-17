"use client";

import { Calendar } from "@heroui/calendar";
import { parseDate } from "@internationalized/date";

export default function SmallCalendar() {
  return (
    <div className="w-full max-w-none mx-auto  h-[300px]">
      <Calendar
        aria-label="Date"
        className="bg-white"
        pageBehavior="single"
        firstDayOfWeek="sun"
        classNames={{
          base: "w-full max-w-none  h-full min-h-none bg-yellow-400 flex flex-col",
          content: "w-full",
          headerWrapper: "w-full",
          gridWrapper: "min-w-full",
          grid: "min-w-full",
          gridHeader: "w-full",
          gridHeaderRow: "w-full px-0 xl:px-1 justify-between",
          gridBodyRow: "w-full px-2 xl:px-4 justify-between",
        }}
      />
    </div>
  );
}
