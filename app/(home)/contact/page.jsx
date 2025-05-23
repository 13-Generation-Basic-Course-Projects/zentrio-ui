import CardBoard from "@/components/card/CardBoard";
import React from "react";


//leap/member test card board in here

export default function ContactUs() {
  const cardData = [
    {
      id: 1,
      title: "UX/UI Design",
      color:
        "https://i.pinimg.com/736x/bc/26/f9/bc26f9611f86e033a6038dc3f447323e.jpg",
    },
    {
      id: 2,
      title: "Web Development",
      color:
        "https://i.pinimg.com/736x/e7/7a/cc/e77acca664428e704871764d9cfa418f.jpg",
    },
    {
      id: 3,
      title: "Marketing",
      color:
        "https://i.pinimg.com/736x/2f/98/1b/2f981b9f8e2223221a5791191bb1ccf5.jpg",
    },
    {
      id: 4,
      title: "Photography",
      color:
        "https://i.pinimg.com/736x/18/69/f9/1869f99d21fe327a575042e8f20be496.jpg",
    },
    {
      id: 5,
      title: "Content Writing",
      color:
        "https://i.pinimg.com/736x/da/44/18/da4418f3dd872927e881116327982b55.jpg",
    },
    {
      id: 6,
      title: "SEO",
      color:
        "https://i.pinimg.com/736x/bc/26/f9/bc26f9611f86e033a6038dc3f447323e.jpg",
    },
  ];

  return (
    <div className="w-full  min-h-screen p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-white p-6 rounded-lg shadow-md">
        {cardData.map((item) => (
          <CardBoard key={item.id} title={item.title} color={item.color} />
        ))}
      </div>
    </div>
  );
}
