"use client";
import { Avatar } from "@heroui/avatar";

export default function UserAvatar({ image }) {
  return (
    <Avatar src={image && "https://i.pravatar.cc/150?u=a042581f4e29026024d"} />
  );
}
