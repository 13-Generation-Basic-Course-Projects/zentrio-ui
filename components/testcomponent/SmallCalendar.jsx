"use client";
import React, { useEffect, useState } from "react";
import { Calendar } from "@heroui/react";
import { today, getLocalTimeZone } from "@internationalized/date";

export default function SmallCalendar() {
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      // Force a re-render by updating zoom level
      setZoomLevel(window.devicePixelRatio || 1);
    };

    // Listen for resize events (which trigger on zoom)
    window.addEventListener("resize", handleResize);

    // Also listen for visual viewport changes (better zoom detection)
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  return (
    <div className="w-full p-2">
      <Calendar
        isReadOnly
        aria-label="Date (Read Only)"
        value={today(getLocalTimeZone())}
        key={zoomLevel} // Force re-render on zoom change
        classNames={{
          base: "w-full max-w-full rounded-2xl shadow-lg border border-gray-200/50 bg-white/95 backdrop-blur-sm overflow-hidden box-border flex flex-col",
          content: "w-full flex-1 p-4",
          grid: "w-full border-collapse table rounded-xl overflow-hidden",
          gridHeader:
            "w-full bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl",
          gridHeaderCell:
            "text-center font-semibold text-sm text-gray-700 box-border px-3 py-3 min-w-0 flex-1 first:rounded-tl-xl last:rounded-tr-xl border-b border-gray-100",
          gridBody: "w-full bg-white",
          gridBodyRow:
            "flex w-full h-[40px] border-b border-gray-50 last:border-b-0 last:rounded-b-xl overflow-hidden",
          cell: "flex-1 min-w-0 p-0 text-center box-border flex items-center justify-center hover:bg-blue-50/50 transition-colors duration-200 first:rounded-l-lg last:rounded-r-lg",
          cellButton:
            "w-full h-full h-[40px] rounded-full m-1 flex items-center justify-center font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-1",
          todayButton:
            "bg-blue-500 p-2 rounded-full text-white shadow-md hover:bg-blue-600 hover:text-white hover:shadow-lg",
          selectedButton: "bg-blue-600 text-white shadow-lg hover:bg-blue-700",
          disabledButton:
            "text-gray-300 hover:bg-transparent hover:text-gray-300 hover:scale-100 cursor-not-allowed",
        }}
        style={{
          // Use CSS custom properties for better zoom responsiveness
          "--calendar-cell-min-width": "max(30px, 4vw)",
          "--calendar-cell-height": "42px",
        }}
      />
    </div>
  );
}
