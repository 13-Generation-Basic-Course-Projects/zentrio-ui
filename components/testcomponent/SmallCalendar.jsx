"use client";

import { useState, useEffect } from "react";
import { RangeCalendar } from "@heroui/calendar";

export default function SmallCalendar() {
  const [calendarWidth, setCalendarWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setCalendarWidth(window.innerWidth );
    handleResize(); // Set initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <RangeCalendar
      className={`
        h-[400px] overflow-auto scrollbar-hidden mx-auto
        [&_.react-aria-CalendarCell]:text-caption
        [&_.react-aria-CalendarCell]:p-2
        [&_.react-aria-CalendarCell]:text-gray-700
        [&_.react-aria-CalendarCell[data-selected='true']]:bg-blue-500
        [&_.react-aria-CalendarCell[data-selected='true']]:text-white
        [&_.react-aria-CalendarCell[data-selected='true']]:rounded-full
        [&_.react-aria-CalendarCell]:hover:bg-gray-200
      `}
      style={{ width: `${calendarWidth}px` }}
      showMonthAndYearPickers
      aria-label="Date (Show Month and Year Picker)"
    />
  );
}

// import { Calendar } from "@heroui/calendar";
// import { parseDate } from "@internationalized/date";

// export default function SmallCalendar() {
// return (
//   <Calendar
//     aria-label="Date"
//     defaultValue={parseDate("2020-02-03")}
//     className="flex-1 w-full h-full text-primary text-sm rounded-xl shadow-md p-4"
//   />
// );
//   return (
//     <div className="w-full">
//       <Calendar
//         aria-label="Date"
//         className="bg-white h-[250px] min-h-0"
//         pageBehavior="single"
//         firstDayOfWeek="sun"
//       />
//     </div>
//   );
// }
