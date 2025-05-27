import React from "react";
import { Button } from "@/components/ui/button";

const files = [
  {
    name: "zentrio.pdf",
    icon: "https://cdn-icons-png.flaticon.com/128/4726/4726010.png",
  },
  {
    name: "project.doc",
    icon: "https://cdn-icons-png.flaticon.com/128/2991/2991108.png",
  },
  {
    name: "report.xls",
    icon: "https://cdn-icons-png.flaticon.com/128/2504/2504768.png",
  },
];

export default function CardBoardReport() {
  return (
    <div className="bg-white text-title text-h6 p-5 border border-gray-200  rounded-large w-full max-w-sm">
      <header className="mb-4 text-h6 font-semibold">My Report Board</header>

      <div className="space-y-4">
        {files.map((file, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img
                src={file.icon}
                alt="File Icon"
                width={30}
                height={30}
                className="object-cover"
              />
              <div className="flex flex-col space-y-1">
                <p className="font-medium text-body-sm">{file.name}</p>
                <button className="text-title/50 text-caption-tiny hover:underline text-left">
                  Rename
                </button>
              </div>
            </div>
            <Button
              variant="ghost"
              className="hover:text-blueActive hover:bg-transparent p-0 text-body-sm"
            >
              Generate Now
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}





