import { DatePicker } from "@heroui/react";
import { icon } from "../icon/allicon";
export default function MyDatePicker() {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <DatePicker className="max-w-[284px]" aria-label="Select a date" />
    </div>
  );
}
