"use client";
import React from "react";
import { Calendar } from "@heroui/react";
import { today, getLocalTimeZone } from "@internationalized/date";

export default function SmallCalendar() {
  return (
    <div className="max-w-sm w-full overflow-hidden p-2">
      <Calendar
        isReadOnly
        aria-label="Date (Read Only)"
        value={today(getLocalTimeZone())}
        classNames={{
          base: "calendar-base",
          gridBodyRow: "custom-grid-row",
          gridBody: "custom-grid-body",
          content: "calendar-base",
        }}
      />
      <style jsx global>{`
        .calendar-base {
          width: 100%;
          max-width: 300px;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px rgb(0 0 0 / 0.1);
          overflow-x: hidden;
          box-sizing: border-box;
        }
        .custom-grid-body {
          width: 100% !important;
        }
        .custom-grid-row {
          height: 42px !important;
        }
        .calendar-grid-wrapper {
          width: 100% !important;
        }
        .calendar-grid {
          width: 100% !important;
        }
      `}</style>
    </div>
  );
}
