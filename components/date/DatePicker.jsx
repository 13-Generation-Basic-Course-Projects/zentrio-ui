"use client";
import { DatePicker } from "@heroui/react";
import { parseDate, getLocalTimeZone, today } from "@internationalized/date";

export default function MyDatePicker({ selectedDate, setSelectedDate }) {
  // Convert JavaScript Date to CalendarDate format that HeroUI expects
  const formatDateForPicker = (date) => {
    if (!date) return null;
    
    // If it's already in the correct format, return as is
    if (date && typeof date === 'object' && date.calendar) {
      return date;
    }
    
    // Convert JavaScript Date to YYYY-MM-DD string then to CalendarDate
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    
    try {
      return parseDate(dateString);
    } catch (error) {
      console.error('Error parsing date:', error);
      return null;
    }
  };

  // Convert CalendarDate back to JavaScript Date
  const formatDateFromPicker = (calendarDate) => {
    if (!calendarDate) return null;
    
    try {
      // Convert CalendarDate to JavaScript Date
      return calendarDate.toDate(getLocalTimeZone());
    } catch (error) {
      console.error('Error converting calendar date:', error);
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
          setSelectedDate(jsDate);
        }}
        showMonthAndYearPickers
      />
    </div>
  );
}