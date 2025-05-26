import { Button } from "@heroui/react";
export default function AddButton() {
  return (
    <div className="flex gap-4 items-center">
      <Button
        radius="md"
        size="sm"
        className="bg-transparent border border-primary text-primary inline-flex items-center  w-[30px] min-w-0 justify-center px-2 py-1 text-lg"
      >
        +
      </Button>
    </div>
  );
}
