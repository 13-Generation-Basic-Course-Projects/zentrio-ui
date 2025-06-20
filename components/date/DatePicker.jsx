"use client";
import { DatePicker } from "@heroui/react";

export default function MyDatePicker({ selectedDate, setSelectedDate }) {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <DatePicker
        className="max-w-[284px]"
        aria-label="Select a date"
        value={selectedDate}
        onChange={(date) => {
          if (date?.toDate) {
            setSelectedDate(date.toDate());
          } else {
            setSelectedDate(null);
          }
        }}
      />
    </div>
  );
}