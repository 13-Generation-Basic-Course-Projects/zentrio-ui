import { Button } from "@heroui/react";
import React from "react";
import { IconEdit } from "../icon/everyicon";

export function ButtonEditprofile() {
  return (
    <div>
      <Button color="primary">
        <IconEdit strokeWidth={1.5} size={5} color={"currentColor"} /> Edit
        Profile
      </Button>
    </div>
  );
}
export function ButtonEditAchievment() {
  return (
    <div>
      <Button color="primary">
        <IconEdit strokeWidth={1.5} size={5} color={"currentColor"} /> Edit
        Achievment
      </Button>
    </div>
  );
}
