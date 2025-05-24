"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import {
  IconDelete,
  StackedProfiles,
  StarIconOutline,
  StarIconSolid,
} from "../icon/everyicon";
import iconMember from "@/assets/memberSideBar.png";

import Image from "next/image";

export default function CardBoard({ title, image }) {
  const [favorited, setFavorited] = useState(false);

  return (
    <Card className="py-4  h-[300px] rounded-xl shadow-sm  ">
      {/* Header */}
      <CardHeader className="pb-0 pt-2 px-4 flex justify-between items-center">
        <p className="text-body-sm font-semibold text-primary truncate">
          {title}
        </p>

        <button
          onClick={() => setFavorited(!favorited)}
          className="text-yellow-500 hover:text-yellow-600"
          aria-label="Toggle favorite"
        >
          {favorited ? <StarIconSolid /> : <StarIconOutline />}
        </button>
      </CardHeader>

      {/* Body */}
      <CardBody className="overflow-visible py-2">
        <img
          src={image}
          alt={`Card background for ${title}`}
          className="object-cover rounded-xl w-full h-32"
        />
      </CardBody>

      {/* Footer */}
      <CardFooter className="pt-2 px-4 flex flex-col items-start space-y-4">
        <StackedProfiles />

        <div className="flex w-full justify-between text-sm text-gray-600">
          <div className="flex flex-row justify-center items-center space-x-2">
            <Image
              src={iconMember}
              className="w-[16px] h-[16px]"
              alt="Members icon"
            />
            <p className="text-body-sm"> 13 Members</p>
          </div>
          <div className="flex flex-row justify-center items-center space-x-2 text-progress-red">
            <IconDelete />
            <button className="hover:underline text-body-sm ">Remove</button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
