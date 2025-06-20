"use client";
import { Avatar } from "@heroui/avatar";
import { User } from "@heroui/react";

export default function UserAvatar({ image }) {
  return (
    
     <div
      className="h-10 w-10 rounded-full bg-bgColor overflow-hidden">
        <img  src={image} className="h-full object-cover" alt="image-teamleader" />
      </div>
  );
}
