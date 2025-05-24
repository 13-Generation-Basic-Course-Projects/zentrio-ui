import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";

export default function CardBoardEmpty() {
  return (
    <Card className="bg-transparent  shadow-none border-none">
      {/* Body */}

      <div className="flex items-center justify-center h-full bg-transparent">
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-blue-400 rounded-xl h-full w-full text-center text-blue-400 cursor-pointer hover:bg-blue-50 transition">
          <div className="flex items-center justify-center w-14 h-14 text-h1 text-primary border-2 border-dashed border-primary rounded-full leading-none">
            +
          </div>
          <div className="text-primary mt-2 font-medium">Create New Board</div>
        </div>
      </div>
    </Card>
  );
}
