import { CardCheckList } from "@/components/card/CardBoard";
import React from "react";

//useage route : http://localhost:3000/dashboard/1/1/board

// test for CardCheckList
const Checklist = [
  {
    title: "Complete Project Proposal",
    startDate: "2025-05-25",
    status: "In Progress",
   
    label: "High Priority",
    comment: 5, // Number of comments
  },
  {
    title: "Design UI/UX Mockup",
    startDate: "2025-06-01",
    status: "Completed",
    image:
      "https://i.pinimg.com/736x/a4/52/ea/a452eae371f079b141494c5aff07a140.jpg",
    label: "Design",
    comment: 12,
  },
  {
    title: "Backend API Development",
    startDate: "2025-06-10",
    status: "Overdue",
    image:
      "https://i.pinimg.com/736x/a4/52/ea/a452eae371f079b141494c5aff07a140.jpg",
    label: "API",
    comment: 8,
  },
  {
    title: "User Testing Phase",
    startDate: "2025-06-20",
    status: "In Progress",
    image:
      "https://i.pinimg.com/736x/a4/52/ea/a452eae371f079b141494c5aff07a140.jpg",
    label: "Testing",
    comment: 3,
  },
];
export default function Board() {
  // return <div className="hidden"> 5555 hidden ha</div>;
  return (
    // test for CardCheckList
    <div className="p-4">
      <div className="grid grid-cols-4 grid-rows-4 gap-4">
        {Checklist.map((item, index) => (
          <CardCheckList
            key={index}
            title={item.title}
            startDate={item.startDate}
            status={item.status}
            image={item.image}
            label={item.label}
            comment={item.comment}
          />
        ))}
      </div>
    </div>
  );
}
