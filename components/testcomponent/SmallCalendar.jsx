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
    <div className="w-full overflow-hidden">
      <Calendar
        isReadOnly
        aria-label="Date (Read Only)"
        value={today(getLocalTimeZone())}
        key={zoomLevel} // Force re-render on zoom change
        classNames={{
          base: "w-full max-w-full rounded-xl shadow-sm overflow-hidden box-border flex flex-col",
          content: "w-full flex-1",
          grid: "w-full border-collapse table",
          gridHeader: "w-full bg-gray-50",
          gridHeaderCell:
            "text-center font-medium text-sm text-gray-600 box-border px-1 py-2 min-w-0 flex-1",
          gridBody: "w-full",
          gridBodyRow: "flex w-full h-[42px]",
          cell: "flex-1 min-w-0 p-2 text-center box-border flex items-center justify-center",
        }}
        style={{
          // Use CSS custom properties for better zoom responsiveness
          "--calendar-cell-min-width": "max(30px, 4vw)",
        }}
      />
    </div>
  );
}
