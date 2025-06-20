import { useState } from "react";
import { DateRangePicker } from "@heroui/react";
import { CalendarDate, toDate } from "@internationalized/date";
import { updateCheckListByIdAndTaskIdAction } from "@/action/board.action";

export default function UpdateDateChecklist({
  checkListId,
  taskId,
  initialStartedAt,
  initialFinishedAt,
}) {
  const parseToCalendarDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    return new CalendarDate(d.getFullYear(), d.getMonth() + 1, d.getDate());
  };

  const [dateRange, setDateRange] = useState({
    start: parseToCalendarDate(initialStartedAt),
    end: parseToCalendarDate(initialFinishedAt),
  });

  const handleDateChange = (newRange) => {
    console.log("DateRangePicker onChange newRange:", {
      start: newRange?.start
        ? `${newRange.start.year}-${newRange.start.month}-${newRange.start.day}`
        : null,
      end: newRange?.end
        ? `${newRange.end.year}-${newRange.end.month}-${newRange.end.day}`
        : null,
      raw: newRange,
    });
    setDateRange(newRange);
  };

  const handleSave = async () => {
    console.log("=== SAVING DATES ===");
    console.log("Current dateRange:", dateRange);

    // Convert CalendarDate to ISO string for API
    const startedAtISO = dateRange.start
      ? toDate(dateRange.start).toISOString()
      : null;
    const finishedAtISO = dateRange.end
      ? toDate(dateRange.end).toISOString()
      : null;

    console.log("Converted to ISO:");
    console.log("- Started At:", startedAtISO);
    console.log("- Finished At:", finishedAtISO);

    try {
      await updateCheckListByIdAndTaskIdAction(
        checkListId,
        "", // name (empty as per your original)
        "", // description (empty as per your original)
        startedAtISO,
        finishedAtISO,
        taskId
      );
      console.log("✅ Successfully updated checklist dates");
    } catch (err) {
      console.error("❌ Failed to update checklist:", err);
    }
  };

  const handleKeyDown = (e) => {
    console.log("Key pressed:", e.key);
    if (e.key === "Enter") {
      e.preventDefault();
      console.log("Enter key detected - triggering save");
      handleSave();
    }
  };

  return (
    <div className="max-w-xl">
      <DateRangePicker
       
        value={dateRange}
        onChange={handleDateChange}
        showMonthAndYearPickers
        variant="flat"
        size="md"
        radius="md"
        firstDayOfWeek="mon"
        onKeyDown={handleKeyDown}
        className="max-w-none"
        classNames={{
          inputWrapper: `
            bg-white 
            border
            border-gray-300
            shadow-none         
            focus:shadow-none  
            focus:outline-none
            focus:ring-0       
            focus-within:shadow-none
            focus-within:ring-0
            rounded-small
            transition-all 
            hover:bg-white
            px-3
            py-4
          `,
          input: "text-black",
          label: "text-label font-medium",
        }}
      />
    </div>
  );
}
