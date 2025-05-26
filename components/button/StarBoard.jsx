"use client";
import React, { useState } from "react";
import { StarIconOutline, StarIconSolid } from "../icon/everyicon";
import { Button } from "@heroui/react";

export default function StarBoard() {
  const [favorited, setFavorited] = useState(false);
  return (
    <div className="">
      <Button
        onPress={() => setFavorited(!favorited)}
        className="w-[30px] h-full min-w-0 bg-transparent border  text-primary p-0"
        size="sm"
        aria-label="Toggle favorite"
      >
        {favorited ? (
          <StarIconSolid className="" />
        ) : (
          <StarIconOutline className="text-yellow-500" />
        )}
      </Button>
    </div>
  );
}
