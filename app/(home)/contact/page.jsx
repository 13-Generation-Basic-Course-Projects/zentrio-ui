import CardBoard from "@/components/card/CardBoard";
import React from "react";
//useage : http://localhost:3000/contact
export default function ContactUs() {
  // Data for cards - you can customize or add more objects
  const cardData = [
    { id: 1, title: "UX/UI Design" },
    { id: 2, title: "Web Development" },
    { id: 3, title: "Marketing" },
    { id: 4, title: "Photography" },
    { id: 5, title: "Content Writing" },
    { id: 6, title: "SEO" },
  ];

  return (
    <div className="h-screen w-full">
      <div className="h-screen w-full flex justify-center items-center px-4">
        <div className="max-w-7xl mx-auto mt-10 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {cardData.map((item) => (
              <CardBoard key={item.id} title={item.title} />
            ))}
          </div>
        </div>
      </div>
      {/* you can design by your own dont use  <main></main> tag */}
    </div>
  );
}