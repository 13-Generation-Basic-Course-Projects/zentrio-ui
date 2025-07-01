"use client";
import { DatePicker } from "@heroui/react";
import { parseDate, getLocalTimeZone, today } from "@internationalized/date";

export default function MyDatePicker({ selectedDate, setSelectedDate }) {
  const formatDateForPicker = (date) => {
    if (!date) return null;
    if (typeof date === "object" && date.calendar) return date;

    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const dateString = `${year}-${month}-${day}`;

    try {
      return parseDate(dateString);
    } catch (error) {
      console.error("Error parsing date:", error);
      return null;
    }
  };

  const formatDateFromPicker = (calendarDate) => {
    if (!calendarDate) return null;
    try {
      return calendarDate.toDate(getLocalTimeZone());
    } catch (error) {
      console.error("Error converting calendar date:", error);
      return null;
    }
  };

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <DatePicker
        className="max-w-[284px]"
        aria-label="Select a date"
        value={formatDateForPicker(selectedDate)}
        onChange={(date) => {
          const jsDate = formatDateFromPicker(date);

          if (
            selectedDate &&
            jsDate &&
            selectedDate.toDateString() === jsDate.toDateString()
          ) {
            setSelectedDate(null);
          } else {
            setSelectedDate(jsDate);
          }
        }}
        showMonthAndYearPickers
      />
    </div>
  );
}
