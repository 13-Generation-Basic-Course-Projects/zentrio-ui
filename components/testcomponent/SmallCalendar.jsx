"use client";
import React from "react";
import { Calendar } from "@heroui/react";
import { today, getLocalTimeZone } from "@internationalized/date";

export default function SmallCalendar() {
  return (
    <div className="w-full overflow-hidden ">
      <Calendar
        isReadOnly
        aria-label="Date (Read Only)"
        value={today(getLocalTimeZone())}
        classNames={{
          base: "w-full max-w-full rounded-xl shadow-sm overflow-x-hidden box-border",
          content: "w-full",
          grid: "w-full table-fixed border-collapse",
          gridHeader: "w-full",
          gridHeaderCell:
            "w-[50px] min-w-[40px] text-center font-medium text-sm text-gray-600 box-border px-1 py-2",
          gridBody: "w-full",
          gridBodyRow: "h-[42px]",
          cell: "w-[50px] min-w-[40px] p-2 text-center box-border",
        }}
      />
    </div>
  );
}
