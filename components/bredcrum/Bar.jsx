import React from "react";
import { Button } from "@heroui/react";

export default function Bar({ title, btn }) {
  return (
    <div>
      <div className="flex justify-between items-center w-full mb-4">
        <p className="font-semibold text-body-sm font-extrabold">{title}</p>
        <Button className="hover:text-primary bg-transparent" variant="none">
          {btn}
        </Button>
      </div>
      <div className="border-1 mb-4"></div>
    </div>
  );
}